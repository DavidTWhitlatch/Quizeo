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

  def destroy
    @playlist = Playlist.find(params[:id])
    @playlist.destroy
    render json: { message: "Destroyed playlist #{params[:id]}" }
  end
end
