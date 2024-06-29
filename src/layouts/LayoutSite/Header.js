import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import React from 'react'
import Menu from "./Menu";
import swal from "sweetalert";
import UserServices from '../../services/UserServices';
import { urlImage } from "../../config";
import {DeleteCart} from '../../redux/cartSlice';
import { AiOutlineLogin } from "react-icons/ai";
import { clearAuth } from "../../redux/authSlice";
import  {useSelector, useDispatch} from 'react-redux'

function Header() {
  const dispatch = useDispatch();
  const [key, setKey] = useState("");
  const navigator = useNavigate();
  const token = useSelector((state)=> state.auth.token);
  const numberCart = useSelector((state)=> state.cart.numberCart);
  let ListCart = useSelector((state)=> state.cart.Carts);
  let TotalCart = 0;
  ListCart.forEach(function (item) {
    TotalCart += item.quantity * item.price;
  });
  const logoutSubmit = async () => {
    try {
      const result = await UserServices.logout();
      dispatch(clearAuth())
      swal("Success", result.message, "success");
      navigator("/", { replace: true })
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
<header className="header header-2 header-intro-clearance">
<div className="header-top">
  <div className="container pt-1 pb-1">
    <div className="header-right">
      <ul className="top-menu">
        <li>
          <a href="#">Links</a>
          <ul>
            <li>
              <a href="tel:#">
                <i className="icon-phone" />
                Liên hệ: +0123 456 789
              </a>
            </li>
            {/* <li>
              <a href="wishlist.html">
                <i className="icon-heart-o" />
                Wishlist <span>(3)</span>
              </a>
            </li> */}
            {/* <li>
              <a href="about.html">About Us</a>
            </li>
            <li>
              <a href="contact.html">Contact Us</a>
            </li> */}
            {
              token != null ? 
              (
                <li onClick={()=>logoutSubmit()}>
                  <a href="#signin-modal" data-toggle="modal">
                  <AiOutlineLogin className="mr-1"/>
                    Đăng xuất
                  </a>
                </li>
              ):null
            }
            
          </ul>
        </li>
      </ul>
      {/* End .top-menu */}
    </div>
    {/* End .header-right */}
  </div>
  {/* End .container */}
</div>
  {/* End .header-top */}
  <div className="header-middle">
    <div className="container">
      <div className="header-left">
        <button className="mobile-menu-toggler">
          <span className="sr-only">Toggle mobile menu</span>
          <i className="icon-bars" />
        </button>
        {/* <a href="index.html" className="logo">
          <img
            src="assets/images/demos/demo-2/logo.png"
            alt="Molla Logo"
            width={105}
            height={25}
          />
        </a> */}
      </div>
      {/* End .header-left */}
      <div className="header-center">
        <div className="header-search header-search-extended header-search-visible header-search-no-radius d-none d-lg-block">
          <a href="#" className="search-toggle" role="button">
            <i className="icon-search" />
          </a>
          <form action="#" method="get">
            <div className="header-search-wrapper search-wrapper-wide">
              <label htmlFor="q" className="sr-only">
                Search
              </label>
              <input
                type="search"
                className="form-control"
                name="q"
                id="q"
                placeholder="Tìm sản phẩm hoặc bài viết ..."
                required=""
                value={key} onChange={(e) => setKey(e.target.value)}
              />
              <Link className="btn btn-primary" to={"/tim-kiem/" + key}>
                <i className="icon-search" />
              </Link>
            </div>
            {/* End .header-search-wrapper */}
          </form>
        </div>
        {/* End .header-search */}
      </div>
      <div className="header-right">
        {
          token!=null ? 
          (
            // <div className="account">
            //   <Link to={"/tai-khoan"} title="Tài khoản">
            //     <div className="icon">
            //       <i className="icon-user" />
            //     </div>
            //     <p>Tài khoản</p>
            //   </Link>
            // </div>
                      <div className="dropdown cart-dropdown">
                      <Link
                        className="dropdown-toggle"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        data-display="static"
                      >
                        <div className="icon">
                          <i className="icon-user" />
                        </div>
                        <p>Tài khoản</p>
                      </Link>
                      <div className="dropdown-menu dropdown-menu-right" style={{width:"auto"}}>
                        <div className="dropdown-cart-products">
                          <div className="d-flex align-items-center">
                            {/* <AiOutlineLogin /> */}
                            <Link class="dropdown-item" to={"/tai-khoan/thong-tin-ca-nhan"}>Quản ký tài khoản</Link>
                          </div>
                          <div className="d-flex align-items-center">
                            {/* <AiOutlineLogin /> */}
                            <Link class="dropdown-item" to={"/tai-khoan/don-hang-cua-toi"}>Đơn hàng của tôi</Link>
                          </div>
                        </div>
                        
                      </div>
                      {/* End .dropdown-menu */}
                    </div>
            
          ) 
          :
         (
          <div className="dropdown cart-dropdown">
          <Link
            className="dropdown-toggle"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            data-display="static"
          >
            <div className="icon">
              <i className="icon-user" />
            </div>
            {/* <p>Giỏ hàng</p> */}
          </Link>
          <div className="dropdown-menu dropdown-menu-right" style={{width:"auto"}}>
            <div className="dropdown-cart-products">
              <div className="d-flex align-items-center">
                {/* <AiOutlineLogin /> */}
                <Link class="dropdown-item" to={"/dang-nhap"}>Đăng nhập</Link>
              </div>
              <div className="d-flex align-items-center">
                {/* <AiOutlineLogin /> */}
                <Link class="dropdown-item" to={"/dang-ky"}>Đăng ký</Link>
              </div>
            </div>
            
          </div>
          {/* End .dropdown-menu */}
        </div>
         )        
        }

        {/* gio hang */}
        <div className="cart-dropdown">
          <Link
            to={"/gio-hang"}
            className="dropdown-toggle"
            // role="button"
            // data-toggle="dropdown"
            // aria-haspopup="true"
            // aria-expanded="false"
            // data-display="static"
          >
            <div className="icon">
              <i className="icon-shopping-cart" />
              <span className="cart-count">{numberCart}</span>
            </div>
            <p>Giỏ hàng</p>
          </Link>
          {/* <div className="dropdown-menu dropdown-menu-right">
            <div className="dropdown-cart-products">
            {
              ListCart.length > 0 ? 
              (
                ListCart.map((item, key) => {
                  return (
                    <div className="product" key={key}>
                      <div className="product-cart-details">
                        <h4 className="product-title">
                          <a href="product.html">{item.name}</a>
                        </h4>
                        <span className="cart-product-info">
                          <span className="cart-product-qty">{item.quantity}</span>x{" "}
                          {item.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </span>
                      </div>
                      <figure className="product-image-container">
                        <a href="product.html" className="product-image">
                          <img
                            src={urlImage + "product/" + item.image}
                            alt="product"
                          />
                        </a>
                      </figure>
                      <div
                        className="btn-remove"
                        title="Remove Product"
                        onClick={() => DeleteCart(key)}
                      >
                        <i className="icon-close" />
                      </div>
                    </div>
                  );
                })
              )
               : 
              (
                <p>Giỏ hàng trống</p>
              )
            }
            </div>
            <div className="dropdown-cart-total">
              <span>Tổng</span>
              <span className="cart-total-price">{TotalCart.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
            </div>
            <div className="dropdown-cart-action">
              <Link to={"/gio-hang"} className="btn btn-primary">
                Giỏ hàng
              </Link>
              <Link  to='/thanh-toan' className="btn btn-outline-primary-2">
                <span>Thanh toán</span>
                <i className="icon-long-arrow-right" />
              </Link>
            </div>
          </div> */}
        </div>
      </div>
      {/* End .header-right */}
    </div>
    {/* End .container */}
  </div>
  {/* End .header-middle */}
  <div className="header-bottom sticky-header">
    <div className="container">
      <div className="header-left">
        <div className="dropdown category-dropdown">
          <a
            href="#"
            className="dropdown-toggle"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            data-display="static"
            title="Browse Categories"
          >
            Danh mục sản phẩm
          </a>
          <div className="dropdown-menu">
            <nav className="side-nav">
              <ul className="menu-vertical sf-arrows">
                <li className="item-lead">
                  <a href="#">Daily offers</a>
                </li>
                <li className="item-lead">
                  <a href="#">Gift Ideas</a>
                </li>
                <li>
                  <a href="#">Beds</a>
                </li>
                <li>
                  <a href="#">Lighting</a>
                </li>
                <li>
                  <a href="#">Sofas &amp; Sleeper sofas</a>
                </li>
                <li>
                  <a href="#">Storage</a>
                </li>
                <li>
                  <a href="#">Armchairs &amp; Chaises</a>
                </li>
                <li>
                  <a href="#">Decoration </a>
                </li>
                <li>
                  <a href="#">Kitchen Cabinets</a>
                </li>
                <li>
                  <a href="#">Coffee &amp; Tables</a>
                </li>
                <li>
                  <a href="#">Outdoor Furniture </a>
                </li>
              </ul>
              {/* End .menu-vertical */}
            </nav>
            {/* End .side-nav */}
          </div>
          {/* End .dropdown-menu */}
        </div>
        {/* End .category-dropdown */}
      </div>
      {/* End .header-left */}
      <Menu/>
      {/* End .header-center */}
    </div>
    {/* End .container */}
  </div>
  {/* End .header-bottom */}
</header>

  );
}

export default Header;
