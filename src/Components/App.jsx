import React from 'react';
import $ from 'jquery';

//Components
import QuoteText from './QuoteText';
import QuoteButtons from './QuoteButtons';

//Constants
const QUOTE_FADE_IN_TIME = 5000; //ms
const QUOTE_FADE_OUT_TIME = 2000; //ms
const IMAGE_TRANSITION_TIME = 0.8; //s
const IMAGE_PRELOAD_DELAY = 1000; //ms
const UNSPLASH_URL = 'https://source.unsplash.com/random/featured/?weather/?sig=';
const Y_MIN = 10; //vh
const Y_MAX = 50; //vh
const X_MIN = 15; //vw
const X_MAX = 20; //vw

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			quote: '',
			author: '',
			url: ''
		};

		this.preloadImage = this.preloadImage.bind(this);
		this.updateImage = this.updateImage.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	preloadImage() {
		let url = UNSPLASH_URL + Math.floor(Math.random() * 1000); //add a random signature - known bug in the unsplash docs

		this.setState({
			url: url
		});

		let preloadedImageProperties = {
			backgroundImage: `url(${url})`,
			backgroundRepeat: 'no-repeat',
			opacity: '0'
		};

		let div = document.getElementsByClassName('dummyDiv')[0];
		Object.assign(div.style, preloadedImageProperties);

		setTimeout(() => {
			this.updateImage();
		}, IMAGE_PRELOAD_DELAY);
	}
	updateImage() {
		let imageProperties = {
			backgroundImage: `url(${this.state.url})`,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center center',
			backgroundAttachment: 'fixed',
			transition: `all ease-in-out ${IMAGE_TRANSITION_TIME}s`
		};

		let body = document.getElementsByTagName('body')[0];
		Object.assign(body.style, imageProperties);
	}
	handleClick(newQuote) {
		let author = `${newQuote.author}`;

		if (author.length < 1) {
			author = 'unknown author';
		}

		$('.textWrapper').fadeOut(QUOTE_FADE_OUT_TIME, () => {
			this.preloadImage();
			this.setState({
				quote: `${newQuote.quote}`,
				author: `${author}`
			});

			//Generate a random quote location within x & y targets
			let xStr = (Math.floor(Math.random() * X_MAX) + X_MIN).toString() + 'vw';
			let yStr = (Math.floor(Math.random() * Y_MAX) + Y_MIN).toString() + 'vh';

			$('.textWrapper').css({ left: xStr, top: yStr });
			$('.textWrapper').fadeIn(QUOTE_FADE_IN_TIME);
		});
	}
	render() {
		return (
			<div id="quote-box" className="container">
				<QuoteText text={this.state.quote} name={this.state.author} />
				<QuoteButtons onClick={this.handleClick} />
				<div className="dummyDiv" />
			</div>
		);
	}
}

export default App;
