Rails.application.routes.draw do
  root to: 'events#index'
  resources :events

  mount APIBase => APIBase::PREFIX
end
