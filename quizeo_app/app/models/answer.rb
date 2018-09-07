class Answer < ApplicationRecord
  belongs_to :quiz
  has_and_belongs_to_many :users
end
