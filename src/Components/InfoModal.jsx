import React from "react";

function InfoModal(props) {
  let { show, children, handleClose } = props;

  const modalShowHideClass = show
    ? "modal-overlay modal-show"
    : "modal-overlay modal-hide";
  return (
    <div className={modalShowHideClass}>
      <section className="modal-window">
        <h1>App Info</h1>
        <div>
          <h3>Random Quote Generator</h3>
          <ul>
            <li>
              A simple REACT web app based on{" "}
              <a href="https://www.freecodecamp.org/ptrchoi" target="_blank">
                FreeCodeCamp.org's
              </a>{" "}
              project curriculum, demonstrating use of front end libraries for a
              random quote generator (
              <a
                href="https://learn.freecodecamp.org/front-end-libraries/front-end-libraries-projects/build-a-random-quote-machine"
                target="_blank"
              >
                requirements and user stories here
              </a>
              ). Components have been refactored into single .js and .css files
              for{" "}
              <a
                href="https://codepen.io/ptrchoi/pen/mQEMXv?editors=0010"
                target="_blank"
              >
                Codepen demonstration
              </a>
              , original source on{" "}
              <a
                href="https://github.com/ptrchoi/FCC-New-Quote-Machine"
                target="_blank"
              >
                github
              </a>
              .
            </li>
            <li>Technologies include but are not limited to:</li>
            <ul>
              <li>Javascript | React | jQuery | SCSS | Node.js | Webpack</li>
            </ul>
            <li>Features and UX:</li>
            <ul>
              <li>
                Random quotes generated from the{" "}
                <a href="https://forismatic.com/en/api/" target="_blank">
                  Forismatic
                </a>{" "}
                API.
              </li>
              <li>
                Viewport positioning for quotes is also randomized within a
                target container.
              </li>
              <li>
                Responsive design with full-screen scaling background images and
                responsive font-size scaling, with transitional animation.
              </li>
              <li>
                Random (theme filtered) background images generated from{" "}
                <a href="https://unsplash.com/" target="_blank">
                  Unsplash's
                </a>{" "}
                image collections (non-API method).
              </li>
              <li>
                Controls for manual or auto-looping viewing, quote-sharing via
                tweet and application information modal overlay.
              </li>
              <li>
                Animated buttons with subdued transparency, highlighting when
                hovered.
              </li>
              <li>
                Code demonstrates functional programming with higher-order
                functions, advanced ES6 features, and modular programming with
                React and SCSS components.
              </li>
            </ul>
            <li>Coming soon...</li>
            <ul>
              <li>Refactor for PWA (Progressive Web App)</li>
            </ul>
          </ul>
        </div>
        {children}
        <button className="modal-close-button" onClick={handleClose}>
          <i className="fas fa-times" />
        </button>
      </section>
    </div>
  );
}

export default InfoModal;
