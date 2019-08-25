import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../store/actions/authActions";
import classnames from "classnames";
import {Label, Input, Button, Form} from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";


import moment from "moment";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderF: false,
      genderM: "",
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
      genderValue: "",
      poids: "",
      birthday: moment(),
      modal: false,
      gender: null,
      imageProfile: ""

    };

  }


  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/admin/Dashboard");
    }
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }


  toggleGender = (e) => {
    const checked = e.currentTarget.checked;

    const name = e.currentTarget.name;
    console.log(checked);
    console.log(name);
    const newVal = name === "Female" && checked ? true : name === "Male" && checked ? false : null;
    this.setState(prevState => ({
      gender: newVal,
      genderValue: name
    }));
  };
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };


  onChangeDate = e => {
    this.setState({ birthday: e.target.value });
    console.log(this.state.birthday);
  };



  saveImg =e=>{

    console.log("clickeeeeeeeeeeeeeed");
    window.cloudinary.createUploadWidget({
          cloudName: 'oscproject',
          uploadPreset: 'ml_default',
          folder:'ProfilePictures'}, (error, result) => {
          if (!error && result && result.event === "success") {
            console.log('Done! Here is the image info: ', result.info);
            this.setState(
                {
                  imageProfile:result.info.secure_url
                }
            );
          }
        }
    ).open();
  }
  onSubmit = e => {
    e.preventDefault();
    console.log(this.state.imageProfile);
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      gender: this.state.genderValue,
      birthday: this.state.birthday,
      poids: this.state.poids,
      imageProfile:this.state.imageProfile
    };

    console.log(newUser);

    this.props.registerUser(newUser, this.props.history);

  };




  render() {

    const { errors } = this.state;
    console.log(errors)
    console.log("imageProfile",this.state.imageProfile);
    return (

          <div className="card text-center" style={{marginLeft:"370px",width:"600px"}}>
            <div className="card-header">
              <div style={{paddingLeft:'0px'}}>
                <Link to="/" className="btn-flat waves-effect" >
                  <i className="material-icons left"></i>
                  Back
                </Link>
                <h4>
                  <b>Register</b> new account
                </h4>
                <p className="grey-text text-darken-1">
                  Already have an account? <Link to="/login">Log in</Link>
                </p>
              </div>
            </div>
            <div className="card-body">

              <Form  onSubmit={this.onSubmit} encType="multipart/form-data">
                <div  className="form-group">
                  <div>
                  {this.state.imageProfile === "" ?
                      <img alt="..."  className="icon-atom" src={require("../../assets/img/defaultimage.jpg")} />
                      :
                      <img
                      alt="profileImg"
                      className="avatar"
                      src={this.state.imageProfile}
                  />}
                    <Button style={{
                      position: 'absolute',
                      top: '20%',
                      left: '50%',
                      //    transform: 'translate(-50%, -50%)',
                      msTransform : 'translate(-50%, -50%)',
                      backgroundColor: "#555",
                      color: 'white',
                      fontSize: '12px',
                      padding: '12px 12px',
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: '55px',
                      hoverBackgroundColor: "black"
                    }}
                            type="button" className="cloudinary-button" onClick={this.saveImg} >
                      Upload files
                    </Button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <Input
                    onChange={this.onChange}
                    value={this.state.name}
                    error={
                      errors.name}
                    id="name"
                    type="text"
                    className={classnames("", {
                      invalid: errors.name
                    })}
                  />
                  <small className="red-text" style={{ color: "red" }}>{errors.name}</small>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                    className={classnames("", {
                      invalid: errors.email
                    })}
                  />
                  <small className="red-text" style={{ color: "red" }}>{errors.email}</small>
                </div>
                <div className="form-group">
                  <label htmlFor="poids">Poids</label>
                  <Input
                    onChange={this.onChange}
                    value={this.state.poids}
                    error={errors.poids}
                    id="poids"
                    type="number"
                    className={classnames("", {
                      invalid: errors.poids
                    })}
                  />
                  <small className="red-text" style={{ color: "red" }}>{errors.poids}</small>
                </div>
                <div className="form-group">
                  <label htmlFor="birthday">Date birth</label>
                  <Input
                    onChange={this.onChangeDate}
                    value={this.state.birthday}
                    error={errors.birthday}
                    id="birthday"
                    type="date"
                    className={classnames("", {
                      invalid: errors.birthday
                    })}
                  />
                  <small className="red-text" style={{ color: "red" }}>{errors.birthday}</small>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                    className={classnames("", {
                      invalid: errors.password
                    })}
                  />
                  <small className="red-text" style={{ color: "red" }}>{errors.password}</small>
                </div>
                <div className="form-group">
                  <label htmlFor="password2">Confirm Password</label>
                  <Input
                    onChange={this.onChange}
                    value={this.state.password2}
                    error={errors.password2}
                    id="password2"
                    type="password"
                    className={classnames("", {
                      invalid: errors.password2
                    })}
                  />
                  <small className="red-text" style={{ color: "red" }}>{errors.password2}</small>
                </div>

                <div className="form-group">
                  <div className="form-group">
                    <Label>
                      <Input type="checkbox" name="Female"
                             checked={this.state.gender === true}
                             onChange={this.toggleGender}
                             error={errors.gender}

                             className={classnames("", {
                               invalid: errors.gender
                             })}
                      />
                      <span>Female</span>
                    </Label>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <Label>
                      <Input type="checkbox" name="Male"
                             checked={this.state.gender === false}
                             onChange={this.toggleGender}
                             error={errors.gender}

                             className={classnames("", {
                               invalid: errors.gender
                             })}
                      />
                      <span>Male</span>
                    </Label>
                  </div>
                  <small className="red-text" style={{ color: "red" }}>{errors.gender}</small>
                </div>

                <button variant="primary" className="btn btn-primary btn-round"
                        style={{
                          width: "150px",
                          borderRadius: "3px",
                          letterSpacing: "1.5px",
                          marginTop: "1rem"
                        }}
                        type="submit"
                >
                  Sign up
                </button>


              </Form>
            </div>
          </div>



    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(Register);