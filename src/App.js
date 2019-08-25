import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import Root from "./components/root";
import "../src/assets/scss/black-dashboard-react.scss";
import "../src/assets/css/nucleo-icons.css";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./store/actions/authActions";
import { Provider} from "react-redux";
import store from "./store/store";
import {BrowserRouter as Router} from "react-router-dom";


// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
// Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // Redirect to login
        window.location.href = "./login";
    }
}


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <React.Fragment>
                        <Root/>

                    </React.Fragment>
                </Router>
            </Provider>

        );
    }
}
export default App;