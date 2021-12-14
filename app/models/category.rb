# frozen_string_literal: true

class Category < ApplicationRecord
  acts_as_list

  has_many :articles, dependent: :nullify

  validates :name, presence: true

  def self.get_categories_articles_data
    articles = {}
    categories_arr = []
    categories = self.eager_load(:articles).order(:position).where(articles: { status: :published })
    initial_category_id = categories[0].id
    initial_slug = categories[0].articles[0].slug
    categories.each do |category|
      articles[category.id] = []
      categories_arr.push({ id: category.id, name: category.name })
      category.articles.each do |article|
        articles[category.id].push({ slug: article.slug, title: article.title })
      end
    end
    [ articles, categories_arr, initial_category_id, initial_slug ]
  end
end
