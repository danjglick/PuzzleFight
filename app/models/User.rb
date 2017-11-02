class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise(
    :database_authenticatable, 
    :registerable, 
    :recoverable, 
    :rememberable, 
    :trackable, 
    :validatable
  )
  has_many :scores
  has_many :levels, through: :scores
  validates :username, presence: true
  validates :password, presence: true
end