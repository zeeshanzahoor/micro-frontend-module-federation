import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Route, Switch, Router, Redirect } from 'react-router-dom';
import {
	StylesProvider,
	createGenerateClassName,
} from '@material-ui/core/styles';
import Header from '../components/Header';
import { createBrowserHistory } from 'history';

const AuthApp = lazy(() => import('../components/AuthApp'));
const MarketingApp = lazy(() => import('../components/MarketingApp'));
const DashboardApp = lazy(() => import('../components/DashboardApp'));

const generateClassName = createGenerateClassName({
	productionPrefix: 'container',
});

const history = createBrowserHistory();

function App() {
	const [isSignedIn, setSignedIn] = useState(false);
	useEffect(() => {}, [isSignedIn]);
	return (
		<StylesProvider generateClassName={generateClassName}>
			<Router history={history}>
				<div>
					<Header
						signedIn={isSignedIn}
						onSignOut={() => {
							setSignedIn(false);
						}}
					/>
					<Suspense fallback={<div>loading</div>}>
						<Switch>
							<Route path='/auth'>
								<AuthApp
									onSignIn={() => {
										setSignedIn(true);
										history.push('/dashboard');
									}}
								/>
							</Route>
							<Route path='/dashboard'>
								{!isSignedIn && <Redirect to='/' />}
								<DashboardApp />
							</Route>
							<Route path='/' component={MarketingApp}></Route>
						</Switch>
					</Suspense>
				</div>
			</Router>
		</StylesProvider>
	);
}

export default App;
