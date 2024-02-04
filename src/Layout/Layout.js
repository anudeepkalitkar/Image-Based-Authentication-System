import React from "react";
import "./Layout.css";
const Layout = (props) => {
	const { PassedComponent } = props;
	return (
			<div className="row">
				<div className="col s6 layout ">
					
				</div>
				<div className="col s6 application">
					
					<PassedComponent />
				</div>
			</div>
	);
};

export default Layout;
