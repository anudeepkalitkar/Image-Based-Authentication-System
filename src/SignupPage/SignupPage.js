import React, { useState, useEffect  } from "react";
import axios from "axios";
import "./SignupPage.css";

const SignupPage = (props) => {
    const [randomNumbers, setRandomNumbers] = useState([]);

	const [formData, setFormData] = useState({  });

	const generateRandomNumbers = () => {
        const numbers = Array.from({ length: 100 }, (_, i) => i + 1);
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
		console.log(numbers);
        return numbers;
    };

    useEffect(() => {
        setRandomNumbers(generateRandomNumbers());
    }, []);

	const handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});

	};
	const handleSubmit = async (e) => {
		e.preventDefault(formData);
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

	
	return (
		<div className="center">
			<h3 className="heading">Sign up</h3>
			<div className="container">
				<form onSubmit={handleSubmit}>
					<div className="row">
						<div className="input-field col s12 m6">
							<input type="text" name="Fname" id="Fname" required onChange={handleChange}/>
							<label htmlFor="Fname" className="black-text">
								First Name
							</label>
							<span id="_Fname" className="red-text"></span>
						</div>
						<div className="input-field col s12 m6">
							<input type="text" name="Lname" id="Lname" required  onChange={handleChange}/>

							<label htmlFor="Lname" className="black-text">
								Last Name
							</label>
							<span id="_Lname" className="red-text"></span>
						</div>

						<div className="input-field col s12 m12">
							<input type="text" name="Uname" id="Uname" required  onChange={handleChange}/>
							<label htmlFor="Uname" className="black-text">
								UserName
							</label>
							<span id="_Uname" className="red-text"></span>
						</div>
						<div className="input-field  col s12 m10">
							<input type="email" name="email" id="Email" required  onChange={handleChange}/>
							<label htmlFor="Email" className="black-text">
								Email
							</label>
							<span id="_Email" className="red-text"></span>
						</div>

						<div className="input-field  col s12 m2">
							<a id="email_verify_btn" className="waves-effect waves-light btn pulse">
								verify
							</a>
						</div>
						<div className="input-field  col s12 m12">
							<input type="text" name="phno" id="phno"  onChange={handleChange}/>
							<label htmlFor="phno" className="black-text">
								Phone Number(Optional)
							</label>
						</div>
					</div>

					<div id="setupPassword" className="card-panel">
						<p className="red-text center">
							Select Icons in a sequence, which will be your password
						</p>
					</div>

					<div className="input-field">
						<input type="password" name="password" id="password" readOnly required  onChange={handleChange}/>
						<label htmlFor="password" id="password_label" className="black-text">
							Password
						</label>
						<span id="_password" className="red-text"></span>
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
							<a className="btn waves-effect waves-light red">
								Clear Form
								<i className="material-icons right">clear_all</i>
							</a>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignupPage;
