class Playlist < ApplicationRecord
  belongs_to :user
  has_many :videos
  has_many :quizzes
end
