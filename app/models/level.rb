class Level < ApplicationRecord
  has_many :scores
  has_many :users, through: :scores
  
  self.primary_key = :id
  
  validates :num_blues_reds, presence: true
end