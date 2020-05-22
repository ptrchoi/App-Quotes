import React from 'react';

function QuoteText(props) {
	let { text, name } = props;
	let classList = 'textContainer';

	// Test for first run, hide entire text container so empty blockquote symbols don't display
	if (text === 'loading') classList = 'hidden';

	return (
		<div className={classList}>
			<div className="textWrapper">
				<div id="text" className="quoteText">
					<blockquote>{text}</blockquote>
				</div>
				<div id="author" className="authorText">
					<cite>{name}</cite>
				</div>
			</div>
		</div>
	);
}

export default QuoteText;
