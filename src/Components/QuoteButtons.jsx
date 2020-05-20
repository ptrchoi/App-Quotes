import React from 'react';
import $ from 'jquery';

import InfoModal from './InfoModal';

class QuoteButtons extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showInfo: false
		};

		this.showInfo = this.showInfo.bind(this);
		this.hideInfo = this.hideInfo.bind(this);
		this.themeChange = this.themeChange.bind(this);
		this.playPause = this.playPause.bind(this);
	}
	showInfo() {
		this.setState({
			showInfo: true
		});
	}
	hideInfo() {
		this.setState({
			showInfo: false
		});
	}
	themeChange() {
		this.props.onThemeChange(document.getElementById('themes').value);
	}
	playPause(e, paused) {
		if (paused) {
			$('#pausePlayIcon').removeClass('fa-play');
			$('#pausePlayIcon').addClass('fa-pause');
		} else {
			$('#pausePlayIcon').removeClass('fa-pause');
			$('#pausePlayIcon').addClass('fa-play');
		}

		this.props.onPlayPause(!paused);
	}
	render(props) {
		return (
			<div className="buttonsContainer">
				<div className="buttonWrapper">
					<select name="themes" id="themes" onChange={this.themeChange} defaultValue={'heading'}>
						<option value="heading" disabled>
							Unsplash Themes
						</option>
						<option value="weather+scenic">Weather</option>
						<option value="beach+tropical">Beaches</option>
						<option value="nature">Nature</option>
						<option value="Christian">Spiritual</option>
						<option value="travel">Travel</option>
						<option value="architecture">Architecture</option>
						<option value="textures">Textures</option>
						<option value="people">People</option>
						<option value="animals">Animals</option>
						<option value="guitar">Guitars</option>
						<option value="music">Music</option>
						<option value="wallpaper">Wallpapers</option>
						<option value="tiltshift">Tiltshift</option>
						<option value="experimental">Experimental</option>
						<option value="editorial">Unsplash</option>
					</select>
				</div>
				<div className="buttonWrapper">
					<button
						id="playBtn"
						className="appButton"
						onClick={(e) => {
							this.playPause(e, this.props.paused);
						}}
					>
						<i id="pausePlayIcon" class="fas fa-pause" />
					</button>
				</div>
				<div className="buttonWrapper">
					<a id="tweet-quote" href="https://twitter.com/intent/tweet" target="_blank">
						<button className="appButton ">
							<i className="fab fa-twitter" />
						</button>
					</a>
				</div>
				<div className="buttonWrapper">
					<button id="app-info" className="appButton" onClick={this.showInfo}>
						<i className="fas fa-info" />
					</button>
				</div>
				<InfoModal show={this.state.showInfo} handleClose={this.hideInfo} />
			</div>
		);
	}
}

export default QuoteButtons;
