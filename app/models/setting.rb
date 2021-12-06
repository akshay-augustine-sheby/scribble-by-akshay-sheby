# frozen_string_literal: true

class Setting < ApplicationRecord
  has_secure_password

  validates :password, length: { minimum: 6 }, if: -> { password.present? }
end
