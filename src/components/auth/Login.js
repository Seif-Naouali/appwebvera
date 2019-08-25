import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Input, Button, Form, Label} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loginUser} from "../../store/actions/authActions";
import classnames from "classnames";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            checkedValue: null,
            dossierValide: null,
            Avis: "",
            gender: null,
            type: null,
            typeValue: null,
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/admin/Dashboard");
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/admin/Dashboard"); // push user to dashboard when they login
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }


    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    };


    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    };

    render() {
        const {errors} = this.state;
        console.log(errors);
        return (

            <div className="card text-center" style={{marginLeft: "370px", marginTop: "150px", width: "600px"}}>
                <div className="card-header">
                    <Link to="/" className="btn-flat waves-effect">
                        <i className="material-icons left"></i>
                        Back
                    </Link>
                    <h4>
                        <b>Connect</b> your account
                    </h4>

                </div>
                <div className="card-body">
                    <Form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
                                id="email"
                                type="email"
                                className={classnames("", {
                                    invalid: errors.email || errors.emailnotfound
                                })}
                            />

                            <span className="red-text" style={{color: "red"}}>
                                      {errors.email}
                                {errors.emailnotfound}
                                    </span>
                        </div>
                        <div className="form-group">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                onChange={this.onChange}
                                value={this.state.password}
                                error={errors.password}
                                id="password"
                                type="password"
                                className={classnames("", {
                                    invalid: errors.password || errors.passwordincorrect
                                })}
                            />
                            <span className="red-text" style={{color: "red"}}>
                                      {errors.password}
                                {errors.passwordincorrect}
                                    </span>


                        </div>
                        <div className="form-group" style={{paddingLeft: "11.250px"}}>
                            <Button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                type="submit"
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                                Login
                            </Button>
                        </div>
                    </Form>
                    <p className="grey-text text-darken-1">
                        You are not registred? <Link to="/register">Register</Link>
                    </p>
                </div>

            </div>


        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    {loginUser}
)(Login);