# frozen_string_literal: true

require "test_helper"

class SettingTest < ActiveSupport::TestCase
  def setup
    @setting = Setting.new(site_name: "Sample Site", password: "welcome123", protection_status: 0)
  end

  def test_site_name_should_be_present
    @setting.site_name = ""
    assert_not @setting.valid?
    assert_includes @setting.errors.full_messages, "Site name can't be blank"
  end

  def test_password_should_have_minimum_length
    @setting.password = "we12"
    assert_not @setting.save
    assert_equal @setting.errors.full_messages, ["Password is too short (minimum is 6 characters)"]
  end

  def test_password_cant_be_blank
    @setting.password = nil
    assert_not @setting.save
    assert_includes @setting.errors.full_messages, "Password can't be blank"
  end

  def test_validation_should_accept_valid_password
    valid_passwords = %w[1welcome w123456 W123456 wElCoMe123 WELCOME12345]
    valid_passwords.each do |password|
      @setting.password = password
      assert @setting.valid?
    end
  end

  def test_validation_should_reject_invalid_password
    invalid_passwords = %w[welcome WELCOME 1234567 wel2]
    invalid_passwords.each do |password|
      @setting.password = password
      assert @setting.invalid?
    end
  end

  def test_setting_should_have_valid_protection_status
    @setting.protection_status = 1
    assert @setting.valid?
  end

  def test_setting_cant_have_invalid_protection_status
    assert_raises(ArgumentError) do
      @setting.protection_status = 2
    end
  end
end
