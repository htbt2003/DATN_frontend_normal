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
                    <h3 className="icon-box-title">Miễn phí vận chuyển</h3>
                    {/* End .icon-box-title */}
                    <p>Đơn hàng 150.000Đ trở lên</p>
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
                    <h3 className="icon-box-title">Trả lại miễn phí</h3>
                    {/* End .icon-box-title */}
                    <p>Trong vòng 7 ngày</p>
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
                    <h3 className="icon-box-title">Được giảm giá 20% cho 1 mặt hàng</h3>
                    {/* End .icon-box-title */}
                    <p>Khi bạn đăng ký</p>
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
                    <h3 className="icon-box-title">Chúng tôi hỗ trợ</h3>
                    {/* End .icon-box-title */}
                    <p>Dịch vụ tuyệt vời 24/7</p>
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
              {/* <h3 className="title">Get The Latest Deals</h3> */}
              {/* End .title */}
              {/* <p className="title-desc">
                and receive <span>$20 coupon</span> for first shopping
              </p> */}
              {/* End .title-desc */}
            </div>
            {/* End .heading */}
            <div className="row">
              <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                {/* <form action="#">
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
                  </div>
                </form> */}
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
                  Trang phục bạn khoác lên người chính là cách để bạn giới thiệu với mọi người về cá tính sống của mình. Do đó, việc lựa chọn dòng sản phẩm chất lượng chính là cách để bạn thể hiện giá trị bản thân mình.
                  </p>
                  <div className="widget-about-info">
                    <div className="row">
                      <div className="col-sm-6 col-md-4">
                        <span className="widget-about-title">
                          Có câu hỏi? Gọi cho chúng tôi 24/7
                        </span>
                        <a href="tel:123456789">+0123 456 789</a>
                      </div>
                      {/* End .col-sm-6 */}
                      {/* <div className="col-sm-6 col-md-8">
                        <span className="widget-about-title">Phương thức thanh toán</span>
                        <figure className="footer-payments">
                          <img
                            src="assets/images/payments.png"
                            alt="Payment methods"
                            width={272}
                            height={20}
                          />
                        </figure>
                      </div> */}
                      {/* End .col-sm-6 */}
                    </div>
                    {/* End .row */}
                  </div>
                  {/* End .widget-about-info */}
                </div>
                {/* End .widget about-widget */}
              </div>
              {/* End .col-sm-12 col-lg-3 */}
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
            JunoTran được thành lập theo quyết định số 41Q8018660 do Sở KH&ĐT TPHCM cấp phép
            </p>
            {/* End .footer-copyright */}
            {/* <ul className="footer-menu">
              <li>
                <a href="#">Terms Of Use</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul> */}
            {/* End .footer-menu */}
            {/* <div className="social-icons social-icons-color">
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
            </div> */}
            {/* End .soial-icons */}
          </div>
          {/* End .container */}
        </div>
        {/* End .footer-bottom */}
      </footer>
  
    );
}

export default Footer;