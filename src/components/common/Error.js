import React, { Component } from "react";

class Error extends Component {
  render() {
    return (
      <section className="medium-padding120">
        <div className="container">
          <div className="row">
            <div className="col col-xl-6 m-auto col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="page-404-content">
                {/*<img src="../..//img/404.png" alt="photo" />*/}
                <div className="crumina-module crumina-heading align-center">
                  <h2 className="h1 heading-title">
                    A <span className="c-primary">wild ghost</span> appears!
                    Sadly, not what you were looking for...
                  </h2>
                  <p className="heading-text">
                    Sorry! The page you were looking for has been moved or
                    doesn’t exist. If you like, you can return to our homepage,
                    or if the problem persists, send us an email to:{" "}
                    {/*<a href="#">support@iderspace.com</a>*/}
                  </p>
                </div>
                <a href="/" className="btn-flat waves-effect">
                  <i className="material-icons left"></i> Back to home
                </a>


              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Error;
