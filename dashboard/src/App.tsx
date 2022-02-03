import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import {
	StylesProvider,
	createGenerateClassName,
} from '@material-ui/core/styles';

const generateClassName = createGenerateClassName({
	productionPrefix: 'dashboard',
});

import Dashboard from './components/Dashboard';

export default function App({ history }: any) {
	return (
		<div>
			<StylesProvider generateClassName={generateClassName}>
				<Router history={history}>
					<Switch>
						<Route exact path='/dashboard' component={Dashboard}></Route>
					</Switch>
				</Router>
			</StylesProvider>
		</div>
	);
}
