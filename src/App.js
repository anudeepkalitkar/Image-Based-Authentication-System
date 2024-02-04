import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import HomePage from "./HomePage/HomePage";
import SignupPage from "./SignupPage/SignupPage";
import SigninPage from "./SigninPage/SigninPage";
import { HashRouter } from 'react-router-dom';

function App() {
	return (
		<>
		<HashRouter>
			<Routes>
				{/* <Route path="/" element={<Layout PassedComponent={HomePage} />} /> */}
				<Route path="/" element={<Layout PassedComponent={SignupPage} />} />
			
			</Routes>

		</HashRouter>
		</>
	);
}

export default App;
