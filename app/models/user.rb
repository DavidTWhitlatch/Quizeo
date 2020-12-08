class User < ApplicationRecord
  has_many :playlists
  has_and_belongs_to_many :answers
end
