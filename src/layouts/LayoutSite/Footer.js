import { useEffect, useState } from 'react';
import PostServices from '../../services/PostServices';
import { Link } from 'react-router-dom';
import { urlImage } from '../../config';

function Footer() {
    // const [posts, setPosts] = useState([]);
    // const [postNew, setPostNew] = useState([]);
    // useEffect(function () {
    //     (async function () {
    //         try {
    //             const result = await PostServices.getByType(8, "post")
    //             setPosts(result.data.posts)
    //         }
    //         catch (error) {
    //             console.log(error)
    //         }
    //     })();
    // }, [])
    // useEffect(function () {
    //     (async function () {
    //         try {
    //             const result = await PostServices.getPostNew()
    //             setPostNew(result.data.post)
    //         }
    //         catch (error) {
    //             console.log(error)
    //         }
    //     })();
    // }, [])
    return (
        <footer className="footer footer-2">
        <div className="icon-boxes-container">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-lg-3">
                <div className="icon-box icon-box-side">
                  <span className="icon-box-icon text-dark">
                    <i className="icon-rocket" />
                  </span>
                  <div className="icon-box-content">
                    <h3 className="icon-box-title">Free Shipping</h3>
                    {/* End .icon-box-title */}
                    <p>orders $50 or more</p>
                  </div>
                  {/* End .icon-box-content */}
                </div>
                {/* End .icon-box */}
              </div>
              {/* End .col-sm-6 col-lg-3 */}
              <div className="col-sm-6 col-lg-3">
                <div className="icon-box icon-box-side">
                  <span className="icon-box-icon text-dark">
                    <i className="icon-rotate-left" />
                  </span>
                  <div className="icon-box-content">
                    <h3 className="icon-box-title">Free Returns</h3>
                    {/* End .icon-box-title */}
                    <p>within 30 days</p>
                  </div>
                  {/* End .icon-box-content */}
                </div>
                {/* End .icon-box */}
              </div>
              {/* End .col-sm-6 col-lg-3 */}
              <div className="col-sm-6 col-lg-3">
                <div className="icon-box icon-box-side">
                  <span className="icon-box-icon text-dark">
                    <i className="icon-info-circle" />
                  </span>
                  <div className="icon-box-content">
                    <h3 className="icon-box-title">Get 20% Off 1 Item</h3>
                    {/* End .icon-box-title */}
                    <p>When you sign up</p>
                  </div>
                  {/* End .icon-box-content */}
                </div>
                {/* End .icon-box */}
              </div>
              {/* End .col-sm-6 col-lg-3 */}
              <div className="col-sm-6 col-lg-3">
                <div className="icon-box icon-box-side">
                  <span className="icon-box-icon text-dark">
                    <i className="icon-life-ring" />
                  </span>
                  <div className="icon-box-content">
                    <h3 className="icon-box-title">We Support</h3>
                    {/* End .icon-box-title */}
                    <p>24/7 amazing services</p>
                  </div>
                  {/* End .icon-box-content */}
                </div>
                {/* End .icon-box */}
              </div>
              {/* End .col-sm-6 col-lg-3 */}
            </div>
            {/* End .row */}
          </div>
          {/* End .container */}
        </div>
        {/* End .icon-boxes-container */}
        <div
          className="footer-newsletter bg-image"
          style={{ backgroundImage: "url(assets/images/backgrounds/bg-2.jpg)" }}
        >
          <div className="container">
            <div className="heading text-center">
              <h3 className="title">Get The Latest Deals</h3>
              {/* End .title */}
              <p className="title-desc">
                and receive <span>$20 coupon</span> for first shopping
              </p>
              {/* End .title-desc */}
            </div>
            {/* End .heading */}
            <div className="row">
              <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                <form action="#">
                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your Email Address"
                      aria-label="Email Adress"
                      aria-describedby="newsletter-btn"
                      required=""
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-primary"
                        type="submit"
                        id="newsletter-btn"
                      >
                        <span>Subscribe</span>
                        <i className="icon-long-arrow-right" />
                      </button>
                    </div>
                    {/* .End .input-group-append */}
                  </div>
                  {/* .End .input-group */}
                </form>
              </div>
              {/* End .col-sm-10 offset-sm-1 col-lg-6 offset-lg-3 */}
            </div>
            {/* End .row */}
          </div>
          {/* End .container */}
        </div>
        {/* End .footer-newsletter bg-image */}
        <div className="footer-middle">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-lg-6">
                <div className="widget widget-about">
                  <img
                    src="assets/images/demos/demo-2/logo.png"
                    className="footer-logo"
                    alt="Footer Logo"
                    width={105}
                    height={25}
                  />
                  <p>
                    Praesent dapibus, neque id cursus ucibus, tortor neque egestas
                    augue, eu vulputate magna eros eu erat. Aliquam erat volutpat.
                    Nam dui mi, tincidunt quis, accumsan porttitor, facilisis
                    luctus, metus.{" "}
                  </p>
                  <div className="widget-about-info">
                    <div className="row">
                      <div className="col-sm-6 col-md-4">
                        <span className="widget-about-title">
                          Got Question? Call us 24/7
                        </span>
                        <a href="tel:123456789">+0123 456 789</a>
                      </div>
                      {/* End .col-sm-6 */}
                      <div className="col-sm-6 col-md-8">
                        <span className="widget-about-title">Payment Method</span>
                        <figure className="footer-payments">
                          <img
                            src="assets/images/payments.png"
                            alt="Payment methods"
                            width={272}
                            height={20}
                          />
                        </figure>
                        {/* End .footer-payments */}
                      </div>
                      {/* End .col-sm-6 */}
                    </div>
                    {/* End .row */}
                  </div>
                  {/* End .widget-about-info */}
                </div>
                {/* End .widget about-widget */}
              </div>
              {/* End .col-sm-12 col-lg-3 */}
              <div className="col-sm-4 col-lg-2">
                <div className="widget">
                  <h4 className="widget-title">Information</h4>
                  {/* End .widget-title */}
                  <ul className="widget-list">
                    <li>
                      <a href="about.html">About Molla</a>
                    </li>
                    <li>
                      <a href="#">How to shop on Molla</a>
                    </li>
                    <li>
                      <a href="#">FAQ</a>
                    </li>
                    <li>
                      <a href="contact.html">Contact us</a>
                    </li>
                    <li>
                      <a href="login.html">Log in</a>
                    </li>
                  </ul>
                  {/* End .widget-list */}
                </div>
                {/* End .widget */}
              </div>
              {/* End .col-sm-4 col-lg-3 */}
              <div className="col-sm-4 col-lg-2">
                <div className="widget">
                  <h4 className="widget-title">Customer Service</h4>
                  {/* End .widget-title */}
                  <ul className="widget-list">
                    <li>
                      <a href="#">Payment Methods</a>
                    </li>
                    <li>
                      <a href="#">Money-back guarantee!</a>
                    </li>
                    <li>
                      <a href="#">Returns</a>
                    </li>
                    <li>
                      <a href="#">Shipping</a>
                    </li>
                    <li>
                      <a href="#">Terms and conditions</a>
                    </li>
                    <li>
                      <a href="#">Privacy Policy</a>
                    </li>
                  </ul>
                  {/* End .widget-list */}
                </div>
                {/* End .widget */}
              </div>
              {/* End .col-sm-4 col-lg-3 */}
              <div className="col-sm-4 col-lg-2">
                <div className="widget">
                  <h4 className="widget-title">My Account</h4>
                  {/* End .widget-title */}
                  <ul className="widget-list">
                    <li>
                      <a href="#">Sign In</a>
                    </li>
                    <li>
                      <a href="cart.html">View Cart</a>
                    </li>
                    <li>
                      <a href="#">My Wishlist</a>
                    </li>
                    <li>
                      <a href="#">Track My Order</a>
                    </li>
                    <li>
                      <a href="#">Help</a>
                    </li>
                  </ul>
                  {/* End .widget-list */}
                </div>
                {/* End .widget */}
              </div>
              {/* End .col-sm-64 col-lg-3 */}
            </div>
            {/* End .row */}
          </div>
          {/* End .container */}
        </div>
        {/* End .footer-middle */}
        <div className="footer-bottom">
          <div className="container">
            <p className="footer-copyright">
              Copyright © 2019 Molla Store. All Rights Reserved.
            </p>
            {/* End .footer-copyright */}
            <ul className="footer-menu">
              <li>
                <a href="#">Terms Of Use</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
            {/* End .footer-menu */}
            <div className="social-icons social-icons-color">
              <span className="social-label">Social Media</span>
              <a
                href="#"
                className="social-icon social-facebook"
                title="Facebook"
                target="_blank"
              >
                <i className="icon-facebook-f" />
              </a>
              <a
                href="#"
                className="social-icon social-twitter"
                title="Twitter"
                target="_blank"
              >
                <i className="icon-twitter" />
              </a>
              <a
                href="#"
                className="social-icon social-instagram"
                title="Instagram"
                target="_blank"
              >
                <i className="icon-instagram" />
              </a>
              <a
                href="#"
                className="social-icon social-youtube"
                title="Youtube"
                target="_blank"
              >
                <i className="icon-youtube" />
              </a>
              <a
                href="#"
                className="social-icon social-pinterest"
                title="Pinterest"
                target="_blank"
              >
                <i className="icon-pinterest" />
              </a>
            </div>
            {/* End .soial-icons */}
          </div>
          {/* End .container */}
        </div>
        {/* End .footer-bottom */}
      </footer>
  
    );
}

export default Footer;