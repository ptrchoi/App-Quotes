import React from 'react';
import $ from 'jquery';

//Components
import QuoteText from './QuoteText';
import QuoteButtons from './QuoteButtons';

//Constants
const DISPLAY_TIME = 10; //s
const QUOTE_FADE_IN_TIME = 3000; //ms
const QUOTE_FADE_OUT_TIME = 1500; //ms
const IMAGE_TRANSITION_TIME = 0.8; //s

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			quote: '',
			author: '',
			imageUrl: '',
			theme: 'weather+scenic', // Default value to match dropdown list in QuoteButtons component
			interval: null,
			displayTimer: 0, // In secs
			paused: false,
			pausedReset: false
		};

		this.reset = this.reset.bind(this);
		this.startInterval = this.startInterval.bind(this);
		this.getNewQuote = this.getNewQuote.bind(this);
		this.handleQuoteData = this.handleQuoteData.bind(this);
		this.displayQuote = this.displayQuote.bind(this);
		this.preloadImage = this.preloadImage.bind(this);
		this.displayImage = this.displayImage.bind(this);
		this.handleThemeChange = this.handleThemeChange.bind(this);
		this.handlePlayPause = this.handlePlayPause.bind(this);
		this.handleNextQuote = this.handleNextQuote.bind(this);
	}
	componentDidMount() {
		this.reset();
	}
	reset() {
		// Load an initial quote/background
		this.getNewQuote();
		this.preloadImage();

		// If not the first run, clear out the previous interval
		if (this.state.interval !== null) clearInterval(this.state.interval);

		// Reset the display timer
		this.setState({
			displayTimer: 0
		});

		// Start the interval timer
		this.startInterval();
	}
	startInterval() {
		// Set interval (1s) and start next quote cycle when limit reached
		let interval = window.setInterval(() => {
			let { displayTimer, paused } = this.state;

			// Increase the timer count (every 1s (1000ms))
			if (!paused) displayTimer++;

			// When timer reaches limit, get next quote & image, reset timer
			if (displayTimer > DISPLAY_TIME) {
				this.getNewQuote();
				this.preloadImage();
				displayTimer = 0;
			}

			// Update timer
			this.setState({
				displayTimer: displayTimer
			});
		}, 1000);

		this.setState({
			interval: interval
		});
	}
	getNewQuote() {
		let url = 'https://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?';

		$.getJSON(
			url,
			(data) => {
				this.handleQuoteData({
					quote: data.quoteText,
					author: data.quoteAuthor
				});
			},
			'jsonp'
		);
	}
	handleQuoteData(newQuote) {
		let author = `${newQuote.author}`;

		// Clean up bad author data
		if (author.length < 1 || author === 'Donald Trump' || author === 'Donald Trump ') {
			author = 'unknown author';
		}

		this.displayQuote(newQuote.quote, author);
	}
	displayQuote(quote, author) {
		// Preload image into back panel for seamless transition
		this.preloadImage();

		$('.textWrapper').fadeOut(QUOTE_FADE_OUT_TIME, () => {
			this.displayImage();
			this.setState({
				quote: `${quote}`,
				author: `${author}`
			});

			$('.textWrapper').fadeIn(QUOTE_FADE_IN_TIME);
		});
	}
	preloadImage() {
		// Add selected theme variable to url
		// and a random signature (for known bug in the unsplash docs)
		let url =
			'https://source.unsplash.com/random/featured/?' +
			this.state.theme +
			'/?sig=' +
			Math.floor(Math.random() * 1000);

		let imageProperties = {
			background: `url(${url})`,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center center',
			backgroundAttachment: 'fixed',
			backgroundSize: 'cover'
		};

		// "pre-load" new image into back panel
		let bgEl = document.getElementsByClassName('panel-2')[0];
		Object.assign(bgEl.style, imageProperties);

		// Set new image
		this.setState({
			imageUrl: url
		});
	}
	displayImage() {
		let imageProperties = {
			background: `url(${this.state.imageUrl})`,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center center',
			backgroundAttachment: 'fixed',
			backgroundSize: 'cover',
			transition: `all ease-in-out ${IMAGE_TRANSITION_TIME}s`
		};

		let bgEl = document.getElementsByClassName('panel-1')[0];
		Object.assign(bgEl.style, imageProperties);
	}
	handleThemeChange(newTheme) {
		let { paused, pausedReset } = this.state;

		// Check if paused, if so reset needs to be called after unpaused
		if (paused) pausedReset = true;

		this.setState({
			theme: newTheme,
			pausedReset: pausedReset
		});

		// If not paused, reset now
		if (!pausedReset) this.reset();
	}
	handlePlayPause(pause) {
		let { pausedReset } = this.state;

		// If a reset was already paused, and user unpaused - do the reset now and clear the pausedReset state
		if (!pause && pausedReset) {
			this.reset();
			pausedReset = false;
		}

		this.setState({
			paused: pause,
			pausedReset: pausedReset
		});
	}
	handleNextQuote() {
		this.reset();
	}
	render() {
		return (
			<div id="quote-box" className="container">
				<div className="panel-1 bg-img-panel" />
				<div className="panel-2 bg-img-panel" />
				<QuoteText text={this.state.quote} name={this.state.author} />
				<QuoteButtons
					onThemeChange={this.handleThemeChange}
					paused={this.state.paused}
					onPlayPause={this.handlePlayPause}
					onNextQuote={this.handleNextQuote}
				/>
			</div>
		);
	}
}

export default App;
