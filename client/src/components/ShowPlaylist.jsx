import React, { Component } from 'react';

class ShowPLaylist extends Component {
  contructor(props) {
    super(props);
    this.state = {
      url: null,
      playing: true,
      volume: 0.8,
      muted: false,
      played: 0,
      loaded: 0,
      duration: 0
    };
  }
  playPause = () => {
    this.setState({ playing: !this.state.playing })
  }
  setVolume = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }
  toggleMuted = () => {
    this.setState({ muted: !this.state.muted })
  }
  onPlay = () => {
    console.log('onPlay')
    this.setState({ playing: true })
  }
  onPause = () => {
    console.log('onPause')
    this.setState({ playing: false })
  }
  onSeekMouseDown = e => {
    this.setState({ seeking: true })
  }
  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }
  onSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }
  onProgress = state => {
    console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }


  // ------------------------------WIP------------------------------
  onEnded = () => {
    this.state.hasQuiz ?
    showQuiz :
    this.setState({ 
      url: nextVideo,
      playing: true,
      played: 0,
      loaded: 0,})
  }
  // ---------------------------------------------------------------

  onDuration = (duration) => {
    this.setState({ duration })
  }
  onClickFullscreen = () => {
    screenfull.request(findDOMNode(this.player))
  }
  renderLoadButton = (url, label) => {
    return (
      <button onClick={() => this.load(url)}>
        {label}
      </button>
    )
  }
  ref = player => {
    this.player = player
  }

  render() {
    const { url, playing, volume, muted, loop, played, loaded, duration, playbackRate } = this.state
    return (
      <div>
        {props.playlistOrder.length ? props.playlistOrder[0].url : ""}
        <ReactPlayer
          ref={this.ref}
          className='react-player'
          width='100%'
          height='100%'
          url={url}
          playing={playing}
          volume={volume}
          muted={muted}
          onReady={() => console.log('onReady')}
          onStart={() => console.log('onStart')}
          onPlay={this.onPlay}
          onPause={this.onPause}
          onBuffer={() => console.log('onBuffer')}
          onSeek={e => console.log('onSeek', e)}
          onEnded={this.onEnded}
          onError={e => console.log('onError', e)}
          onProgress={this.onProgress}
          onDuration={this.onDuration}
        />
      </div>
    )
  }
}

export default ShowPLaylist;