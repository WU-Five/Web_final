import React from 'react';
import './App.css';
import TopTabs from './component/TopTabs';
import Login from './component/Login';
import Register from './component/Register';
import Introduction from './component/Introduction';
import SelfRoom from './container/SelfRoom';
import PublicRoom from './container/PublicRoom';
import TestVideo from './container/TestVideo';
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
				<Route path="/selfRoom" component={SelfRoom} />
				<Route path="/publicRoom" component={PublicRoom} />
			</Switch>
			<TestVideo />
		</div>
	);
}

export default App;
