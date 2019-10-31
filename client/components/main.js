import React,{useState} from 'react'
import planetBackground from './threejs/planetBackground'
import { Login, Signup } from './auth-form';

const Main = () => {
  let [login, setLogin] = useState(false);
  let [signup, setSignUp] = useState(false);

  return (
    <div className="bg-image">
      <div className="header-div">
        <p className="header-text">
          Galacticode
        </p>
      </div>
      {/* {planetBackground()} */}
      <div id="login-wrapper">
        {/* <img id="login-logo" src="/GALACTICODE-logo_blue.png" /> */}
        <div>
          {/* <p id="intro">
            Nova the alien is lost in space and needs your help! Explore new
            planets to unlock JavaScript challenges, earning fuel to travel to
            new planets and help Nova get home.
          </p> */}
          <div id="login-buttons">
            {/* <a href="/auth/google">
              <button className="btn btn-login">
                Login with Google
              </button>
            </a> */}
              <button className="btn btn-login" onClick={()=>{setLogin(true); setSignUp(false)}}>
                Login Here
              </button>
              <button className="btn btn-login" onClick={()=>{setSignUp(true); setLogin(false)}}>Register Here</button>
          </div>
          <div className="login-form">
            {login && <Login />}
            {signup && <Signup />}
          </div>
        </div>
      </div>
      <div className="div-text">
        <p className="home-text">Nova the alien is lost in space and needs your help! Explore new
            planets to unlock JavaScript challenges, earning fuel to travel to
            new planets and help Nova get home.</p>
      </div>
    </div>
  )
}

export default Main
