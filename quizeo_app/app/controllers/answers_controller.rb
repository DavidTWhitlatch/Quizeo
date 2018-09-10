# frozen_string_literal: true

class AnswersController < ApplicationController

  def create
    if params[:user_id]
      @answer = Answer.find(answer_params[:id])
      @user = User.find(params[:user_id]).answers << @answer
    else
      @answer = Quiz.find(params[:quiz_id]).answers.new(answer_params)
    end
    render json: { answer: @answer }
  end

  def update
    @answer = Answer.find(params[:id])
    @answer.update(answer_params)
    render json: { answer: @answer }
  end

  def destroy
    @answer = Answer.find(params[:id])
    @answer.destroy
    render json: { message: "Destroyed answer #{params[:id]}" }
  end

  private

  def answer_params
    params
      .require(:data)
      .require(:attributes)
      .permit(
        :option,
        :is_correct,
        :id,
        :user_id,
        :quiz_id
      )
  end
end
