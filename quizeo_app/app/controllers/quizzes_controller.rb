# frozen_string_literal: true

class QuizzesController < ApplicationController
  def index
    @quizzes = Quiz.all
    render json: { quizzes: @quizzes }, include: :answers
  end
end
