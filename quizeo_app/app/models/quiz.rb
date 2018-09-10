class Quiz < ApplicationRecord
  has_many :answers
  belongs_to :video
end
