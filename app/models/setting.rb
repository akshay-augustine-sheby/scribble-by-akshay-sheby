# frozen_string_literal: true

class Setting < ApplicationRecord
  enum protection_status: { password_absent: 0, password_present: 1 }

  has_secure_password
  has_secure_token :authentication_token

  validates :password, length: { minimum: 6 }, if: -> { password.present? }
end
