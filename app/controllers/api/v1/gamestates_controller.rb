class Api::V1::GamestatesController < ApplicationController
  def index 
    render json: Gamestate.all
  end
  
  def create
    Gamestate.destroy_all
    Gamestate.create!(gamestate: params[:gamestate])
    render json: params[:gamestate]
  end
end