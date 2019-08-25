/*!

=========================================================
* Black Dashboard React v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
    Button,
    Card,

    CardBody,
    CardFooter,

    FormGroup,
    Form,
    Input,
    Row,
    Col
} from "reactstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getUserInfo,updateUser} from "../../src/store/actions/authActions";
import classnames from "classnames";
import moment from "moment";
import {Spinner} from "react-bootstrap";

class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fadeIn: true,
            name: "",
            email: "",
            imageProfile: "",
            birthday: moment(),
            errors: {},
            gender: "",
            poids: '',
            genderValue: "",
            check:false

        };

        this.onChange = this.onChange.bind(this);
    }

    onChange = e => this.setState({[e.target.name]: e.target.value});

    onChangeName = e => this.setState({name: e.target.value});
    onChangePoids = e => this.setState({poids: e.target.value});
    onChangeBirthday = e => this.setState({birthday: e.target.value});


    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

        if (nextProps.userInfo) {
            const profile = nextProps.userInfo.userInfo.user;

            // If profile field doesnt exist, make empty string
            // profile.name = !isEmpty(profile.name) ? profile.name : "";

            console.log("profile", profile);
            // Set component fields state
            this.setState({
                name: profile.name,
                poids: profile.poids,
                birthday: profile.birthday,
                gender: profile.gender,
                imageProfile: profile.imageProfile
            });
        }

    }
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
        ).open();}
    toggleGender = (e) => {
        console.log("inside toggle");
        const checked = e.currentTarget.checked;
        const name = e.currentTarget.name;
        console.log("checked",checked);
        console.log("name",name);
        const newVal = name === "Female" && checked ? true : name === "Male" && checked ? false : null;
        console.log(newVal);
        this.setState(prevState => ({
            gender: newVal,
            genderValue: name
        }));
    };

    onSubmit = e => {
        e.preventDefault();
        console.log(this.state.imageProfile);
        // const {name, poids, imageProfile, genderValue, birthday} = this.state;
        const newUser = {
            name: this.state.name,
            gender: this.state.genderValue,
            birthday: this.state.birthday,
            poids: this.state.poids,
            imageProfile: this.state.imageProfile
        };

        console.log(newUser);

        this.props.updateUser(newUser, this.props.history);};

    componentDidMount() {

        this.props.getUserInfo();


    }

    render() {
        // const {name, poids, imageProfile, gender, birthday} = this.state;
        const {userInfo} = this.props.userInfo;
        console.log("gender ",this.state.gender);

        if(this.state.gender==='Male'){
            console.log("west el male");
            this.state.
                gender=false;
            console.log("gender west el if",this.state.gender)
        }
        else if (this.state.gender==='Female'){
            console.log("west el female");
            this.state.
                gender=true;

            console.log("gender west el if",this.state.gender)
        }
        if (userInfo === null) {
            return <Spinner/>;
        }
        console.log(userInfo);
        const {errors} = this.state;


        return (
            <>
                <div className="content">
                    <Row>
                        <Col md="8" >
                            <Card className="card-user">
                                <CardBody>
                                    <Form onSubmit={this.onSubmit} >
                                        {/*<CardText/>*/}
                                        <div className="author">
                                            <div className="block block-one"/>
                                            <div className="block block-two"/>
                                            <div className="block block-three"/>
                                            <div className="block block-four"/>

                                            <img
                                                alt="profileImg"
                                                className="avatar"
                                                src={this.state.imageProfile}
                                            />
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

                                        <Row >
                                            <Col className="px-md-5" md="8">
                                                <FormGroup>
                                                    <label>Name</label>
                                                    <Input
                                                        onChange={this.onChangeName}
                                                        value={this.state.name}
                                                        error={
                                                            errors.name}
                                                        id="name"
                                                        type="text"
                                                        className={classnames("", {
                                                            invalid: errors.name
                                                        })}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="px-md-5" md="8">
                                                <FormGroup>
                                                    <label>Weight</label>
                                                    <Input
                                                        onChange={this.onChangePoids}
                                                        value={this.state.poids}
                                                        error={
                                                            errors.poids}
                                                        id="name"
                                                        type="text"
                                                        className={classnames("", {
                                                            invalid: errors.poids
                                                        })}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="px-md-5" md="8">
                                                <FormGroup>
                                                    <label>Birthday</label>
                                                    <Input
                                                        onChange={this.onChangeBirthday}
                                                        value={this.state.birthday}
                                                        error={errors.birthday}
                                                        id="birthday"
                                                        type="date"
                                                        className={classnames("", {
                                                            invalid: errors.birthday
                                                        })}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="px-md-5" md="8">
                                                <FormGroup>
                                                    <label>
                                                        <Input type="checkbox" name="Female"
                                                               checked={this.state.gender === true}
                                                               onChange={this.toggleGender}
                                                               error={errors.gender}
                                                               className={classnames("", {
                                                                   invalid: errors.gender
                                                               })}
                                                        />
                                                        <span>Female</span>
                                                    </label>
                                                    &nbsp;
                                                    <br/>
                                                    <label>
                                                        <Input type="checkbox" name="Male"
                                                             //  defaultChecked={}
                                                               checked={this.state.gender === false}

                                                               onChange={this.toggleGender}
                                                               error={errors.gender}
                                                               className={classnames("", {
                                                                   invalid: errors.gender
                                                               })}
                                                        />
                                                        <span>Male</span>
                                                    </label>
                                                    <small className="red-text"
                                                           style={{color: "red"}}>{errors.gender}</small>

                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Button className="btn-fill" color="primary" id={"btn"} type="submit">
                                            Save
                                        </Button>
                                    </Form>
                                </CardBody>
                                <CardFooter>

                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

UserProfile.propTypes = {
    getUserInfo: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    userInfo: state.userInfo,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    {getUserInfo,updateUser}
)(UserProfile);
