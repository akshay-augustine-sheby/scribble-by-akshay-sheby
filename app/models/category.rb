# frozen_string_literal: true

class Category < ApplicationRecord
  acts_as_list

  has_many :articles, dependent: :nullify

  validates :name, presence: true

  def self.get_categories_articles_data
    articles = {}
    categories_arr = []
    categories = self.eager_load(:articles).order(:position).where(articles: { status: :published })
    categories.each do |category|
      articles[category.id] = []
      categories_arr.push({ id: category.id, name: category.name })
      category.articles.each do |article|
        articles[category.id].push({ id: article.id, title: article.title })
      end
    end
    [ articles, categories_arr ]
  end
end
