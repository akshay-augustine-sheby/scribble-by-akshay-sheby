# frozen_string_literal: true

class Setting < ApplicationRecord
  VALID_PASSWORD_REGEX = /(?=.*[a-zA-Z])(?=.*[0-9])/
  enum protection_status: { password_absent: 0, password_present: 1 }

  has_secure_password
  has_secure_token :authentication_token

  validates :site_name, presence: true
  validates :password, length: { minimum: 6 }, if: -> { password.present? }, format: { with: VALID_PASSWORD_REGEX }
end
