Rails.application.routes.draw do
  resources :users
  root 'users#index'

  namespace :api do
    namespace :v1 do
      resources :files, only: [:create]
    end
  end
end
