# frozen_string_literal: true

class SettingsController < ApplicationController
  def update_site_data
    setting = Setting.first
    if setting && setting.update(setting_params)
      render status: :ok, json: { notice: t("successfully_updated", entity: "Setting") }
    else
      errors = setting.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  private

    def setting_params
      params.require(:setting).permit(:site_name, :password, :protection_status)
    end
end
