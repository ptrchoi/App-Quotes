import React from 'react';

function InfoModal(props) {
	let { show, children, handleClose } = props;

	const modalShowHideClass = show ? 'modal-overlay modal-show' : 'modal-overlay modal-hide';
	return (
		<div className={modalShowHideClass}>
			<section className="modal-window">
				<h1>About</h1>
				<div className="info-content">
					<p>
						A clean mobile + desktop React app that generates inspirational quotes over fullscreen,
						high-resolution images. Fully responsive, fluidly scaling images and text, with content pulling
						from several popular API's. Users can choose from a variety of photo themes, pause on the
						current content (ie. for a screengrab), or tweet out the current quote.
					</p>
					<p>
						<h4>Technologies:</h4>
						<ul>
							<li>Javascript | React | jQuery | SCSS | Firebase | Node.js | Parcel</li>
						</ul>
					</p>
					<p>
						<h4>Features and UX:</h4>
						<ul>
							<li>Quotes generated from the Forismatic API.</li>
							<li>Quote positioning is also dynamcially randomized within the viewport.</li>
							<li>
								Responsive design with full-screen, fluid-scaling background images and responsive
								font-size scaling (ie. no harsh breakpoints), with transitional animations between
								content cycling.
							</li>
							<li>Themed images generated from Unsplash's image collections.</li>
							<li>Animated buttons, tweet sharing, information modal overlay.</li>
							<li>
								Code demonstrates functional programming with higher-order functions, advanced ES6
								features, and modular programming with React and SCSS components.
							</li>
						</ul>
					</p>
				</div>
				{children}
				<button className="modal-close-button" onClick={handleClose}>
					<i className="fas fa-times-circle" />
				</button>
			</section>
		</div>
	);
}

export default InfoModal;
