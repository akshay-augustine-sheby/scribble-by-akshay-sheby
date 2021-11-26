# frozen_string_literal: true

class CategoriesController < ApplicationController
  private

    def category_params
      params.require(:category).permit(:name)
    end
end
