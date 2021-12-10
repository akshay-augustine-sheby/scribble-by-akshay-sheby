# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    resources :articles, except: %i[new edit], param: :id
    resources :categories, except: %i[new edit show], param: :id
  end

  root "home#index"
  get "/get_articles_count" => "articles#get_articles_count"
  put "/update_site_data" => "settings#update_site_data"
  get "/get_site_data" => "settings#get_site_data"
  get "/get_authentication_status" => "settings#get_authentication_status"
  put "/update_position/:position" => "categories#update_position"
  get "*path", to: "home#index", via: :all
end
