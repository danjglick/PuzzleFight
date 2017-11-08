class Api::V1::ScoresController < ApplicationController
  skip_before_action :verify_authenticity_token, raise: false
  before_action :authenticate_user!
  
  def index
    render json: {
      all_scores: Score.all,
      current_user: current_user
    }
  end
  
  def create
    current_personal_best = Score.where(
      level_id: params[:level], 
      user_id: current_user.id
    )
    if current_personal_best.empty?
      score = Score.create!(
        level_id: params[:level], 
        user_id: current_user.id, 
        score: params[:score] + 1,
      )
    else
      if params[:score] < current_personal_best[0].score
        Score.where(
          level_id: params[:level],
          user_id: current_user.id
        ).destroy_all
        score = Score.create!(
          level_id: params[:level], 
          user_id: current_user.id, 
          score: params[:score] + 1
        )
      end
    end
    render json: {level: params[:level], score: params[:score]}
  end
end