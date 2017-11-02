class UsersController < ApplicationController::Base
  before_action :authenticate_user!
end