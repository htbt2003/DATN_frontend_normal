import { useEffect, useState } from "react";
import UserServices from '../../../services/UserServices';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import swal from "sweetalert";
import Sidebar from "./Sidebar";

const Infor = () => {
  const navigator = useNavigate();
  const user_id = useSelector((state) => state.auth.user?.id)
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState();

  function UserEdit(event) {
    event.preventDefault();//không load lại trang
    const image = document.querySelector("#image");
    var user = new FormData();
    user.append("name", name)
    user.append("email", email)
    user.append("phone", phone)
    user.append("username", username)
    user.append("address", address)
    user.append("gender", gender)
    if (image.files.length === 0) {
      user.append("image", "")
    }
    else {
      user.append("image", image.files[0])
    }
    UserServices.updateAccount(user, id)
      .then(function (result) {
        swal("Success", result.message, "success");
        navigator("/", { replace: true })
      });
  }
  const fetchAPI = async () => {
    try {
      const result = await UserServices.me();
      const tmp = result
      setName(tmp.name);
      setEmail(tmp.email);
      setPhone(tmp.phone);
      setUsername(tmp.username);
      setAddress(tmp.address);
      setGender(tmp.gender)
      setId(tmp.id)
    }
    catch (error) {
      console.log(error)
    }
  }
  useEffect(function () {
    fetchAPI()
  }, [])
  return (
    <main className="main" style={{ backgroundColor: "#f9f9f9" }}>
      {/* <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">
            My Account<span>Shop</span>
          </h1>
        </div>
      </div> */}
      {/* End .page-header */}
      <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Shop</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              My Account
            </li>
          </ol>
        </div>
        {/* End .container */}
      </nav>
      {/* End .breadcrumb-nav */}
      <div className="page-content">
        <div className="dashboard">
          <div className="container">
            <div className="row">
              <Sidebar />
              {/* End .col-lg-3 */}
              <div className="col-md-8 col-lg-10 infor" style={{ backgroundColor: "#ffff", color:"#0000" }}>
                <section className="content-body p-5">
                  <form method="post" onSubmit={UserEdit}>
                    {/* <p className="text-center">Already have an account? <a href="#">Log in instead!</a></p> */}
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label>
                            <strong>Tên đăng nhập(*)</strong>
                          </label>
                          <input
                            value={username} onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            name="username"
                            className="form-control bg-white"
                            placeholder="Tên đăng nhập"
                          />
                        </div>
                        <div className="mb-3">
                          <label>
                            <strong>Email(*)</strong>
                          </label>
                          <input
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            name="email"
                            className="form-control bg-white"
                            placeholder="Email"
                          />
                        </div>
                        {/* <div className="mb-3">
              <label>
                <strong>Xác nhận email(*)</strong>
              </label>
              <input
                type="text"
                name="re_email"
                className="form-control"
                placeholder="Xác nhận email"
              />
            </div> */}
                        <div className="mb-3">
                          <label>
                            <strong>Điện thoại(*)</strong>
                          </label>
                          <input
                            value={phone} onChange={(e) => setPhone(e.target.value)}
                            type="text"
                            name="phone"
                            className="form-control bg-white"
                            placeholder="Điện thoại"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label>
                            <strong>Họ tên (*)</strong>
                          </label>
                          <input
                            value={name} onChange={(e) => setName(e.target.value)}
                            type="text"
                            name="name"
                            className="form-control bg-white"
                            placeholder="Họ tên"
                          />
                        </div>
                        <div className="mb-3">
                          <label>
                            <strong>Giới tính</strong>
                          </label>
                          <select name="gender" id="gender" className="form-control bg-white" value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option>Chọn giới tinh</option>
                            <option value={1}>Nam</option>
                            <option value={0}>Nữ</option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <label>
                            <strong>Địa chỉ</strong>
                          </label>
                          <input
                            value={address} onChange={(e) => setAddress(e.target.value)}
                            type="text"
                            name="address"
                            className="form-control bg-white"
                            placeholder="Địa chỉ"
                          />
                        </div>
                        <div className="mb-3">
                          <label>
                            <strong>Hình đại diện</strong>
                          </label>
                          <input type="file" id="image" className="form-control bg-white" />
                        </div>
                      </div>
                    </div>
                    
                    <button className="btn btn-primary btn-rounded btn-shadow" type="submit">
                      <i className="icon-long-arrow-right" /> Lưu [Cập nhật]
                    </button>

                  </form>
                </section>

              </div>

            </div>
            {/* End .row */}
          </div>
          {/* End .container */}
        </div>
        {/* End .dashboard */}
      </div>
      {/* End .page-content */}
    </main>


  );
}

export default Infor;

