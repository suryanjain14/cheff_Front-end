import React, {useState} from "react";
import Button from "@restart/ui/esm/Button";
import {Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import "../style/registerPage.css";
import {useHistory} from "react-router";
import {setUserSession} from "./comman";

const RegisterPage = (props) => {
    let isChef = false;

    // console.log("register value",props);

    const handleOnChange = (event) => {
        setRole(event.target.value);
        // console.log("now", event.target.value);
        // console.log("isChef",isChef);
        let charge = document.getElementById('charge');
        if (event.target.value === "Chef") {
            // console.log("Charge",charge);
            charge.style.display = "block"
        } else {
            charge.style.display = "none"
        }
    }
    const history = useHistory();

    // console.log("location data is here",props.location.state.currentLocation);
    // const location = props.location.state.currentLocation;
    const [name, setname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile_number, setMobileNumber] = useState("");
    const [role, setRole] = useState("");
    const [location, setLocation] = useState(props.location.state.currentLocation);
    const [charges, setCharges] = useState("");
    // const [token, setToken] = useState();

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        if (
            name.length !== 0 &&
            email.length !== 0 &&
            password.length !== 0 &&
            mobile_number.length !== 0 &&
            role.length !== 0 //&&
            // location.length !== 0
        ) {
            console.log("no error on submit");
            if (role === "Chef") {
                localStorage.setItem("tempName", name);
                localStorage.setItem("tempemail", email);
                localStorage.setItem("tempmno", mobile_number);
                localStorage.setItem("tempp", password);
                localStorage.setItem("tempLoc", location);
                localStorage.setItem("tempCharges", charges);
                history.push("/selectDishes")
                return
            }
            const tokens = await register({
                name,
                email,
                password,
                mobile_number,
                role,
                location,
                charges
            });

            // console.log("now here is result again", tokens);
            if (tokens.status === "success" && tokens.data.role === "Chef") {
                setUserSession(tokens.data.access_token, tokens.data);
                history.push("/selectDishes");
            } else if (tokens.status === "success" && tokens.data.role === "Customer") {
                localStorage.setItem('access_token', tokens?.data?.access_token)
                localStorage.setItem('name', tokens?.data?.name);
                localStorage.setItem('id', tokens?.data?.id);
                setUserSession(tokens.data.access_token, tokens.data);
                history.push("/");
            } else {
                alert("Something went wrong please try again later");
            }
        } else {
            console.log("no successfull");
        }
    };

    const register = async (credential) => {
        return fetch(`${process.env.REACT_APP_EC2_HOST}/signUp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credential),
        }).then((data) => data.json());
    };

    return (
        <div className="register">
            <div id="login" className="registerPage container">
                <h2 className="regis">Register</h2>
                <Form onSubmit={handleSubmitForm}>
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicName"
                        className="form"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Enter FullName"
                            className="input"
                            onChange={(e) => setname(e.target.value)}
                            value={name}
                        />
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="formBasicEmail"
                        className="form"
                    >
                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            className="input"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                        className="form"
                    >
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            className="input"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="formBasicNumber"
                        className="form"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Enter Mobile Number"
                            className="input"
                            onChange={(e) => {
                                setMobileNumber(e.target.value);
                                console.log("oh", e.target.value);
                            }}
                            value={mobile_number}
                        />
                    </Form.Group>

                    <Form.Select
                        aria-label="Default select example"
                        className="forms"
                        onChange={handleOnChange}
                        // onChange={(e) => {
                        //   if(e.target.value === 'Chef')
                        //   {
                        //     this.handleChange(true);
                        //   }
                        //   else
                        //   {
                        //     this.handleChange(false);
                        //   }
                        //   setRole(e.target.value);
                        //   console.log("now", e.target.value);
                        //   console.log("isChef",isChef);
                        // }}
                        value={role}
                    >
                        <option>Select Role</option>
                        <option value="Chef">Chef</option>
                        <option value="Customer">Customer</option>
                    </Form.Select>

                    <Form.Group
                        className="mb-3"
                        controlId="formBasicNumber"
                        className="form"
                        style={{display: "none"}}
                        id="charge"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Enter Your Charges"
                            className="input"
                            onChange={(e) => {
                                setCharges(e.target.value);
                                console.log("Charge", e.target.value);
                            }}
                            value={charges}
                        />
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="formBasicLocation"
                        className="form"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Enter Location"
                            className="input"
                            onChange={(e) => setLocation(e.target.value)}
                            value={location}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="btn">
                        Register
                    </Button>
                    <Link to="/login">
                        <p className="checkAccount" style={{textDecoration: "none"}}>
                            Alredy have an account? <span>Login</span>
                        </p>
                    </Link>
                </Form>
            </div>
        </div>
    );
};

export default RegisterPage;
