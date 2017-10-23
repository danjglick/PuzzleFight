class Level < ApplicationRecord
  has_many :scores
  has_many :users, through: :scores
  
  validates :num_blues_reds, presence: true
end