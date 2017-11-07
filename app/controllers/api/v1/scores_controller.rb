class Api::V1::ScoresController < ApplicationController
  def index 
    render json: Score.all
  end
  
  def new
    @score = Scores.find()
  end
  
  def create
    binding.pry
    currentPersonalBest = Score.where(
      level_id: params[:level], 
      user_id: current_user.id
    )
    if currentPersonalBest.empty?
      @score = Score.create!(
        level_id: params[:level], 
        user_id: current_user.id, 
        score: params[:currentScore],
      )
      @score.save!
    else
      if params[:currentScore] < currentPersonalBest.score
        Score.where(
          level_id: params[:level],
          user_id: current_user.id
        ).destroy_all
        @score = Score.create!(
          level_id: params[:level], 
          user_id: current_user.id, 
          score: params[:currentScore]
        )
      end
    end
  end
end