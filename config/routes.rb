Rails.application.routes.draw do
  devise_for :users
  root 'static_pages#index'
  
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index]
      resources :levels, only: [:index]
      resources :scores, only: [:index, :create]
    end
  end
end
