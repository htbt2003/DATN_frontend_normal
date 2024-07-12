import { useEffect, useState } from "react";
import AddressServices from '../../../services/AddressServices';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import swal from "sweetalert";
import Sidebar from "./Sidebar";

const Address = () => {
  const navigator = useNavigate();
  const user_id = useSelector((state) => state.auth.user?.id)
  const [addresses, setAddresses] = useState([]);
  const [reLoad, setReLoad] = useState();
  const fetchAPI = async () => {
    try {
      const result = await AddressServices.getAddressByUserId(user_id);
      setAddresses(result.addresses)
    }
    catch (error) {
      console.log(error)
    }
  }
  useEffect(function () {
    fetchAPI()
  }, [reLoad])
  console.log(addresses)
  const handleDelete = (id) => {
    swal({
      title: "Bạn muốn xóa địa chỉ này?",
      // text: "Nếu bạn xóa sản phẩm này, nó sẽ không thể khôi phục lại!",
      icon: "warning",
      buttons: {
        cancel: "Không",
        confirm: {
          text: "Có",
          value: true,
          visible: true,
          className: "btn-delete",
          closeModal: true
        }
      }
    }).then(async (result) => { // Thêm từ khóa async vào đây
      if (result) {
        try {
          const result = await AddressServices.remove(id);
          setReLoad(Date.now())
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
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
              <div className="col-md-8 col-lg-10">
                <div className="address p-5 mb-3">
                  <table className="table table-wishlist table-mobile">
                    <thead>
                      <tr style={{ backgroundColor: "white" }}>
                        <th className="pl-3">Họ tên</th>
                        <th className="pl-3">Địa chỉ</th>
                        <th className="pl-3">Số điện thoại</th>
                        <th className="pl-3"/>
                        <th className="pl-3"/>
                        <th className="pl-3"/>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        addresses && addresses.map((address, index)=>{
                          return(
                            <tr key={index}>
                            <td className="stock-col pl-3">
                              <p href="#">{address.name}</p>
                            </td>
                            <td className="product-col pl-3">
                              <h3 className="product-title">
                                <a href="#">{address.address}</a>
                              </h3>
                            </td>
                            <td className="stock-col pl-3">{address.phone}</td>
                            <td className="stock-col">
                              <span class="out-of-stock">
                                {
                                  address.status == 1 ?"Đại chỉ giao hàng & thanh toán mặc định":null
                                }
                                </span>
                            </td>
                            <td className="pl-3">
                              <Link to={"/tai-khoan/so-dia-chi/cap-nhat-dia-chi/" + address.id}>
                                Chỉnh sửa <i className="icon-edit" />
                              </Link>
                            </td>
                            <td className="remove-col" onClick={() => handleDelete(address.id)}>
                              <button className="btn-remove">
                                <i className="icon-close" />
                              </button>
                            </td>
                          </tr>
                          )
                        })
                      }
                     
                    </tbody>
                  </table>
                  <div className="btn-wrap text-end">
                    <Link to={"/tai-khoan/so-dia-chi/them-dia-chi-moi"} className="btn btn-primary btn-rounded btn-shadow">
                      <span>Thêm địa chỉ mới</span>
                      <i className="icon-long-arrow-right" />
                    </Link>
                  </div>

                </div>

                {/* <div className="row">
                  <div className="col-lg-6">
                    <div className="card card-dashboard">
                      <div className="card-body">
                        <h3 className="card-title">Billing Address</h3>
                        <p>
                          User Name
                          <br />
                          User Company
                          <br />
                          John str
                          <br />
                          New York, NY 10001
                          <br />
                          1-234-987-6543
                          <br />
                          yourmail@mail.com
                          <br />
                          <a href="#">
                            Edit <i className="icon-edit" />
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="card card-dashboard">
                      <div className="card-body">
                        <h3 className="card-title">Shipping Address</h3>
                        <p>
                          You have not set up this type of address yet.
                          <br />
                          <a href="#">
                            Edit <i className="icon-edit" />
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div> */}

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

export default Address;

