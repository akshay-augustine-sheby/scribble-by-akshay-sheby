# frozen_string_literal: true

require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  def setup
    @category = Category.create!(name: "Sample category")
    @article = @category.articles.new(title: "Sample Article", body: "Sample Body", status: 1, author: "Oliver Smith")
  end

  def test_article_title_should_be_present
    @article.title = ""
    assert_not @article.valid?
    assert_includes @article.errors.full_messages, "Title can't be blank"
  end

  def test_article_body_should_be_present
    @article.body = ""
    assert_not @article.valid?
    assert_includes @article.errors.full_messages, "Body can't be blank"
  end

  def test_category_id_can_be_nullable
    @article.category_id = nil
    assert @article.valid?
  end

  def test_article_status_should_be_valid
    assert_raises(ArgumentError) do
      @article.status = 2
    end
  end

  def test_category_deletion_should_not_impact_article
    @article.save
    @category.destroy()
    assert @article.valid?
  end

  def test_category_can_have_many_articles
    @article.save
    @new_article = @category.articles.new(
      title: "Sample Article 2", body: "Sample Body 2", status: 0,
      author: "Oliver Smith")
    @new_article.save
    assert @new_article.valid?
  end

  def test_article_slug_is_parameterized_title
    title = @article.title
    @article.save!
    assert_equal title.parameterize, @article.slug
  end

  def test_incremental_slug_generation_for_articles_with_duplicate_two_worded_titles
    first_article = @category.articles.create!(
      title: "test article", body: "test body", status: 1,
      author: "Oliver Smith")
    second_article = @category.articles.create!(
      title: "test article", body: "test body", status: 1,
      author: "Oliver Smith")

    assert_equal "test-article", first_article.slug
    assert_equal "test-article-2", second_article.slug
  end

  def test_incremental_slug_generation_for_articles_with_duplicate_hyphenated_titles
    first_article = @category.articles.create!(
      title: "test-article", body: "test body", status: 1,
      author: "Oliver Smith")
    second_article = @category.articles.create!(
      title: "test-article", body: "test body", status: 1,
      author: "Oliver Smith")

    assert_equal "test-article", first_article.slug
    assert_equal "test-article-2", second_article.slug
  end

  def test_slug_generation_for_articles_having_titles_one_being_prefix_of_the_other
    first_article = @category.articles.create!(title: "fishing", body: "test body", status: 1, author: "Oliver Smith")
    second_article = @category.articles.create!(title: "fish", body: "test body", status: 1, author: "Oliver Smith")

    assert_equal "fishing", first_article.slug
    assert_equal "fish", second_article.slug
  end

  def test_error_raised_for_duplicate_slug
    @article.save!
    another_test_article = @category.articles.create!(
      title: "another test article", body: "test body", status: 1,
      author: "Oliver Smith")

    assert_raises ActiveRecord::RecordInvalid do
      another_test_article.update!(slug: @article.slug)
    end

    error_msg = another_test_article.errors.full_messages.to_sentence
    assert_match t("article.slug.immutable"), error_msg
  end

  def test_updating_title_does_not_update_slug
    @article.save!
    assert_no_changes -> { @article.reload.slug } do
      updated_article_title = "updated article title"
      @article.update!(title: updated_article_title)
      assert_equal updated_article_title, @article.title
    end
  end

  def test_slug_suffix_is_maximum_slug_count_plus_one_if_two_or_more_slugs_already_exist
    title = "test-article"
    first_article = @category.articles.create!(title: title, body: "test body", status: 1, author: "Oliver Smith")
    second_article = @category.articles.create!(title: title, body: "test body", status: 1, author: "Oliver Smith")
    third_article = @category.articles.create!(title: title, body: "test body", status: 1, author: "Oliver Smith")
    fourth_article = @category.articles.create!(title: title, body: "test body", status: 1, author: "Oliver Smith")

    assert_equal fourth_article.slug, "#{title.parameterize}-4"

    third_article.destroy

    expected_slug_suffix_for_new_article = fourth_article.slug.split("-").last.to_i + 1

    new_article = @category.articles.create!(title: title, body: "test body", status: 1, author: "Oliver Smith")
    assert_equal new_article.slug, "#{title.parameterize}-#{expected_slug_suffix_for_new_article}"
  end

  def test_existing_slug_prefixed_in_new_article_title_doesnt_break_slug_generation
    title_having_new_title_as_substring = "buy milk and apple"
    new_title = "buy milk"

    existing_article = @category.articles.create!(
      title: title_having_new_title_as_substring, body: "test body",
      status: 1, author: "Oliver Smith")
    assert_equal title_having_new_title_as_substring.parameterize, existing_article.slug

    new_article = @category.articles.create!(title: new_title, body: "test body", status: 1, author: "Oliver Smith")
    assert_equal new_title.parameterize, new_article.slug
  end

  def test_having_numbered_slug_substring_in_title_doesnt_affect_slug_generation
    title_with_numbered_substring = "buy 2 apples"

    existing_article = @category.articles.create!(
      title: title_with_numbered_substring, body: "test body", status: 1,
      author: "Oliver Smith")
    assert_equal title_with_numbered_substring.parameterize, existing_article.slug

    substring_of_existing_slug = "buy"
    new_article = @category.articles.create!(
      title: substring_of_existing_slug, body: "test body", status: 1,
      author: "Oliver Smith")

    assert_equal substring_of_existing_slug.parameterize, new_article.slug
  end
end
