# frozen_string_literal: true

class Article < ApplicationRecord
  enum status: { draft: 0, published: 1 }
  belongs_to :category

  validates :title, presence: true
  validates :body, presence: true

  def self.get_count
    total_count = 0
    published_count = 0
    category_articles_count = Hash.new(0)
    self.find_each do |article|
      if article.published?
        published_count += 1
      end
      category_articles_count[article.category_id] += 1
      total_count += 1
    end
    { total_count: total_count, published_count: published_count, category_articles_count: category_articles_count }
  end
end
