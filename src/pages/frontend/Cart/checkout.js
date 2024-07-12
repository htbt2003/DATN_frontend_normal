import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OrderServices from '../../../services/OrderServices';
import UserServices from '../../../services/UserServices';
import swal from "sweetalert";
// import ReactDOM from 'react-dom';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector, useDispatch } from 'react-redux'
import { ClearCart, DeleteCart } from '../../../redux/cartSlice';
import CartServices from "../../../services/CartServices";
import { urlImage } from "../../../config";
// 55281f5fd4dfce1a24054035
import { FaLocationDot } from "react-icons/fa6";
import AddressServices from "../../../services/AddressServices";

function Checkout() {
  const navigator = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [defaultAddress, setDefaultAddress] = useState([]);
  const [note, setNote] = useState("");
  const [payment, setPayment] = useState("");
  const [USDRate, setUSDRate] = useState("");
  const [Cart, setCart] = useState([]);
  const [load, setLoad] = useState(false)

  // const [user, setUser] = useState([])
  const fetchAPI = async () => {
    try {
      if (!user) {
        navigator("/dang-nhap")
      }
      else {
        const deviceId = localStorage.getItem('device_id');
        const [USDRate, ListSelect, address] = await Promise.all([
          OrderServices.getUSDRate(),
          CartServices.getListSelected(deviceId),
          AddressServices.getDefaultAddressByUserId(user?.id),
        ]);

        setCart(ListSelect.ListCart);
        setUSDRate(USDRate.vnd_to_usd);
        setDefaultAddress(address.address);
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
    let price = item.price_sale || item.price;
    TotalCart += item.quantity * price;
    qtyCart += item.quantity;
  });

  async function OrderStore(event) {
    event.preventDefault();//không load lại trang
    setLoad(true);
    var order = {
      user_id: user?.id,
      name: defaultAddress.name,
      email: user?.email,
      address: defaultAddress.address,
      phone: defaultAddress.phone,
      note: note,
    }
    var ListCart = [];
    Cart.forEach((item) => {
      ListCart = [...ListCart,
      {
        id: item.id,
        product_id: item.product_id,
        variant_id: item.variant_id,
        quantity: item.quantity,
        price: item.price_sale || item.price,
        cost: item.variant ? item.variant.cost : item.cost,
      }
      ]
    });

    const orderData = {
      order,
      ListCart,
    }
    await OrderServices.doCheckout(orderData)
      .then(function (result) {
        dispatch(DeleteCart({ qty: qtyCart }));
        swal("Thành công", result.message, "success");
        navigator("/", { replace: true });
      });
    // await OrderServices.doCheckout(orderData)
    //   .then(function (result) {
    //     if (result.status == true) {
    //       dispatch(DeleteCart({ qty: qtyCart }));
    //       swal("Success", result.message, "success");
    //       navigator("/", { replace: true })
    //     }
    //   });
    setLoad(false);
  }
  //----thanh toán paypal---------------------
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
      setLoad(true);
      var order = {
        user_id: user?.id,
        name: defaultAddress.name,
        email: user?.email,
        address: defaultAddress.address,
        phone: defaultAddress.phone,
        note: note,
        }
      var ListCart = [];
      Cart.forEach((item) => {
        ListCart = [...ListCart,
        {
          id: item.id,
          product_id: item.product_id,
          variant_id: item.variant_id,
          quantity: item.quantity,
          price: item.price_sale || item.price,
          cost: item.variant ? item.variant.cost : item.cost,
        }
        ]
      });
      const orderData = {
        order,
        ListCart,
      }
      await OrderServices.doCheckout(orderData)
        .then(function (result) {
          dispatch(DeleteCart({ qty: qtyCart }));
          swal("Thành công", result.message, "success");
          navigator("/", { replace: true });
        });
      setLoad(false);
    });
  };
  // End-Paypal Code
  console.log(defaultAddress)
  return (
    <>
      <main className="main" style={{ backgroundColor: "#f9f9f9" }}>
        {/* <div
          className="page-header text-center"
          style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
        >
          <div className="container">
            <h1 className="page-title">
              Thanh toán
            </h1>
          </div>
        </div> */}
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
              {/* End .checkout-discount */}
              {/* onSubmit={OrderStore} method="post" */}
              <form>
                <div className="row">
                  <div className="col-lg-3">
                    <div className="mb-3 p-5 address">
                      <h5 style={{color:'red'}}>
                        <span className="mr-2"><FaLocationDot size={15}/></span>
                        Địa chỉ nhận hàng
                        </h5>
                        <strong style={{ fontSize:18}}>{defaultAddress.name}</strong>
                        <h6>{defaultAddress.phone}</h6>
                        <div className="mb-1" style={{ wordWrap: 'break-word', wordBreak: 'break-all', whiteSpace: 'normal' }}>
                          {defaultAddress.address}
                          </div>
                          <div className="row">
                          <div className="border border-danger p-2" style={{ fontSize:'12px' ,color:'red', width:68}}>Mặc định</div>
                          <Link to={"/tai-khoan/so-dia-chi"} className="ml-auto p-2" style={{ fontSize:'12px' ,color:'blue', width:68, fontWeight:500}}>Thay đổi</Link>
                          </div>
                    </div>
                    <div className="mb-3 p-3 address">
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
                  </div>
                  <aside className="col-lg-9">
                    <div className="summary address">
                      <h3 className="summary-title">Hóa đơn</h3>
                      <table className="table table-summary">
                        <thead>
                          <tr>
                            <th colSpan={2}>Sản phẩm</th>
                            <th>Đơn giá</th>
                            <th>Thành tiền</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            Cart.map((item, key) => {
                              let name = item.name;
                              let hinhanh = urlImage + "product/" + item.image;
                              let price = item.price;
                              let price_sale = item.price_sale || null;

                              if (item.variant) {
                                name = item.variant.name;
                                price = item.variant.price;
                                // price_sale = item.variant.sale?.price_sale || null;

                                item.variant.variant_values.forEach(function (item1) {
                                  if (item1.product_attribute_value.image != null) {
                                    hinhanh = urlImage + "pro_attribute/" + item1.product_attribute_value.image;
                                  }
                                });
                              }
                              return (
                                <tr key={key}>
                                  <td className="p-3" colSpan={2}>
                                    <div className="row align-items-center">
                                       <img
                                         style={{width:"80px", height:"100px"}}
                                          src={hinhanh}
                                          alt="Product image"
                                          className="mr-3"
                                        />
                                        <div className="">
                                        {name} <p> × {item.quantity}</p>
                                        </div>
                                    </div>
                                  </td>
                                  <td>
                                    {price_sale ? (
                                      <>
                                        <div style={{ textDecoration: 'line-through', color: 'red' }}>
                                          {price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                        </div>
                                        <div>
                                          {price_sale?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                        </div>
                                      </>
                                    ) : (
                                      <div>
                                        {price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                      </div>
                                    )}
                                  </td>
                                  <td>
                                    {price_sale ? (
                                        <div>
                                          {(price_sale*item.quantity)?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                        </div>
                                    ) : (
                                      <div>
                                        {(price*item.quantity)?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              )
                            })

                          }
                          <tr className="summary-subtotal">
                            <td colSpan={3}>Tổng:</td>
                            <td>{TotalCart.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                          </tr>

                          <tr>
                            <td colSpan={3}>Vận chuyển:</td>
                            <td>Miễn phí</td>
                          </tr>
                          <tr className="summary-total">
                            <td colSpan={3}>Tổng hoá đơn:</td>
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
                              // name="shipping"
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
                              // name="shipping"
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
                            className="btn-outline-primary-2 btn-order btn-block"
                            onClick={OrderStore}
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

