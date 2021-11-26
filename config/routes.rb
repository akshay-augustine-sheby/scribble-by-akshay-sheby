# frozen_string_literal: true

Rails.application.routes.draw do
  root "home#index"
  get "/get_count" => "articles#get_count"
  get "*path", to: "home#index", via: :all
end
