class User < ApplicationRecord
  def self.from_token_request(request)
    username = request.params['auth'] && request.params['auth']['username']
    find_by username: username
  end

  has_secure_password
  has_many :videos
  has_many :playlists
  has_many :quizzes
  has_and_belongs_to_many :answers
end
