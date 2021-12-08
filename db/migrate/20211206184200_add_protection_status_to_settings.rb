# frozen_string_literal: true

class AddProtectionStatusToSettings < ActiveRecord::Migration[6.1]
  def change
    add_column :settings, :protection_status, :integer, default: 0, null: false
  end
end
