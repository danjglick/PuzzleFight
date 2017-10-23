class User < ApplicationRecord
  has_many :scores
  has_many :levels, through: :scores
  
  validates :username, presence: true
  validates :password, presence: true
end