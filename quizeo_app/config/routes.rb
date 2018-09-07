Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post 'user_token' => 'user_token#create'
  resources :users
  resources :playlists do
    resources :videos
    resources :quizzes
  end
  resources :videos
  resources :quizzes do
    resources :answers
  end
end