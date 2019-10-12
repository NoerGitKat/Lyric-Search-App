import React, { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Index from './components/pages/Index';
import Lyrics from './components/pages/Lyrics';

// Context
import { Provider } from './context/';

// Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Styles
import './App.scss';

function App() {
	return (
		<Fragment>
			<Provider>
				<Navbar />
				<Router>
					<div className="container">
						<Switch>
							<Route exact path="/" component={Index} />
							<Route exact path="/lyrics/track/:id" component={Lyrics} />
						</Switch>
					</div>
				</Router>
			</Provider>
		</Fragment>
	);
}

export default App;
