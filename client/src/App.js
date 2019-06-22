import React from 'react';
import './App.css';
import TopTabs from './component/TopTabs';
import Login from './component/Login';
import Register from './component/Register';
import Introduction from './component/Introduction';
import { Switch, Route, Redirect } from 'react-router-dom';
function App() {
	return (
		<div className="App">
			<TopTabs />
			<Switch>
				<Route exact path="/" render={() => <Redirect to="/introduction" />} />
				<Route path="/introduction" component={Introduction} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
			</Switch>
		</div>
	);
}

export default App;
