import React from 'react';
import $ from 'jquery';

//Components
import QuoteText from './QuoteText';
import QuoteButtons from './QuoteButtons';

//Constants
const INTERVAL_TIME = 10000; //ms
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
			interval: null
		};

		this.resetApp = this.resetApp.bind(this);
		this.startInterval = this.startInterval.bind(this);
		this.getNewQuote = this.getNewQuote.bind(this);
		this.handleQuoteData = this.handleQuoteData.bind(this);
		this.displayQuote = this.displayQuote.bind(this);
		this.getRandomQuotePosition = this.getRandomQuotePosition.bind(this);
		this.preloadImage = this.preloadImage.bind(this);
		this.displayImage = this.displayImage.bind(this);
		this.handleThemeChange = this.handleThemeChange.bind(this);
	}
	componentDidMount() {
		this.resetApp();
	}
	resetApp() {
		// Load an initial quote/background
		this.getNewQuote();
		this.preloadImage();

		// If not the first run, clear out the previous interval
		if (this.state.interval !== null) clearInterval(this.state.interval);

		// Start the interval timer
		this.startInterval();
	}
	startInterval() {
		this.setState({
			interval: window.setInterval(() => {
				this.getNewQuote();
				this.preloadImage();
			}, INTERVAL_TIME)
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
		this.preloadImage(); // Preload image into back panel for seamless transition

		$('.textWrapper').fadeOut(QUOTE_FADE_OUT_TIME, () => {
			this.displayImage();
			this.setState({
				quote: `${quote}`,
				author: `${author}`
			});

			let positionObj = this.getRandomQuotePosition();

			$('.textWrapper').css({ right: positionObj.x, top: positionObj.y });
			$('.textWrapper').fadeIn(QUOTE_FADE_IN_TIME);
		});
	}
	getRandomQuotePosition() {
		// % offset width from right edge
		const x_min = 3;
		const x_max = 12;
		// % offset height from top edge
		const y_min = 10;
		const y_max = 40;

		let x = (Math.floor(Math.random() * x_max) + x_min).toString() + '%';
		let y = (Math.floor(Math.random() * y_max) + y_min).toString() + '%';

		return {
			x: x,
			y: y
		};
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
		this.setState({
			theme: newTheme
		});
		this.resetApp();
	}
	render() {
		return (
			<div id="quote-box" className="container">
				<div className="panel-1 bg-img-panel" />
				<div className="panel-2 bg-img-panel" />
				<QuoteText text={this.state.quote} name={this.state.author} />
				<QuoteButtons onThemeChange={this.handleThemeChange} />
			</div>
		);
	}
}

export default App;
