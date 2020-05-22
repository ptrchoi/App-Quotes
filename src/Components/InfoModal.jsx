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
						<li>
							Quotes provided by {' '}
							<a href="https://forismatic.com/en/" target="_blank">
								Forismatic
							</a>{' '}
						</li>
						<li>
							Images provided by {' '}
							<a href="https://unsplash.com/" target="_blank">
								Unsplash
							</a>{' '}
						</li>
						<li>
							Designed and Developed by Peter Choi ({' '}
							<a href="https://ptrchoi.com/" target="_blank">
								ptrchoi.com
							</a>{' '}
							)
						</li>
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
