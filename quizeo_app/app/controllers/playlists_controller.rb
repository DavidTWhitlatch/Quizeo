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
end
