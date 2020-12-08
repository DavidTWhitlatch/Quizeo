class Video < ApplicationRecord
  belongs_to :playlist
  has_many :quizzes
end
