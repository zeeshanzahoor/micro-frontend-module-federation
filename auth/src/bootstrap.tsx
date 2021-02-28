import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMemoryHistory, createBrowserHistory } from 'history';

interface MountProps {
	element: Element;
	params: {
		onNavigation?: (nextPathName: string) => void;
		onSignIn: () => void;
		defaultHistory: any;
		initialPath?: string[];
	};
}

export const mount = (args: MountProps) => {
	const history =
		args.params.defaultHistory ||
		createMemoryHistory({
			initialEntries: args.params.initialPath,
		});
	if (args.params.onNavigation) {
		history.listen(args.params.onNavigation);
	}
	ReactDOM.render(
		<App history={history} onSignIn={args.params.onSignIn} />,
		args.element
	);
	return {
		onParentNavigate({ pathname: nextPathName }: any) {
			let { pathname } = history.location;
			if (pathname !== nextPathName) {
				history.push(nextPathName);
			}
		},
	};
};

if (process.env.NODE_ENV === 'development') {
	let devRoot = document.querySelector('#__auth');
	if (devRoot) {
		let props: MountProps = {
			element: devRoot,
			params: {
				defaultHistory: createBrowserHistory(),
				onSignIn: () => {
					console.log('on sign in triggered');
				},
			},
		};
		mount(props);
	}
}
