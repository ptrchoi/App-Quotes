import React from "react";

function QuoteText(props) {
  return (
    <div className="textWrapper">
      <div id="text" className="quoteText">
        <blockquote>{`${props.text}`}</blockquote>
      </div>
      <div id="author" className="authorText">
        <cite>{props.name}</cite>
      </div>
    </div>
  );
}

export default QuoteText;
