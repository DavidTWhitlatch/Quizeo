Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post 'user_token' => 'user_token#create'
  resources :users do
    resources :playlists
    resources :answers
  end
  resources :playlists do
    resources :videos
  end
  resources :videos do
    resources :quizzes
  end
  resources :quizzes do
    resources :answers
  end
end
