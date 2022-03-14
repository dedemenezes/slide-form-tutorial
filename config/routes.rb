Rails.application.routes.draw do
  root to: 'books#index'
  resources :books, only: %i[create]
end
