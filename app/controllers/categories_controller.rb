# frozen_string_literal: true

class CategoriesController < ApplicationController
  def index
    categories = Category.all.as_json()
    render status: :ok, json: { categories: categories }
  end

  def create
    category = Category.new(category_params)
    if category.save
      render status: :ok,
        json: { notice: t("successfully_created", entity: "Category") }
    else
      errors = category.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end
end
