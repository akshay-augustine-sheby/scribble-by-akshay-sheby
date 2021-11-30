# frozen_string_literal: true

class CreateArticles < ActiveRecord::Migration[6.1]
  def change
    create_table :articles do |t|
      t.text :title, null: false
      t.text :body, null: false
      t.text :author
      t.integer :status, default: 0, null: false
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
