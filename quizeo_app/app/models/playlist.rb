class Playlist < ApplicationRecord
  belongs_to :video
  belongs_to :quiz
  belongs_to :user
end
