import React from "react";

const Home = () => {
  return (
        <div id="wrap">
          <div className="main">
            <h1>Let's read a book!</h1>
            <p className="introduction">
              This website is for keeping your own reading records.
            </p>
            <div className="btn">
              <a href="/register" className="btn-c">
                Create Account
              </a>
            </div>

            <div className="btn">
              <a href="/guest-login" className="btn-c">
                Guest user
              </a>
            </div>
          </div>
        </div>
  );
};

export default Home;
