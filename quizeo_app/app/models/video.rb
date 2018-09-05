class Video < ApplicationRecord
  has_many :playlists
  belongs_to :user
end
