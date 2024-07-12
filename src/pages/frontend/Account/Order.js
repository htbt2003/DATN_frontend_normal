import { useEffect, useState } from "react";
import OrderServices from '../../../services/OrderServices';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import swal from "sweetalert";
import Sidebar from "./Sidebar";
import OrderDetailItemt from "./OrderDetailItemt";

const Order = () => {
  const user_id = useSelector((state) => state.auth.user?.id)
  const [orders, setOrders] = useState([]);
  const [reLoad, setReLoad] = useState();
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
  }, [reLoad])
  function handleCancelOrder(id) {
    swal({
      title: "Cảnh báo",
      text: "Bạn chắc muốn hủy đơn hàng",
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
    }).then(async (result) => {
      if (result) {
        try {
          await OrderServices.cancel_order(id)
          setReLoad(Date.now)
        }
        catch (error) {
          console.log(error)
        }
      }
    });
  }

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
              <a href="index.html">Trang chủ</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Cảu hàng</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Tài khoản
            </li>
          </ol>
        </div>
        {/* End .container */}
      </nav>
      {/* End .breadcrumb-nav */}
      <div className="page-content" >
        <div className="dashboard">
          <div className="container">
            <div className="row">
              <Sidebar />
              {/* End .col-lg-3 */}
              <div className="col-md-8 col-lg-10">
                {
                  orders && orders.map((order, index) => {
                    let TotalOrder = 0;
                    order.orderDetails && order.orderDetails.forEach(function (item) {
                      TotalOrder += item.qty * item.price_bill;
                    });                  
                    var status = ""
                    if (order.status == 0) {
                      status = "Chờ xác nhận"
                    }
                    else if (order.status == 1) {
                      status = "Đang lấy hàng"
                    }
                    else if (order.status == 5) {
                      status = "Đã hủy"
                    }
                    else {
                      status = "Đã giao"
                    }
                    return (
                      <div className="order border p-5 mb-3" key={index}>
                        <div className="order-header d-flex justify-content-between border-bottom mb-2 pb-1">
                          <div>Mã hóa đơn</div>
                          <div className="stock-col">
                            <span className="in-stock" style={{ fontSize:15, fontWeight:500 }}>
                              {status}
                            </span>
                          </div>
                        </div>
                        <OrderDetailItemt orderDetails={order.orderDetails} />

                        <div className="d-flex justify-content-end mb-1" style={{ fontSize:20, fontWeight:500 }}>
                          Thành tiền: <span className="ml-1" style={{ color: 'red' }}>{TotalOrder?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                        </div>
                        <div className="d-flex justify-content-end">
                          {
                            order.status == 0?(
                            <button onClick={()=>handleCancelOrder(order.id)} className="btn btn-outline-primary-2 btn-order">
                              Hủy đơn
                            </button>):(
                              <button className="btn btn-outline-primary-2 btn-order">
                              Mua lại
                            </button>
                            )
                          }
                          
                        </div>
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

