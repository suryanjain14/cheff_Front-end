import React, {useState} from 'react'
import Button from '@restart/ui/esm/Button';
import {Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import {useHistory} from "react-router";

const SignInPage = (props) => {
    // const [token, setToken] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();


    const handleSubmitForm = async (e) => {
        e.preventDefault();
        if (
            email.length !== 0 &&
            password.length !== 0
        ) {
            console.log("no error on submit");
            const tokens = await register({
                email,
                password,
            });
            // console.log("id here",tokens);
            if (tokens.status === "success" && tokens.data.role === "Chef") {
                localStorage.setItem('access_token', tokens?.data?.access_token)
                localStorage.setItem('name', tokens?.data?.name);
                localStorage.setItem('id', tokens?.data?.id);
                localStorage.setItem('role', tokens?.data?.role);
                let okToken = localStorage.getItem('access_token');
                // console.log("final test",okToken);
                let result = localStorage.getItem('name');
                // console.log("final data is",result);
                history.push("/dashBoard");
                window.location.reload()
            } else if (tokens.status === "success" && tokens.data.role === "Customer") {
                localStorage.setItem('access_token', tokens?.data?.access_token)
                localStorage.setItem('name', tokens?.data?.name);
                localStorage.setItem('id', tokens?.data?.id);
                localStorage.setItem('role', tokens?.data?.role);
                let okToken = localStorage.getItem('access_token');
                // console.log("final test",okToken);
                let result = localStorage.getItem('name');
                // console.log("final data is",result);
                history.push("/userDashBoard");
                window.location.reload()
            } else {
                alert(tokens.message);
            }
        } else {
            console.log("no successfull");
        }
    };

    const register = async (credential) => {
        return fetch(`${process.env.REACT_APP_EC2_HOST}/signIn`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credential),
        }).then((data) => data.json());
    };

    return (
        <div className="register" id="signin">
            <div id="login" className="registerPage container">
                <h2 className="regis">Login</h2>
                <Form onSubmit={handleSubmitForm}>

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


                    <Button variant="primary" type="submit" className="btn">
                        Login
                    </Button>
                    <Link to={{
                        pathname: "signUp", state: {currentLocation: props?.location?.state?.currentLocation}
                    }}>
                        <p className="checkAccount">Don't have an account? <span>Register</span></p>
                    </Link>
                </Form>
            </div>
        </div>
    );

}

export default SignInPage
