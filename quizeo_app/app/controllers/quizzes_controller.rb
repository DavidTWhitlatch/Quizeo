class QuizzesController < ApplicationController
  def index
    @quizzes = Quiz.all
    render json: { quizzes: @quizzes }, include: :answers
  end

  def create
    @quiz = Video.find(params[:video_id])
    @playlist.videos << Quiz.new(quiz_params)
    render json: { video: @playlist.videos.last }
  end

  def update
    @quiz = Quiz.find(params[:id])
    @quiz.update(quiz_params)
    render json: { quiz: @quiz }
  end

  def destroy
    @quiz = Quiz.find(params[:id])
    @quiz.destroy
    render json: { message: "Destroyed quiz #{params[:id]}" }
  end

  private

  def quiz_params
    params
      .require(:data)
      .require(:attributes)
      .permit(
        :question,
        :id,
        :video_id
      )
  end
end
