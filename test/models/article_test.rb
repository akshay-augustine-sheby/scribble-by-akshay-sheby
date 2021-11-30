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
end
