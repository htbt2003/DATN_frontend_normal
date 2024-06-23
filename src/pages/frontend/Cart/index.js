import React from 'react'
import { urlImage } from '../../../config';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { DecreaseQuantity, IncreaseQuantity, DeleteCart } from '../../../redux/cartSlice';
import swal from 'sweetalert';


function Cart() {
  const dispatch = useDispatch();
  let ListCart = useSelector((state) => state.cart.Carts);
  let TotalCart = 0;
  console.log(ListCart)
  ListCart.forEach(function (item) {
    TotalCart += item.quantity * item.price;
  });
  const handleDelete = (key) => {
    swal({
        title: "Bạn có chắc muốn xóa sản phẩm này?",
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
    }).then((result) => {
        if (result) {
            // Dispatch delete action here
            dispatch(DeleteCart(key))
        }
    });
  };
  if (ListCart.length > 0) {
    return (
      <>
        <main className="main">
          <div
            className="page-header text-center"
            style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
          >
            <div className="container">
              <h1 className="page-title">
                Giỏ hàng<span>Cửa hàng</span>
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
                <li className="breadcrumb-item">
                  <a href="#">Shop</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Shopping Cart
                </li>
              </ol>
            </div>
            {/* End .container */}
          </nav>
          {/* End .breadcrumb-nav */}
          <div className="page-content">
            <div className="cart">
              <div className="container">
                <div className="row">
                  <div className="col-lg-9">
                    <table className="table table-cart table-mobile">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {
                          ListCart.map((item, key) => {
                            if(item.variant_values){
                              return (
                                <tr key={key}>
                                  <td className="product-col">
                                    <div className="product">
                                      <figure className="product-media">
                                        <a href="#">
                                          <img
                                            src={urlImage + "pro_attribute/" + item.image}
                                            alt="Product image"
                                          />
                                        </a>
                                      </figure>
                                      <div className="product-title">
                                      <h5>
                                        <Link>{item.name}</Link>
                                      </h5>
                                      <div className="product-title">
                                      {item.variant_values.map((item1, index) => 
                                        <a className='mr-3 text-muted' key={index}>{item1.product_attribute_value.attribute_value.name}</a>
                                      )}
                                      </div>
                                      </div>
                                      {/* End .product-title */}
                                    </div>
                                    {/* End .product */}
                                  </td>
                                  <td className="price-col">{(item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                  <td className="quantity-col">
                                    <div className="cart-product-quantity">
                                      <div className="input-group  input-spinner">
                                        <div className="input-group-prepend" onClick={() => dispatch(DecreaseQuantity(key))}>
                                          <button
                                            style={{ minWidth: 26 }}
                                            className="btn btn-decrement btn-spinner"
                                            type="button"
                                          >
                                            <i className="icon-minus" />
                                          </button>
                                        </div>
                                        <input
                                          type="number"
                                          style={{ textAlign: "center" }}
                                          className="form-control "
                                          required=""
                                          placeholder=""
                                          value={item.quantity}
                                        />
                                        <div className="input-group-append">
                                          <button
                                            onClick={() => dispatch(IncreaseQuantity(key))}
                                            style={{ minWidth: 26 }}
                                            className="btn btn-increment btn-spinner"
                                            type="button"
                                          >
                                            <i className="icon-plus" />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    {/* End .cart-product-quantity */}
                                  </td>
                                  <td className="total-col">{(item.price * item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                  <td className="remove-col">
                                    <button className="btn-remove" onClick={() => handleDelete(key)}>
                                      <i className="icon-close" />
                                    </button>
                                  </td>
                                </tr>
                              )  
                            }
                            else{
                              return (
                                <tr>
                                  <td className="product-col">
                                    <div className="product">
                                      <figure className="product-media">
                                        <a href="#">
                                          <img
                                            src={urlImage + "product/" + item.image}
                                            alt="Product image"
                                          />
                                        </a>
                                      </figure>
                                      <h5 className="">
                                        <a>{item.name}</a>
                                      </h5>
                                      {/* End .product-title */}
                                    </div>
                                    {/* End .product */}
                                  </td>
                                  <td className="price-col">{(item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                  <td className="quantity-col">
                                    <div className="cart-product-quantity">
                                      <div className="input-group  input-spinner">
                                        <div className="input-group-prepend" onClick={() => dispatch(DecreaseQuantity(key))}>
                                          <button
                                            style={{ minWidth: 26 }}
                                            className="btn btn-decrement btn-spinner"
                                            type="button"
                                          >
                                            <i className="icon-minus" />
                                          </button>
                                        </div>
                                        <input
                                          type="number"
                                          style={{ textAlign: "center" }}
                                          className="form-control "
                                          required=""
                                          placeholder=""
                                          value={item.quantity}
                                        />
                                        <div className="input-group-append">
                                          <button
                                            onClick={() => dispatch(IncreaseQuantity(key))}
                                            style={{ minWidth: 26 }}
                                            className="btn btn-increment btn-spinner"
                                            type="button"
                                          >
                                            <i className="icon-plus" />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    {/* End .cart-product-quantity */}
                                  </td>
                                  <td className="total-col">{(item.price * item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                  <td className="remove-col">
                                    <button className="btn-remove" onClick={() => handleDelete(key)}>
                                      <i className="icon-close" />
                                    </button>
                                  </td>
                                </tr>
  
                              )  
                            }
                          })

                        }
                      </tbody>
                    </table>
                    {/* End .table table-wishlist */}
                    <div className="cart-bottom">
                      <div className="cart-discount">
                        <form action="#">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              required=""
                              placeholder="coupon code"
                            />
                            <div className="input-group-append">
                              <button
                                className="btn btn-outline-primary-2"
                                type="submit"
                              >
                                <i className="icon-long-arrow-right" />
                              </button>
                            </div>
                            {/* .End .input-group-append */}
                          </div>
                          {/* End .input-group */}
                        </form>
                      </div>
                      {/* End .cart-discount */}
                      {/* <a href="#" className="btn btn-outline-dark-2">
                  <span>Cập nhật giỏ hàng</span>
                  <i className="icon-refresh" />
                </a> */}
                    </div>
                    {/* End .cart-bottom */}
                  </div>
                  {/* End .col-lg-9 */}
                  <aside className="col-lg-3">
                    <div className="summary summary-cart">
                      <h3 className="summary-title">Tổng giỏ hàng</h3>
                      {/* End .summary-title */}
                      <table className="table table-summary">
                        <tbody>
                          <tr className="summary-subtotal">
                            <td>Tổng phụ:</td>
                            <td>{TotalCart.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                          </tr>
                          {/* End .summary-subtotal */}
                          <tr className="summary-shipping">
                            <td>Vận chuyển:</td>
                            <td>&nbsp;</td>
                          </tr>
                          <tr className="summary-shipping-row">
                            <td>
                              <div className="custom-control custom-radio">
                                <input
                                  type="radio"
                                  id="free-shipping"
                                  name="shipping"
                                  className="custom-control-input"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="free-shipping"
                                >
                                  Miễn phí:
                                </label>
                              </div>
                              {/* End .custom-control */}
                            </td>
                            <td>$0.00</td>
                          </tr>
                          {/* End .summary-shipping-row */}
                          <tr className="summary-shipping-row">
                            <td>
                              <div className="custom-control custom-radio">
                                <input
                                  type="radio"
                                  id="standart-shipping"
                                  name="shipping"
                                  className="custom-control-input"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="standart-shipping"
                                >
                                  Tiêu chuẩn:
                                </label>
                              </div>
                              {/* End .custom-control */}
                            </td>
                            <td>$10.00</td>
                          </tr>
                          {/* End .summary-shipping-row */}
                          <tr className="summary-shipping-row">
                            <td>
                              <div className="custom-control custom-radio">
                                <input
                                  type="radio"
                                  id="express-shipping"
                                  name="shipping"
                                  className="custom-control-input"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="express-shipping"
                                >
                                  Express:
                                </label>
                              </div>
                              {/* End .custom-control */}
                            </td>
                            <td>$20.00</td>
                          </tr>
                          {/* End .summary-shipping-row */}
                          <tr className="summary-shipping-estimate">
                            <td>
                              <br /> <a href="dashboard.html">Thay đổi địa chỉ</a>
                            </td>
                            <td>&nbsp;</td>
                          </tr>
                          {/* End .summary-shipping-estimate */}
                          <tr className="summary-total">
                            <td>Tổng:</td>
                            <td>{TotalCart.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                          </tr>
                          {/* End .summary-total */}
                        </tbody>
                      </table>
                      {/* End .table table-summary */}
                      <Link
                        to={"/thanh-toan"}
                        className="btn btn-outline-primary-2 btn-order btn-block"
                      >
                        Thanh toán
                      </Link>
                    </div>
                    {/* End .summary */}
                    <a
                      href="category.html"
                      className="btn btn-outline-dark-2 btn-block mb-3"
                    >
                      <span>Tiếp tục mua sắm</span>
                      <i className="icon-refresh" />
                    </a>
                  </aside>
                  {/* End .col-lg-3 */}
                </div>
                {/* End .row */}
              </div>
              {/* End .container */}
            </div>
            {/* End .cart */}
          </div>
          {/* End .page-content */}
        </main>
        {/* End .main */}
      </>
    );
  }
  else {
    return (

      <div className="card card-body py-5 text-center shadow-sm" style={{ height: 600 }}>
        <h4>Giỏ hàng của bạn trống</h4>
      </div>

    )
  }
}

export default Cart;
