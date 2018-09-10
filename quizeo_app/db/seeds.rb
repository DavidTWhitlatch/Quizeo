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

@hots = @zane.playlists.create(name: 'HOTS guides1')
@hots2 = @zane.playlists.create(name: 'HOTS guides2')
@hots3 = @zane.playlists.create(name: 'HOTS guides3')
@hots4 = @zane.playlists.create(name: 'HOTS guides4')
@hots5 = @zane.playlists.create(name: 'HOTS guides5')
@hots6 = @zane.playlists.create(name: 'HOTS guides6')
@hots7 = @zane.playlists.create(name: 'HOTS guides7')
@hots8 = @zane.playlists.create(name: 'HOTS guides8')
@hots9 = @zane.playlists.create(name: 'HOTS guides9')
@hots10 = @zane.playlists.create(name: 'HOTS guides10')
@hots11 = @zane.playlists.create(name: 'HOTS guides11')

@mephisto = @hots.videos.create(name: 'Mephisto Spotlight', url: 'https://www.youtube.com/watch?v=m0nt7SJKfwo', order: 1)
@whitemane = @hots.videos.create(name: 'Whitemane Spotlight', url: 'https://www.youtube.com/watch?v=HdpqWokf3_w', order: 2)

@mephisto2 = @hots2.videos.create(name: 'Mephisto Spotlight', url: 'https://www.youtube.com/watch?v=m0nt7SJKfwo', order: 1)

@game = @mephisto.quizzes.create(question: 'What game is Mephisto from?')

@overwatch = @game.answers.create(option: 'Overwatch', is_correct: false)
@diablo = @game.answers.create(option: 'Diablo', is_correct: true)
@warcraft = @game.answers.create(option: 'WarCraft', is_correct: false)
@starcraft = @game.answers.create(option: 'StarCraft', is_correct: false)

@zane.answers << @diablo
