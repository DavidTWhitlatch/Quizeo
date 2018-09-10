class VideosController < ApplicationController

  def create
    @playlist = Playlist.find(params[:playlist_id])
    @playlist.videos << Video.new(video_params)
    render json: { video: @playlist.videos.last }
  end
  
  def update
    @video = Video.find(params[:id])
    @video.update(video_params)
    render json: { video: @video }
  end

  def destroy
    @video = Video.find(params[:id])
    @video.destroy
    render json: { message: "Destroyed video #{params[:id]}" }
  end

  private

  def video_params
    params
      .require(:data)
      .require(:attributes)
      .permit(
        :url,
        :id,
        :playlist_id
      )
  end
end
