import React from 'react';
import $ from 'jquery';
import html2canvas from 'html2canvas';

import InfoModal from './InfoModal';

class QuoteButtons extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showInfo: false,
			modalPaused: false,
			screenshotPaused: false
		};

		this.showInfo = this.showInfo.bind(this);
		this.hideInfo = this.hideInfo.bind(this);
		this.themeChange = this.themeChange.bind(this);
		this.playPause = this.playPause.bind(this);
		this.nextQuote = this.nextQuote.bind(this);
		this.screenshot = this.screenshot.bind(this);
	}
	showInfo() {
		let { paused } = this.props;
		let { modalPaused } = this.state;
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
	nextQuote() {
		this.props.onNextQuote();
	}
	screenshot() {
		let { paused } = this.props;
		let { screenshotPaused } = this.state;

		// Pause on screenshot if not already paused. Update state - screenshot triggered pause to be able to unpause.
		if (paused === false) {
			$('#playBtn').click();
			this.setState({
				screenshotPaused: true
			});
		}

		//
		setTimeout(() => {
			html2canvas($('.textWrapper')[0], {
				backgroundColor: 'rgba(128, 128, 128, 1)',
				scale: 0.8
			}).then(function(canvas) {
				let data = canvas.toDataURL('image/png');
				let newWindow = window.open('about:blank', 'image from canvas');
				newWindow.document.write("<img src='" + data + "' alt='from canvas'/>");
			});
			if (this.state.screenshotPaused === true) {
				$('#playBtn').click();
				this.setState({
					screenshotPaused: false
				});
			}
		}, 500);
	}
	render(props) {
		return (
			<div className="buttonsContainer">
				<div className="buttonWrapper btn-1">
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
				<div className="buttonWrapper btn-2">
					<button id="nextBtn" className="appButton" onClick={this.nextQuote}>
						<i id="pausePlayIcon" class="fas fa-forward" />
					</button>
				</div>
				<div className="buttonWrapper btn-3">
					<button id="screenshotBtn" className="appButton " onClick={this.screenshot}>
						<i className="fa fa-copy" />
					</button>
				</div>
				<div className="buttonWrapper btn-4">
					<button id="app-info" className="appButton" onClick={this.showInfo}>
						<i className="fa fa-info" />
					</button>
				</div>
				<div className="buttonWrapper btn-5">
					<select
						name="themes"
						id="themes"
						className="appButton"
						onChange={this.themeChange}
						defaultValue={'heading'}
					>
						<option value="heading" id="listLabel" disabled>
							Image Themes
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
				<InfoModal show={this.state.showInfo} handleClose={this.hideInfo} />
			</div>
		);
	}
}

export default QuoteButtons;
