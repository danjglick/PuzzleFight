class Api::V1::GamestatesController < ApplicationController
  def index 
    render json: Gamestate.all
  end
  
  def create
    Gamestate.destroy_all
    Gamestate.create!(current_state: params[:currentState])
    render json: Gamestate.all
  end
end