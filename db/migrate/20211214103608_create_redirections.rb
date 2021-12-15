# frozen_string_literal: true

class CreateRedirections < ActiveRecord::Migration[6.1]
  def change
    create_table :redirections do |t|
      t.string :from_path, null: false
      t.string :to_path, null: false

      t.timestamps
    end
  end
end
