// Libraries
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import App from './Components/App';

// Style Sheets
import './styles/index';

class Index extends React.Component {
	render() {
		return <App />;
	}
}

ReactDOM.render(<Index />, document.getElementById('root'));
