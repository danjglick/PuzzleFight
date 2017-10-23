class Score < ApplicationRecord
  belongs_to :user
  belongs_to :level
  
  validates :user_id, presence: true
  validates :level_id, presence: true
  validates :is_alltime_best?, presence: true
  validates :is_personal_best?, presence: true
end