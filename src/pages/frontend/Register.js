import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserServices from '../../services/UserServices';
import swal from "sweetalert";

const Register = () => {
  const navigator = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState();
  const [image, setImage] = useState();
  document.title = "Đăng ký";
  function UserStore(event) {
    event.preventDefault();//không load lại trang
    // const image = document.querySelector("#image");
    var user = {
      name: name,
      email: email,
      phone: phone,
      username: username,
      password: password,
      address: address,
      roles: "user",
      status: 1,
      gender: 1,
      image: image,
    };
    UserServices.register(user)
      .then(function (result) {
        if(result.status){
          swal("Thông báo", result.message, "success");
          navigator("/dang-nhap", { replace: true })  
        }
        else{
          swal("Cảnh báo", result.message, "warning");
        }
      });
  }
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  return (
    <main className="main">
      <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Trang chủ</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Đăng ký</a>
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
                    className="nav-link active"
                    id="register-tab-2"
                    data-toggle="tab"
                    href="#register-2"
                    role="tab"
                    aria-controls="register-2"
                    aria-selected="true"
                  >
                    Đăng ký
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div
                  className="tab-pane fade show active"
                  id="register-2"
                  role="tabpanel"
                  aria-labelledby="register-tab-2"
                >
                  <form onSubmit={UserStore}>
                    <div className="position-relative" style={{ width: '100px', height: '100px', marginLeft:'160px' }}>
                      <input
                      id='image'
                        type="file"
                        className="form-control d-none"
                        onChange={handleImageChange}
                      />
                      <label
                        htmlFor='image'
                        className="d-flex justify-content-center align-items-center w-100 h-100 border border-dashed border-secondary rounded cursor-pointer"
                        style={{ cursor: 'pointer' }}
                      >
                        {image ? (
                          <img
                            src={URL.createObjectURL(image)}
                            alt=""
                            className="w-100 h-100 rounded"
                            style={{ objectFit: 'cover' }}
                          />
                        ) : (
                          <div className="text-center bg-white rounded">
                            <svg
                              className="mx-auto"
                              width="48"
                              height="48"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="mt-2 d-block text-sm font-medium text-secondary">Tải lên</span>
                          </div>
                        )}
                      </label>
                    </div>
                    <div className="form-group">
                      <label htmlFor="register-email-2">
                        Họ tên *
                      </label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className="form-control"
                        id="register-email-2"
                        name="register-email"
                        required=""
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="register-email-2">
                        Email *
                      </label>
                      <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="form-control"
                        id="register-email-2"
                        name="register-email"
                        required=""
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="register-email-2">
                        Số điện thoại*
                      </label>
                      <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                        type="text"
                        className="form-control"
                        id="register-email-2"
                        name="register-email"
                        required=""
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="register-email-2">
                        Địa chỉ*
                      </label>
                      <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                        type="text"
                        className="form-control"
                        id="register-email-2"
                        name="register-email"
                        required=""
                      />
                    </div>
                    {/* End .form-group */}
                    <div className="form-group">
                      <label htmlFor="register-password-2">Password *</label>
                      <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        id="register-password-2"
                        name="register-password"
                        required=""
                      />
                    </div>
                    {/* End .form-group */}
                    <div className="form-footer">
                      <button type="submit" className="btn btn-outline-primary-2">
                        <span>Đăng ký</span>
                        <i className="icon-long-arrow-right" />
                      </button>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="register-policy-2"
                          required=""
                        />
                        {/* <label
                          className="custom-control-label"
                          htmlFor="register-policy-2"
                        >
                          I agree to the <a href="#">privacy policy</a> *
                        </label> */}
                      </div>
                      {/* End .custom-checkbox */}
                    </div>
                    {/* End .form-footer */}
                  </form>
                  <div className="form-choice">
                    <p className="text-center">Hoặc đăng ký với</p>
                    <div className="row">
                      <div className="col-sm-6">
                        <a href="#" className="btn btn-login btn-g">
                          <i className="icon-google" />
                           Google
                        </a>
                      </div>
                      {/* End .col-6 */}
                      <div className="col-sm-6">
                        <a href="#" className="btn btn-login  btn-f">
                          <i className="icon-facebook-f" />
                           Facebook
                        </a>
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

export default Register;