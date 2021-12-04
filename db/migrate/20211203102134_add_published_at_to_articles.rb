# frozen_string_literal: true

class AddPublishedAtToArticles < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :published_at, :datetime
  end
end
