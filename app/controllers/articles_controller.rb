# frozen_string_literal: true

class ArticlesController < ApplicationController
  def get_count
    total = 0
    published_count = 0
    Article.find_each do |article|
      if article.published?
        published_count = published_count + 1
      end
      total = total + 1
    end
    render status: :ok, json: { total: total, draft_count: total - published_count, published_count: published_count }
  end

  private

    def article_params
      params.require(:article).permit(:title, :body, :status, :category_id)
    end
end
