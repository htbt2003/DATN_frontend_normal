import React from 'react';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserServices from '../../services/UserServices';
import { useDispatch } from "react-redux";
import swal from 'sweetalert';
import { setAuth } from '../../redux/authSlice';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin, useGoogleLogin , useGoogleOneTapLogin  } from '@react-oauth/google';
// import { FaFacebook } from 'react-icons/fa';
// import { jwtDecode }  from 'jwt-decode';
import axios from 'axios';

const Login = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  //login-------------------------------
  function doLogin(event) {
    event.preventDefault();
    const user = {
      email: email,
      password: password
    }
    if (!email) {
      setErrorMessage('Vui lòng nhập email để đăng nhập');
    }
    else if (!password) {
      setErrorMessage('Vui lòng nhập mật khẩu để đăng nhập');
    }
    else {
      UserServices.login(user)
        .then(function (result) {
          if (result.status === true) {
            dispatch(setAuth(result))
            swal("Success", result.message, "success");
            navigator("/", { replace: true });
          }
          else {
            swal("Warning", result.message, "warning");
          }
        });
    }
  }
  //login with facebook--------------------------------------
  const handleFacebookLogin = async () => {
    try {
      const result = await UserServices.loginWithFacebook()
      window.location.href = result.redirect_url;
      // dispatch(setAuth(result))
      // swal("Success", result.message, "success");
      // navigator("/", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };
  ///  -----------------
  const responseFacebook = async (response) => {
    try {
      const result = await UserServices.login_facebook(response)
      dispatch(setAuth(result))
      swal("Success", result.message, "success");
      navigator("/", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };
  ///  login với google-----------------
  const responseGoogle = async (response) => {
    try {
      const result = await UserServices.login_google(response)
      dispatch(setAuth(result))
      swal("Success", result.message, "success");
      navigator("/", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };
  const loginGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      const result = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",{
          headers:{
            Authorization: `Bearer ${response.access_token}`,
          },
        }
      );
      responseGoogle(result.data);
    }
  });
  return (
    <main className="main">
      <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Pages</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Login
            </li>
          </ol>
        </div>
        {/* End .container */}
      </nav>
      {/* End .breadcrumb-nav */}
      <div
        className="login-page bg-image pt-8 pb-8 pt-md-12 pb-md-12 pt-lg-17 pb-lg-17"
        style={{
          backgroundImage: 'url("assets/images/backgrounds/login-bg.jpg")'
        }}
      >
        <div className="container">
          <div className="form-box">
            <div className="form-tab">
              <ul className="nav nav-pills nav-fill" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="signin-tab-2"
                    data-toggle="tab"
                    href="#signin-2"
                    role="tab"
                    aria-controls="signin-2"
                    aria-selected="true"
                  >
                    Đăng nhập
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div
                  className="tab-pane fade show active"
                  id="signin-2"
                  role="tabpanel"
                  aria-labelledby="signin-tab-2"
                >
                  <form onSubmit={doLogin} >
                    <div className="form-group">
                      <label htmlFor="singin-email-2">
                        Email *
                      </label>
                      <input
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        className="form-control"
                        id="singin-email-2"
                        name="singin-email"
                        required
                        title="Vui lòng nhập địa chỉ email của bạn để đăng nhập"
                        onInvalid={() => setErrorMessage('Vui lòng nhập địa chỉ email của bạn để đăng nhập')}
                      />
                      <span style={{ color: 'red' }}>{errorMessage}</span>
                    </div>
                    {/* End .form-group */}
                    <div className="form-group">
                      <label htmlFor="singin-password-2">Mật khẩu *</label>
                      <input
                        type="password"
                        className="form-control"
                        id="singin-password-2"
                        name="singin-password"
                        required
                        title="Vui lòng nhập mật khẩu của bạn để đăng nhập"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        onInvalid={() => setErrorMessage('Vui lòng nhập mật khẩu của bạn để đăng nhập')}
                      />
                      <span style={{ color: 'red' }}>{errorMessage}</span>
                    </div>
                    {/* End .form-group */}
                    <div className="form-footer">
                      <button type="submit" className="btn btn-outline-primary-2">
                        <span>Đăng nhập</span>
                        <i className="icon-long-arrow-right" />
                      </button>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="signin-remember-2"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="signin-remember-2"
                        >
                          Ghi nhớ
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                      <a href="#" className="forgot-link">
                        Quên mật khẩu ?
                      </a>
                    </div>
                    {/* End .form-footer */}
                  </form>

                  <div className="form-choice">
                    <p className="text-center">Hoặc đăng nhập với</p>
                    <div className="row">
                      <div className="col-sm-6">
                          
                          <div onClick={() => loginGoogle()} className="btn btn-login btn-g">
                            <i className="icon-google" />
                            Đăng nhập với Google
                          </div>
                          {/* <GoogleLogin
                            onSuccess={responseGoogle}
                            // onFailure={responseGoogle}
                            // className="btn btn-login btn-g"
                            // cookiePolicy={'single_host_origin'}
                            // icon={<i className="icon-google" />}
                          /> */}
                      </div>
                      {/* End .col-6 */}

                      <div className="col-sm-6" >
                        <FacebookLogin
                          appId="731967528841039"
                          autoLoad={false}
                          fields="name,email,picture"
                          callback={responseFacebook}
                          icon={<i className="icon-facebook-f" />}
                          textButton="Đăng nhập với Facebook"
                          cssClass="btn btn-login btn-f"
                        />
                        {/* <div className="btn btn-login btn-f" onClick={handleFacebookLogin}>
                        <i className="icon-facebook-f" onClick={handleFacebookLogin}/>
                        Đăng nhập với Facebook
                      </div> */}
                      </div>
                      {/* End .col-6 */}
                    </div>
                    {/* End .row */}
                  </div>
                  {/* End .form-choice */}
                </div>
                {/* .End .tab-pane */}
              </div>
              {/* End .tab-content */}
            </div>
            {/* End .form-tab */}
          </div>
          {/* End .form-box */}
        </div>
        {/* End .container */}
      </div>
      {/* End .login-page section-bg */}
    </main>
  );
}

export default Login;
