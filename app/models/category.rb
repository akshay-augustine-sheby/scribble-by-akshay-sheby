# frozen_string_literal: true

class Category < ApplicationRecord
  has_many :articles, dependent: :nullify

  validates :name, presence: true
end
