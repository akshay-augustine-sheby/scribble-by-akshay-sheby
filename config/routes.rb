# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    resources :articles, except: %i[new edit], param: :slug
    resources :categories, except: %i[new edit show], param: :id
    resources :redirections, except: %i[new edit show], param: :id
    get "/get_articles_count" => "articles#get_articles_count"
    put "/update_site_data" => "settings#update_site_data"
    get "/get_site_data" => "settings#get_site_data"
    get "/get_authentication_status" => "settings#get_authentication_status"
    post "/authenticate_using_password" => "settings#authenticate_using_password"
    put "/update_position/:position" => "categories#update_position"
    get "/get_categories_articles" => "categories#get_categories_articles"
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
