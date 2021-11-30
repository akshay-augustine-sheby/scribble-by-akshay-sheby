# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @category = Category.new(name: "Sample Category")
  end

  def test_category_name_should_be_present
    @category.name = ""
    assert_not @category.valid?
    assert_includes @category.errors.full_messages, "Name can't be blank"
  end
end
