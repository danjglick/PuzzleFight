class Api::V1::LevelsController < ApplicationController
  def index 
    render json: Level.all
  end
end