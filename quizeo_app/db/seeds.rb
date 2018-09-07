# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Video.destroy_all
Playlist.destroy_all
Quiz.destroy_all
Answer.destroy_all

@zane = User.create(username: 'zane', password: '12345')

@hots = @zane.playlists.create(name: 'HOTS guides')

@mephisto = @hots.videos.create(name: 'Mephisto Spotlight', url: 'https://www.youtube.com/watch?v=m0nt7SJKfwo', order: 1)

@game = @hots.quizzes.create(question: 'What game is Mephisto from?', order: 2)

@overwatch = @game.answers.create(option: 'Overwatch', is_correct: false)
@diablo = @game.answers.create(option: 'Diablo', is_correct: true)
@warcraft = @game.answers.create(option: 'WarCraft', is_correct: false)
@starcraft = @game.answers.create(option: 'StarCraft', is_correct: false)

@zane.answers << @diablo