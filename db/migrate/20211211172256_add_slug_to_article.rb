# frozen_string_literal: true

class AddSlugToArticle < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :slug, :string, null: false
  end
end
