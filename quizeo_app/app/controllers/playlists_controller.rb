# frozen_string_literal: true

class PlaylistsController < ApplicationController
  def index
    @playlists = Playlist.all
    render json: { playlists: @playlists }, include: :videos
  end

  def show
    @playlist = Playlist.where(id: params[:id])
    render json: { playlist: @playlist }, include: :videos
  end

  def create
    @user = User.find(params[:user_id])
    @user.playlists << Playlist.new(playlist_params)
    render json: { playlist: @user.playlists.last }
  end
  
  def update
    @playlist = Playlist.find(params[:id])
    @playlist.update(playlist_params)
    render json: { playlist: @playlist }
  end

  def destroy
    @playlist = Playlist.find(params[:id])
    @playlist.destroy
    render json: { message: "Destroyed playlist #{params[:id]}" }
  end

  private

  def playlist_params
    params
      .require(:data)
      .require(:attributes)
      .permit(
        :name,
        :thumbnail_url,
        :id,
        :user_id
      )
  end
end
