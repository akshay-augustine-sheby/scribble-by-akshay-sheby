# frozen_string_literal: true

class SettingsController < ApplicationController
  before_action :load_setting, only: %i[update_site_data get_site_data]

  def update_site_data
    if @setting.update(setting_params)
      render status: :ok, json: { notice: t("successfully_updated", entity: "Setting") }
    else
      errors = @setting.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def get_site_data
    render status: :ok, json: { setting: @setting }
  end

  private

    def setting_params
      params.require(:setting).permit(:site_name, :password, :protection_status)
    end

    def load_setting
      @setting = Setting.first
      unless @setting
        render status: :not_found, json: { error: t("not_found", entity: "Setting") }
      end
    end
end
