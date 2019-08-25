import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../store/actions/authActions";
import classnames from "classnames";
import { Input, Button, Label } from "reactstrap";
import axios from "axios/index";

class UpdateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fadeIn: true,
      name: "",
      email: "",
      imageProfile: "",
      age: null,
      errors: {},
      gender: "",
      genderValue: "",

    };
  //  this.toggle = this.toggle.bind(this);
     this.onChange = this.onChange.bind(this);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
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
  handleNameChange(e) {
    this.setState({
      name: e.target.value
    });
    console.log(this.state.name);

  }

  handleAgeChange(e) {
    this.setState({
      age: e.target.value
    });
    console.log(this.state.age);

  }

  handleGenderChange(e) {
    this.setState({
      gender: e.target.value
    });
    console.log(this.state.gender);

  }

  handleImageChange(evt) {
    this.setState({ imageProfile: evt.target.files[0] });
    console.log(this.state.imageProfile);
  }




  componentDidMount() {
    const { user } = this.props.auth;
    const { errors } = this.state;


    this.setState({
     // name: user.name,
      //age: user.age,
      imageProfile: user.imageProfile,
     // email: user.email
    });

    console.log(this.state.imageProfile);


  }
  toggle() {
    this.setState({
      fadeIn: !this.state.fadeIn
    });
  }

  onChange(e) {
    e.preventDefault();
    console.log("hellll");
    const data = new FormData();
    const file = this.state.imageProfile;
    data.append("imageProfile", file);
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }
    const url = 'http://localhost:3001/users/update';
    axios
      .post(url, data, config)
      .then((response) =>{
        console.log("hello from response");
        console.log(response);
       //alert('aaaaaaaaaaaaaaaaaaaaaaaaaaa');
      })
      .catch(
        function(error) {
        console.log(error);
      });

    // this.props.history.push("/dashboardHEALTH");
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="main-panel" id="main-panel">

        <div className="content">
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">
                  <h5 className="title">Edit Profile User</h5>
                </div>
                <div className="card-body">
                  <div className="card-body">
                    <form  onSubmit={this.onChange}>

                        <div className="form-group">
                          <div className="btn btn-primary btn-sm float-left">
                            <span>Choose file</span>
                            <Input  type="file" name="imageProfile" onChange={this.handleImageChange}
                                    required className="form-control" />
                          </div>

                        </div>




                      <Button color="primary" id={"btn"} type="submit" >update</Button>


                    </form>
                  </div>
                </div>
              </div>


            </div>
            {/*<div className="col-md-4">*/}
            {/*  <div className="card card-user">*/}
            {/*    <div className="image">*/}
            {/*      /!*<img src="../../../public/assets/img/bg5.jpg" alt="..."/>*!/*/}
            {/*    </div>*/}
            {/*    /!*<div className="card-body">*!/*/}
            {/*    /!*  <div className="author">*!/*/}
            {/*    /!*    <a href="#">*!/*/}
            {/*    /!*      <img className="avatar border-gray" src={this.state.imageProfile} alt="imageProfile"/>*!/*/}
            {/*    /!*      <h5 className="title">{this.state.name}</h5>*!/*/}
            {/*    /!*    </a>*!/*/}
            {/*    /!*    <p className="description">*!/*/}
            {/*    /!*      {this.state.age}*!/*/}
            {/*    /!*    </p>*!/*/}
            {/*    /!*  </div>*!/*/}
            {/*    /!*  /!*<p className="description text-center">*!/*!/*/}
            {/*    /!*  /!*  "Lamborghini Mercy <br/>*!/*!/*/}
            {/*    /!*  /!*  Your chick she so thirsty <br/>*!/*!/*/}
            {/*    /!*  /!*  I'm in that two seat Lambo"*!/*!/*/}
            {/*    /!*  /!*</p>*!/*!/*/}
            {/*    /!*</div>*!/*/}
            {/*    /!*<hr/>*!/*/}
            {/*    /!*<div className="button-container">*!/*/}
            {/*    /!*  <button href="#" className="btn btn-neutral btn-icon btn-round btn-lg">*!/*/}
            {/*    /!*    <i className="fab fa-facebook-f"></i>*!/*/}
            {/*    /!*  </button>*!/*/}
            {/*    /!*  <button href="#" className="btn btn-neutral btn-icon btn-round btn-lg">*!/*/}
            {/*    /!*    <i className="fab fa-twitter"></i>*!/*/}
            {/*    /!*  </button>*!/*/}
            {/*    /!*  <button href="#" className="btn btn-neutral btn-icon btn-round btn-lg">*!/*/}
            {/*    /!*    <i className="fab fa-google-plus-g"></i>*!/*/}
            {/*    /!*  </button>*!/*/}
            {/*    /!*</div>*!/*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>


        </div>


      </div>


  );
  }
  }

  UpdateUser.propTypes = {
    // registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  export default connect(
  mapStateToProps,
  {registerUser}
  )(UpdateUser);