import React from 'react';
import $ from 'jquery';
import html2canvas from 'html2canvas';

import InfoModal from './InfoModal';

class QuoteButtons extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showInfo: false,
			modalPaused: false
		};

		this.showInfo = this.showInfo.bind(this);
		this.hideInfo = this.hideInfo.bind(this);
		this.themeChange = this.themeChange.bind(this);
		this.playPause = this.playPause.bind(this);
		this.screenshot = this.screenshot.bind(this);
	}
	showInfo() {
		let { paused, modalPaused } = this.props;
		// Pause on info modal if not already paused. Update state - infoModal triggered pause to be able to unpause.
		if (paused === false) {
			$('#playBtn').click();
			modalPaused = true;
		}
		this.setState({
			showInfo: true,
			modalPaused: modalPaused
		});
	}
	hideInfo() {
		let { modalPaused } = this.state;

		// Check if infoModal triggered pause, if so unpause.
		if (modalPaused) {
			$('#playBtn').click();
			modalPaused = false;
		}
		this.setState({
			showInfo: false,
			modalPaused: modalPaused
		});
	}
	themeChange() {
		this.props.onThemeChange(document.getElementById('themes').value);
	}
	playPause(e, paused) {
		if (paused) {
			$('#playBtn').removeClass('selectedButton');
		} else {
			$('#playBtn').addClass('selectedButton');
		}

		this.props.onPlayPause(!paused);
	}
	screenshot() {
		html2canvas(document.body, { useCORS: true }).then(function(canvas) {
			const data = canvas.toDataURL('image/png');

			let newWindow = window.open('about:blank', 'image from canvas');
			newWindow.document.write("<img src='" + data + "' alt='from canvas'/>");
		});
	}
	render(props) {
		return (
			<div className="buttonsContainer">
				<div className="buttonWrapper">
					<select
						name="themes"
						id="themes"
						className="appButton"
						onChange={this.themeChange}
						defaultValue={'heading'}
					>
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
					<button id="screenshotBtn" className="appButton " onClick={this.screenshot}>
						<i className="fas fa-camera" />
					</button>
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
