# frozen_string_literal: true

class RedirectionsController < ApplicationController
  before_action :load_redirection, only: %i[update destroy]

  def index
    redirections = Redirection.all.as_json()
    render status: :ok, json: { redirections: redirections }
  end

  def create
    redirection = Redirection.new(redirection_params)
    if redirection.save
      render status: :ok,
        json: { notice: t("successfully_created", entity: "Redirection") }
    else
      errors = redirection.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def update
    if @redirection.update(redirection_params)
      render status: :ok, json: { notice: t("successfully_updated", entity: "Redirection") }
    else
      errors = @redirection.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def destroy
    if @redirection.destroy
      render status: :ok, json: { notice: t("successfully_deleted", entity: "Redirection") }
    else
      errors = @redirection.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  private

    def redirection_params
      params.require(:redirection).permit(:from_path, :to_path)
    end

    def load_redirection
      @redirection = Redirection.find_by(id: params[:id])
      unless @redirection
        render status: :not_found, json: { error: t("not_found", entity: "Redirection") }
      end
    end
end
