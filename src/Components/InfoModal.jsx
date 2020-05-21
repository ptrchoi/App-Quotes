import React from 'react';

function InfoModal(props) {
	let { show, children, handleClose } = props;

	const modalShowHideClass = show ? 'modal-overlay modal-show' : 'modal-overlay modal-hide';
	return (
		<div className={modalShowHideClass}>
			<section className="modal-window">
				<h1>About</h1>
				<div className="info-content">
					<ul>
						<li>Quotes from Forismatic.</li>
						<li>Images from Unsplash.</li>
						<li>Designed and Developed by Peter Choi (ptrchoi.com)</li>
					</ul>
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
