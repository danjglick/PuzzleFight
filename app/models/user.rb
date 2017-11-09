class User < ApplicationRecord
  has_many :scores
  has_many :levels, through: :scores
  
  validates :username, presence: true
  validates :email, presence: true
  validates :encrypted_password, presence: true
  
  self.primary_key = :id
  
  devise(
    :database_authenticatable, 
    :registerable, 
    :recoverable, 
    :rememberable, 
    :trackable, 
    :validatable
  )
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
end