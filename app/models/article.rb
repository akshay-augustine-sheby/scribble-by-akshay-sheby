# frozen_string_literal: true

class Article < ApplicationRecord
  enum status: { draft: 0, published: 1 }
  belongs_to :category

  validates :title, presence: true, length: { maximum: 50 }
  validates :body, presence: true
  validates :slug, uniqueness: true
  validate :slug_not_changed

  before_save :set_published_date
  before_create :set_slug

  private

    def set_published_date
      if self.published?
        self.published_at = Time.zone.now
      else
        self.published_at = nil
      end
    end

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
      [ total_count, published_count, category_articles_count ]
    end

    def set_slug
      title_slug = title.parameterize
      regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
      latest_article_slug = Article.where(
        regex_pattern,
        "#{title_slug}$|#{title_slug}-[0-9]+$"
      ).order(created_at: :desc).first&.slug
      slug_count = 0
      if latest_article_slug.present?
        slug_count = latest_article_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
      self.slug = slug_candidate
    end

    def slug_not_changed
      if slug_changed? && self.persisted?
        errors.add(:slug, t("article.slug.immutable"))
      end
    end
end
