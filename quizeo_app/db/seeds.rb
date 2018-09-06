# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

user = User.new
user.username = 'zane'
user.password = '12345'
user.password_confirmation = '12345'
user.save

video = Video.new
video.name = "Mephisto First Impressions"
video.url = "https://www.youtube.com/watch?v=X1FbSc1-YE4"
video.user_id = user
video.save

playlist = Playlist.new
playlist.name = "HOTS guides"
playlist.video_id = 