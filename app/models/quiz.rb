class Quiz < ApplicationRecord
  belongs_to :video
  has_many :answers
end
