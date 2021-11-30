# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article, only: %i[update destroy]

  def get_articles_count
    count = Article.get_count()
    render status: :ok, json: {
      total_count: count[:total_count],
      draft_count: count[:total_count] - count[:published_count],
      published_count: count[:published_count],
      category_articles_count: count[:category_articles_count]
    }
  end

  def index
    articles = Article.eager_load(:category).select("articles.*, name")
    render status: :ok, json: { articles: articles }
  end

  private

    def article_params
      params.require(:article).permit(:title, :body, :status, :category_id)
    end

    def load_article
      @article = Article.find_by(id: params[:id])
      unless @article
        render status: :not_found, json: { error: t("not_found", entity: "Article") }
      end
    end
end
