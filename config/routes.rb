# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    resources :articles, only: %i[index], param: :id
    resources :categories, only: %i[index]
  end

  root "home#index"
  get "/get_articles_count" => "articles#get_articles_count"
  get "*path", to: "home#index", via: :all
end
