# frozen_string_literal: true

class CreateSettings < ActiveRecord::Migration[6.1]
  def change
    create_table :settings do |t|
      t.string :site_name, null: false
      t.string :password_digest
      t.timestamps
    end
  end
end
