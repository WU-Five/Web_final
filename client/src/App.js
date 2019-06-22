import React from 'react';
import './App.css';
import TopTabs from './component/TopTabs';
import Login from './component/Login';
import Register from './component/Register';
import { Switch, Route } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<TopTabs />
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
			</Switch>
		</div>
	);
}

export default App;
