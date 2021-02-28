import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
//@ts-ignore
import { mount } from 'dashboard/app';

const DashboardApp = () => {
	const ref = useRef(null);
	const history = useHistory();
	useEffect(() => {
		let args = {
			element: ref.current,
			params: {
				onNavigation: ({ pathname: nextPathName }: any) => {
					const { pathname } = history.location;
					if (pathname !== nextPathName) {
						history.push(nextPathName);
					}
				},
				initialPath: [history.location.pathname],
			},
		};
		const { onParentNavigate } = mount(args);
		history.listen((location) => {
			onParentNavigate(location);
		});
	}, []);
	return <div ref={ref}></div>;
};

export default DashboardApp;
