import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import OrderServices from '../../../services/OrderServices';
import UserServices from '../../../services/UserServices';
import swal from "sweetalert";
// import ReactDOM from 'react-dom';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector, useDispatch } from 'react-redux'
import { ClearCart, DeleteCart } from '../../../redux/cartSlice';
import CartServices from "../../../services/CartServices";
// 55281f5fd4dfce1a24054035

function Checkout() {
  const navigator = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [payment, setPayment] = useState("");
  const [USDRate, setUSDRate] = useState("");
  const [Cart, setCart] = useState([]);


  // const [user, setUser] = useState([])
  const fetchAPI = async () => {
    try {
      if (!user) {
        navigator("/dang-nhap")
      }
      else {
        const deviceId = localStorage.getItem('device_id');
        const [USDRate, ListSelect] = await Promise.all([
          OrderServices.getUSDRate(),
          CartServices.getListSelected(deviceId),
        ]);
  
        setCart(ListSelect.ListCart);
        setUSDRate(USDRate.vnd_to_usd);

      }
    }
    catch (error) {
      console.log('wait...')
    }
  }
  useEffect(function () {
    fetchAPI()
  }, [])
  //tính tổng và số lượng mua hàng
  let TotalCart = 0;
  let qtyCart = 0;
  Cart.forEach(function (item) {
    const price = item.price_sale || (item.sale ? item.sale.price_sale : item.price)
    TotalCart += item.quantity * price;
    qtyCart += item.quantity
  });

  // console.log((TotalCart * USDRate).toFixed(2))
  //paypal
  // const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: (TotalCart * USDRate).toFixed(2),
          },
        },
      ],
    });
  };
  const onApprove = async (data, actions) => {
    return actions.order.capture().then(async function (details) {
      // orderinfo_data.payment_id = details.id;
      var order = {
        user_id: user.id,
        name: name == "" ? user.name : name,
        email: email == "" ? user.email : email,
        address: address == "" ? user.address : address,
        phone: phone == "" ? user.phone : phone,
        note: note,
      }
      var ListCart = [];
      Cart.forEach((item) => {
        ListCart = [...ListCart,
        {
          id:item.id,
          product_id: item.product_id,
          variant_id: item.variant_id,
          quantity: item.quantity,
          price: item.price_sale || item.price,
          cost: item.cost || null,
        }
        ]
      });

      const orderData = {
        order,
        ListCart,
      }
      await OrderServices.doCheckout(orderData)
        .then(function (result) {
          dispatch(DeleteCart({qty: qtyCart}));
          swal("Thành công", result.message, "success");
          navigator("/", { replace: true });
        });
    });
  };
  // End-Paypal Code
  async function OrderStore(event) {
    event.preventDefault();//không load lại trang
    var order = {
      user_id: user.id,
      name: name == "" ? user.name : name,
      email: email == "" ? user.email : email,
      address: address == "" ? user.address : address,
      phone: phone == "" ? user.phone : phone,
      note: note,
    }
    var ListCart = [];
    Cart.forEach((item) => {
      ListCart = [...ListCart,
      {
        id:item.id,
        product_id: item.product_id,
        variant_id: item.variant_id,
        quantity: item.quantity,
        price: item.price_sale || item.price,
        cost: item.cost || null,
      }
      ]
    });

    const orderData = {
      order,
      ListCart,
    }
    // dispatch(ClearCart());
    await OrderServices.doCheckout(orderData)
      .then(function (result) {
        if (result.status == true) {
          dispatch(DeleteCart({qty: qtyCart}));
          swal("Success", result.message, "success");
          navigator("/", { replace: true })
        }
      });
  }
  console.log(Cart)
  return (
    <>
      <main className="main">
        <div
          className="page-header text-center"
          style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
        >
          <div className="container">
            <h1 className="page-title">
              Thanh toán
            </h1>
          </div>
          {/* End .container */}
        </div>
        {/* End .page-header */}
        <nav aria-label="breadcrumb" className="breadcrumb-nav">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Trang chủ</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Thanh toán
              </li>
            </ol>
          </div>
          {/* End .container */}
        </nav>
        {/* End .breadcrumb-nav */}
        <div className="page-content">
          <div className="checkout">
            <div className="container">
              <div className="checkout-discount">
                <form action="#">
                  <input
                    type="text"
                    className="form-control"
                    required=""
                    id="checkout-discount-input"
                  />
                  <label
                    htmlFor="checkout-discount-input"
                    className="text-truncate"
                  >
                    Have a coupon? <span>Click here to enter your code</span>
                  </label>
                </form>
              </div>
              {/* End .checkout-discount */}
              {/* onSubmit={OrderStore} method="post" */}
              <form onSubmit={OrderStore} method="post">
                <div className="row">
                  <div className="col-lg-9">
                    <h2 className="checkout-title">Billing Details</h2>
                    {/* End .checkout-title */}
                    <label>Họ tên *</label>
                    <input type="text" className="form-control" required="" onChange={(e) => setName(e.target.value)} value={name} />
                    {/* End .row */}
                    <label>Email</label>
                    <input type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} />

                    <label>Địa chỉ *</label>
                    <input type="text" className="form-control" required="" onChange={(e) => setAddress(e.target.value)} value={address} />

                    <label>Số điện thoại *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Số điện thoại"
                      required=""
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                    />

                    <label>Ghi chú</label>
                    <textarea
                      className="form-control"
                      cols={30}
                      rows={4}
                      placeholder="Ghi chú về đơn đặt hàng của bạn, ví dụ: ghi chú đặc biệt khi giao hàng"
                      defaultValue={""}
                      onChange={(e) => setNote(e.target.value)} value={note}
                    />
                  </div>
                  {/* End .col-lg-9 */}
                  <aside className="col-lg-3">
                    <div className="summary">
                      <h3 className="summary-title">Hóa đơn</h3>
                      {/* End .summary-title */}
                      <table className="table table-summary">
                        <thead>
                          <tr>
                            <th>Sản phẩm</th>
                            <th>Tổng</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            Cart.map((item, key) => {
                              return (
                                <tr key={key}>
                                  <td>
                                    {" "}
                                    {item.name} <strong> × {item.quantity}</strong>
                                  </td>
                                  <td> {(item.price * item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                </tr>
                              )
                            })

                          }
                          <tr className="summary-subtotal">
                            <td>Tổng:</td>
                            <td>{TotalCart.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                          </tr>
                          {/* End .summary-subtotal */}
                          <tr>
                            <td>Vận chuyển:</td>
                            <td>Miễn phí</td>
                          </tr>
                          <tr className="summary-total">
                            <td>Tổng hoá đơn:</td>
                            <td>{TotalCart.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                          </tr>
                          {/* End .summary-total */}
                        </tbody>
                      </table>
                      {/* End .table table-summary */}
                      <div className="accordion-summary" id="accordion-payment">
                        <div className="">
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              id="free-shipping"
                              name="shipping"
                              className="custom-control-input"
                              value="0"
                              checked={payment === "0"}
                              onChange={(e) => setPayment(e.target.value)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="free-shipping"
                            >
                              Thanh toán khi nhận hàng
                            </label>
                          </div>
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              id="free-shipping1"
                              name="shipping"
                              className="custom-control-input"
                              value="1"
                              checked={payment === "1"}
                              onChange={(e) => setPayment(e.target.value)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="free-shipping1"
                            >
                              Thanh toán Paypal
                            </label>
                          </div>
                        </div>
                      </div>
                      {/* End .accordion */}

                      {
                        payment === '1' ? (
                          // <PayPalButton
                          //   createOrder={(data, actions) => createOrder(data, actions)}
                          //   onApprove={(data, actions) => onApprove(data, actions)}
                          // />
                          <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                          />

                        ) : (
                          <button
                            type="submit"
                            className="btn-outline-primary-2 btn-order btn-block"
                            // onClick={}
                          >
                            <span className="btn-text">Thanh toán</span>
                          </button>
                        )
                      }

                    </div>
                    {/* End .summary */}
                  </aside>
                  {/* End .col-lg-3 */}
                </div>
                {/* End .row */}
              </form>
            </div>
            {/* End .container */}
          </div>
          {/* End .checkout */}
        </div>
        {/* End .page-content */}
      </main>
    </>
  )
}

export default Checkout;

