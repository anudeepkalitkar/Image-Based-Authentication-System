import React from "react";
import "./HomePage.css";
import { ProjectInfo } from "../StaticInformation/ProjectInfo";

const HomePage = (props) => {
	const handleLoginButton = (event) =>{
		event.preventDefault();
		console.log(event.target);
	}
	const handleSigninButton = (event) =>{
		event.preventDefault();
		console.log(event.target);
	}
	return (
		<div className="center">
			<h3 className="project-title ">{ProjectInfo.title}</h3>
			<div className="container">
				<h6 className="intro-desc">{ProjectInfo.intro}</h6>
				<div className="row">
					<div className="col s6">
						<button className="waves-effect waves-light btn  green " onClick={handleLoginButton}> Login </button>
					</div>
					<div className="col s6">
						<button className="waves-effect waves-light btn blue " onClick={handleSigninButton}>Sign up </button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default HomePage;
