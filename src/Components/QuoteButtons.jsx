import React from 'react';
import $ from 'jquery';

import InfoModal from './InfoModal';

//Constants
// const INTERVAL_TIME = 10000; //ms

class QuoteButtons extends React.Component {
	constructor(props) {
		super(props);

		// this.state = {
		// 	autoplay: false,
		// 	interval: {},
		// 	showInfo: false
		// };
		this.state = {
			showInfo: false
		};

		// this.getNewQuote = this.getNewQuote.bind(this);
		// this.autoplay = this.autoplay.bind(this);
		this.showInfo = this.showInfo.bind(this);
		this.hideInfo = this.hideInfo.bind(this);
		// this.handleQuoteClick = this.handleQuoteClick.bind(this);
		// this.handleAutoplayClick = this.handleAutoplayClick.bind(this);
	}
	// componentDidMount() {
	// 	//Load an initial quote/background
	// 	this.getNewQuote();

	// 	//Start the autoplay loop
	// 	// $('#auto-play').click();
	// 	this.autoplay();
	// }
	// getNewQuote() {
	// 	let url = 'https://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?';

	// 	$.getJSON(
	// 		url,
	// 		(data) => {
	// 			this.props.onClick({
	// 				quote: data.quoteText,
	// 				author: data.quoteAuthor
	// 			});
	// 		},
	// 		'jsonp'
	// 	);
	// }
	// autoplay() {
	// 	this.setState({
	// 		interval: window.setInterval(() => {
	// 			this.getNewQuote();
	// 		}, INTERVAL_TIME)
	// 	});
	// }
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
	// handleQuoteClick(e) {
	// 	e.preventDefault();

	// 	//If switching from autoplay, clear autoplay
	// 	if (this.state.autoplay === true) {
	// 		$('#new-quote').addClass('selectedButton');
	// 		$('#auto-play').removeClass('selectedButton');

	// 		clearInterval(this.state.interval);

	// 		this.setState({
	// 			autoplay: false
	// 		});
	// 	}
	// 	$('.textWrapper').stop();
	// 	this.getNewQuote();
	// }
	// handleAutoplayClick(e) {
	// 	e.preventDefault();

	// 	//If switching from manual mode, set autoplay
	// 	if (this.state.autoplay === false) {
	// 		$('#auto-play').addClass('selectedButton');
	// 		$('#new-quote').removeClass('selectedButton');

	// 		this.setState({
	// 			autoplay: true
	// 		});
	// 		$('.textWrapper').stop();
	// 		this.getNewQuote();
	// 		this.autoplay();
	// 	}
	// }
	render() {
		return (
			<div className="buttonsContainer">
				{/* <div className="buttonWrapper">
					<button id="new-quote" className="appButton" onClick={this.handleQuoteClick}>
						<i className="fas fa-step-forward" />
					</button>
				</div>
				<div className="buttonWrapper">
					<button id="auto-play" className="appButton selectedButton" onClick={this.handleAutoplayClick}>
						<i className="fas fa-sync-alt" />
					</button>
				</div> */}
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
