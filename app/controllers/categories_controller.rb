# frozen_string_literal: true

class CategoriesController < ApplicationController
  def index
    categories = Category.all.as_json()
    render status: :ok, json: { categories: categories }
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end
end
