import { useEffect, useState } from "react";
import OrderServices from '../../../services/OrderServices';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import swal from "sweetalert";
import Sidebar from "./Sidebar";
import OrderDetailItemt from "./OrderDetailItemt";

const Order = () => {
  const user_id = useSelector((state) => state.auth.user.id)
  const [orders, setOrders] = useState([]);
  const fetchAPI = async () => {
    try {
      const result = await OrderServices.getOrderByUserId(user_id);
      setOrders(result.orders)
    }
    catch (error) {
      console.log(error)
    }
  }
  useEffect(function () {
    fetchAPI()
  }, [])
  console.log(user_id)
  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">
            My Account<span>Shop</span>
          </h1>
        </div>
        {/* End .container */}
      </div>
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
                {
                  orders && orders.map((order, index) => {
                    var status=""
                    if(order.status == 0){
                      status = "Chờ xác nhận"
                    }
                    else if(order.status == 1){
                      status = "Đang lấy hàng"
                    }
                    else if(order.status == 1){
                      status = "Đang giao hàng"
                    }
                    else{
                      status = "Đã giao"
                    }
                    return (
                      <div className="order border p-5 mb-1" key={index}>
                        <div className="order-header d-flex justify-content-between border-bottom mb-2 pb-1">
                          <div>Mã hóa đơn</div>
                          <div className="stock-col">
                            <span className="in-stock">
                              {status}
                            </span>
                          </div>
                        </div>
                        <OrderDetailItemt order_id={order.id} />
                      </div>
                    )
                  })
                }
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

export default Order;

