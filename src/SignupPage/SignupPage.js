import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SignupPage.css";

const SignupPage = (props) => {
	const [formData, setFormData] = useState({ password: "" });
	const [randNumbers, SetRandNumbers] = useState([]);
	const generateRandomNumbers = () => {
		const numbers = Array.from({ length: 100 }, (_, i) => i + 1);
		for (let i = numbers.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[numbers[i], numbers[j]] = [numbers[j], numbers[i]];
		}
		return numbers;
	};

	const generateImageGrid = () => {
		const source = "http://localhost:3000/ibas-icongp/Images/icons/";
		let table = [];
		const gridSize = 10;
		let count = 0;
		for (let i = 0; i < gridSize; i++) {
			let row = [];
			for (let k = 0; k < gridSize; k++) {
				row.push(
					<td key={k}>
						<img
							id={"image-" + randNumbers[count]}
							className="responsive-img"
							src={`${source}${randNumbers[count]}.jpg`}
							alt={`Icon ${count}`}
							onClick={handleClickImage}
						/>
					</td>
				);
				count += 1;
			}
			table.push(<tr key={i}>{row}</tr>);
		}

		return (
			<table className="centered">
				<tbody>{table}</tbody>
			</table>
		);
	};

	const handleClickImage = (event) => {
		event.preventDefault();
		let labelClass = document.getElementById("password_label");
		if (!labelClass.className.includes("active")) {
			labelClass.className = labelClass.className + " active";
		}

		setFormData({
			...formData,
			["password"]: formData["password"] + ";" + event.target.id,
		});
	};
	const handleChange = (event) => {
		event.preventDefault();

		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const handleClearPassword = (event) => {
		event.preventDefault();
		let labelClass = document.getElementById("password_label");
		if (labelClass.className.includes("active")) {
			labelClass.className = "black-text";
		}
		setFormData({
			...formData,
			["password"]: "",
		});
	};
	const handleClearForm = (event) => {
		event.preventDefault();
		window.location.reload();
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData);
		let email = {
			method: "post",
			contentType: "application/json",
			url: "./",
			data: formData,
		};
		await axios(email).then(
			(res) => {
				if (res.data.success) {
					alert("Thanks for your Email. I will respond as soon as possible!");
				}
			},
			(error) => console.log(error)
		);
	};
	useEffect(() => {
		SetRandNumbers(generateRandomNumbers());
	}, []);

	return (
		<div className="row">
			<div className="col s6 application">
				<div className="center">
					<h3 className="heading">Sign up</h3>
					<div className="container">
						<form onSubmit={handleSubmit}>
							<div className="row">
								<div className="input-field col s12 m6">
									<input
										type="text"
										name="Fname"
										id="Fname"
										required
										onChange={handleChange}
									/>
									<label htmlFor="Fname" className="black-text">
										First Name
									</label>
									<span id="_Fname" className="red-text"></span>
								</div>
								<div className="input-field col s12 m6">
									<input
										type="text"
										name="Lname"
										id="Lname"
										required
										onChange={handleChange}
									/>

									<label htmlFor="Lname" className="black-text">
										Last Name
									</label>
									<span id="_Lname" className="red-text"></span>
								</div>

								<div className="input-field col s12 m12">
									<input
										type="text"
										name="Uname"
										id="Uname"
										required
										onChange={handleChange}
									/>
									<label htmlFor="Uname" className="black-text">
										UserName
									</label>
									<span id="_Uname" className="red-text"></span>
								</div>
								<div className="input-field  col s12 m10">
									<input
										type="email"
										name="email"
										id="Email"
										required
										onChange={handleChange}
									/>
									<label htmlFor="Email" className="black-text">
										Email
									</label>
									<span id="_Email" className="red-text"></span>
								</div>

								<div className="input-field  col s12 m2">
									<a
										id="email_verify_btn"
										className="waves-effect waves-light btn">
										verify
									</a>
								</div>
								<div className="input-field  col s12 m12">
									<input
										type="text"
										name="phno"
										id="phno"
										onChange={handleChange}
									/>
									<label htmlFor="phno" className="black-text">
										Phone Number (Optional)
									</label>
								</div>
							</div>
							<div className="row">
								<div className="input-field col s12 m10">
									<input
										type="password"
										name="password"
										id="password"
										readOnly
										required
										value={formData["password"]}
									/>
									<label
										htmlFor="password"
										id="password_label"
										className="black-text">
										Choose your password Images form right
									</label>
									<span id="_password" className="red-text"></span>
								</div>
								<div className="input-field  col s12 m2">
									<a
										className="waves-effect waves-light btn "
										onClick={handleClearPassword}>
										clear
									</a>
								</div>
							</div>
							<div className="row">
								<div className="col s6">
									<button
										className="btn waves-effect waves-light green "
										type="submit"
										id="submit"
										name="submit">
										Submit
										<i className="material-icons right">send</i>
									</button>
								</div>
								<div className="col s6">
									<a
										className="btn waves-effect waves-light red"
										onClick={handleClearForm}>
										Clear Form
										<i className="material-icons right">clear_all</i>
									</a>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div className="col s6 lockImage ">
				<div className=" center">
					<h4 className="orange-text heading">
						Select images in a sequence, which will be your password
					</h4>
					<div className=" container">{generateImageGrid()}</div>
				</div>
			</div>
		</div>
	);
};
export default SignupPage;
