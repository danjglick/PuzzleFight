class Score < ApplicationRecord
  belongs_to :user
  belongs_to :level
  
  validates :user_id, presence: true
  validates :level_id, presence: true
  validates :score, presence: true
  
  self.primary_key = :id
end