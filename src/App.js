
/*
Rajeev Kulkarni, Madhur  - 1001857050
Shetty,Rohan Prakash - 1001969248
Vishwanath Shetty, Navyashree - 1001968039
*/

import { BrowserRouter, Route } from "react-router-dom";
import Home from './components/home/Home';
import Dashboard from './components/dashboard/Dashboard';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import LoginAdmin from './components/login-admin/login-admin';
import Login from './components/login/login';
import Signup from './components/signup/Signup';
import Property from './components/property/property';
import EditProperty from './components/property/editProperty';
import FamilyTree from './components/family-tree/family-tree';
import Sell from './components/sell/Expenses';
import chatsupport from './components/chat/chatsupport';
import LandDetails from './components/land/land';
import React, { Component } from 'react';

class App extends Component {
	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<Route path="/" exact component={Home} />
					<Route path="/dashboard" exact component={Dashboard} />
					<Route path="/about" exact component={About} />
					<Route path="/contact" exact component={Contact} />
					<Route path="/login-admin" exact component={LoginAdmin} />
					<Route path="/login" exact component={Login} />
					<Route path="/signup" exact component={Signup} />
					<Route path="/addProperty" exact component={Property} />
					<Route path="/editProperty" exact component={EditProperty} />
					<Route path="/sellLand" exact component={Sell} />
					<Route path="/familyTree" exact component={FamilyTree} />
					<Route path="/chatsupport" exact component={chatsupport} />
					<Route path="/landDetails" exact component={LandDetails} />
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
