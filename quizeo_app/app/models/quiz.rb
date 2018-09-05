class Quiz < ApplicationRecord
  has_many :answers
  has_many :playlists
  belongs_to :user
end
