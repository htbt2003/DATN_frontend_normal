import React, { useEffect, useState } from 'react'
import { urlImage } from '../../../config';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { DecreaseQuantity, IncreaseQuantity, DeleteCart, UpdateCart } from '../../../redux/cartSlice';
import swal from 'sweetalert';
import CartServices from '../../../services/CartServices';

function Cart() {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [reload, setReload] = useState();
  const [ListCart, setListCart] = useState([]);
  const [selectedproducts, setSelectedproducts] = useState([]);

  useEffect(function () {
    const deviceId = localStorage.getItem('device_id');
    const fetchAPI = async () => {
      try {
        const result = await CartServices.getList(deviceId);
        setListCart(result.ListCart);
        localStorage.setItem('numberCart', result.ListCart.length);
      }
      catch (error) {
        console.log('wait...')
      }
    }
    fetchAPI()
  }, [reload])
  //Tính tổng giỏ hàng
  let TotalCart = 0;
  ListCart && ListCart.forEach(function (item) {
    TotalCart += item.quantity * item.price;
    if (item.status == 1) {
      selectedproducts.push(item.id);
    }
  });

  const handleDelete = (item) => {
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
    }).then(async (result) => {
      if (result) {
        const qty = item.quantity
        const result = await CartServices.delete(item.id);
        dispatch(DeleteCart({ qty }));
        setReload(Date.now())
      }
    });
  };

  const handleIncrease = async (id) => {
    const result = await CartServices.increase(id);
    dispatch(IncreaseQuantity());
    setReload(Date.now())
  };
  const handleDecrease = async (id) => {
    const result = await CartServices.decrease(id);
    dispatch(DecreaseQuantity());
    setReload(Date.now())
  };

  const handleUpdateQty = async (item, e) => {
    const newQty = e.target.value

    const result = await CartServices.update_qty(item.id, newQty);

    if (!result.status) {
      swal("Cảnh báo", "Rất tiếc, bạn chỉ có thể mua " + result.inventory + " sản phẩm", "warning");
      e.target.value = result.inventory
      await CartServices.update_qty(item.id, e.target.value);
      // dispatch(UpdateCart({ qtyOld: item.quantity, qtyNew: result.inventory}));
    } else {
      dispatch(UpdateCart({ qtyOld: item.quantity, qtyNew: newQty }));
    }

    setReload(Date.now())
  };

  const handleCheckbox = async (item) => {
    if (selectedproducts.includes(item.id)) {
      setSelectedproducts(prevSelected => prevSelected.filter(id => id !== item.id));
    } else {
      setSelectedproducts(prevSelected => [...prevSelected, item.id]);
    }
    const result = await CartServices.selected(item.id);
    if (!result.status) {
      swal("Cảnh báo", result.message, "warning");
    }
    setReload(Date.now())
  };
  const handleThanhToan = () => {
    if (selectedproducts.length === 0) {
      swal("Cảnh báo", 'Vui lòng chọn ít nhất một sản phẩm để thanh toán.', "warning");
    } else {
      navigator("/thanh-toan");
    }
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
                  <a href="#">Cửa hàng</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Giỏ hàng
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
                          <th>Sản phẩm</th>
                          <th>Giá</th>
                          <th>Số lượng</th>
                          <th>Tổng</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {
                          ListCart.map((item, key) => {
                            if (item.variant) {
                              let image = item.image;
                              let hinhanh = urlImage + "product/" + image;
                              item.variant.variant_values.forEach(function (item1) {
                                if (item1.product_attribute_value.image != null) {
                                  image = item1.product_attribute_value.image;
                                  hinhanh = urlImage + "pro_attribute/" + image;
                                }
                              });
                              return (
                                <tr key={key}>

                                  <td className="product-col d-flex justify-content-between align-items-center">
                                    <input
                                      style={{ height: '18px', width: '18px' }}
                                      type="checkbox"
                                      className="align-middle form-check-input d-flex align-items-center justify-content-center border border-secondary text-white bg-brand-500"
                                      id={"category" + item.id}
                                      onChange={() => handleCheckbox(item)}
                                      checked={selectedproducts.includes(item.id)}
                                    />
                                    <div className="product ml-4">
                                      <figure className="product-media">
                                        <a href="#">
                                          <img
                                            src={hinhanh}
                                            alt="Product image"
                                          />
                                        </a>
                                      </figure>
                                      <div className="product-title">
                                        <h5>
                                          <Link>{item.variant.name}</Link>
                                        </h5>
                                        <div className="product-title">
                                          {item.variant.variant_values.map((item2, index) =>
                                            <a className='mr-3 text-muted' key={index}>{item2.product_attribute_value.attribute_value.name}</a>
                                          )}
                                        </div>
                                      </div>
                                      {/* End .product-title */}
                                    </div>
                                    {/* End .product */}
                                  </td>
                                  <td className="price-col">
                                    {item.price_sale ? (
                                      <>
                                        <div style={{ textDecoration: 'line-through', color: 'red' }}>
                                          {item.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                        </div>
                                        <div>
                                          {item.price_sale?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                        </div>
                                      </>
                                    ) : (
                                      <div>
                                        {item.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                      </div>
                                    )}
                                  </td>

                                  <td className="quantity-col">
                                    <div className="cart-product-quantity">
                                      <div className="input-group input-spinner">
                                        <div className="input-group-prepend" >
                                          <button
                                            style={{ minWidth: 26 }}
                                            className="btn btn-decrement btn-spinner"
                                            type="button"
                                            onClick={() => handleDecrease(item.id)}
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
                                          onChange={(e) => {
                                            const updatedListCart = [...ListCart];
                                            updatedListCart[key].quantity = e.target.value;
                                            setListCart(updatedListCart);
                                          }}
                                          onBlur={(e) => handleUpdateQty(item, e)}
                                        />
                                        <div className="input-group-append">
                                          <button
                                            onClick={() => handleIncrease(item.id)}
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
                                  <td className="total-col">{(item.price * item.quantity)?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                  <td className="remove-col">
                                    <button className="btn-remove" onClick={() => handleDelete(item)}>
                                      <i className="icon-close" />
                                    </button>
                                  </td>
                                </tr>
                              )
                            }
                            else {
                              return (
                                <tr key={key}>
                                  <td className="product-col d-flex justify-content-between align-items-center">
                                    <input
                                      style={{ height: '18px', width: '18px' }}
                                      type="checkbox"
                                      className="align-middle form-check-input d-flex align-items-center justify-content-center border border-secondary text-white bg-brand-500"
                                      id={"category" + item.id}
                                      onChange={() => handleCheckbox(item)}
                                      checked={selectedproducts.includes(item.id)}
                                    />
                                    <div className="product ml-4">
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
                                  <td className="price-col">{(item.price)?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                  <td className="quantity-col">
                                    <div className="cart-product-quantity">
                                      <div className="input-group input-spinner">
                                        <div className="input-group-prepend" onClick={() => handleDecrease(item.id)}>
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
                                          value={item.quantity}
                                          onChange={(e) => {
                                            const updatedListCart = [...ListCart];
                                            updatedListCart[key].quantity = e.target.value;
                                            setListCart(updatedListCart);
                                          }}
                                          onBlur={(e) => handleUpdateQty(item.id, e)}
                                        />
                                        <div className="input-group-append">
                                          <button
                                            onClick={() => handleIncrease(item.id)}
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
                                  <td className="total-col">{(item.price * item.quantity)?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                  <td className="remove-col">
                                    <button className="btn-remove" onClick={() => handleDelete(item)}>
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
                            <td>{TotalCart?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
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
                            <td>{TotalCart?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                          </tr>
                          {/* End .summary-total */}
                        </tbody>
                      </table>
                      {/* End .table table-summary */}
                      <button
                        onClick={handleThanhToan}
                        className="btn btn-outline-primary-2 btn-order btn-block"
                      >
                        Thanh toán
                      </button>
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
