class Answer < ApplicationRecord
  belongs_to :quiz
  has_many :stats
end
