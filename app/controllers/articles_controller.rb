# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article, only: %i[update show destroy]

  def get_articles_count
    total_count, published_count, category_articles_count = Article.get_count()
    render status: :ok, json: {
      total_count: total_count,
      draft_count: total_count - published_count,
      published_count: published_count,
      category_articles_count: category_articles_count
    }
  end

  def index
    articles = Article.eager_load(:category).select("articles.*, name")
    render status: :ok, json: { articles: articles }
  end

  def create
    article = Article.new(article_params.merge(author: "Oliver Smith"))
    if article.save
      render status: :ok,
        json: { notice: t("successfully_created", entity: "Article") }
    else
      errors = article.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def update
    if @article.update(article_params)
      render status: :ok, json: { notice: t("successfully_updated", entity: "Article") }
    else
      errors = @article.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def show
    render status: :ok, json: { article: @article }
  end

  def destroy
    if @article.destroy
      render status: :ok, json: { notice: t("successfully_deleted", entity: "Article") }
    else
      errors = @article.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
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
