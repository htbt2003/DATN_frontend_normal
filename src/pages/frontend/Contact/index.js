import ContactServices from "../../../services/ContactServices"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Contact() {
    const navigator = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [content, setContent] = useState("");
    const [status, setStatus] = useState(1);

    document.title = "Liên hệ"
    function ContactStore(event) {
        event.preventDefault();//không load lại trang
        const contact = {
            name: name,
            email: email,
            content: content,
            phone: phone,
            status: status,
            user_id: 4,
            title: 'tieu de',
            replay_id: 1,
          }
        ContactServices.create(contact)
            .then(function (result) {
                alert(result.message);
                navigator("/lien-he", { replace: true })
            });
    }
    return (
<>
  <main className="main">
    <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
      <div className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="index.html">Trang chủ</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Của hàng</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Liên hệ
          </li>
        </ol>
      </div>
      {/* End .container */}
    </nav>
    {/* End .breadcrumb-nav */}
    <div className="container">
      {/* <div
        className="page-header page-header-big text-center"
        style={{
          backgroundImage: 'url("assets/images/contact-header-bg.jpg")'
        }}
      >
        <h1 className="page-title text-white">
          Contact us<span className="text-white">keep in touch with us</span>
        </h1>
      </div> */}
    </div>
    {/* End .container */}
    <div className="page-content pb-0">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mb-2 mb-lg-0">
            <h2 className="title mb-1">Thông tin liên hệ</h2>
            {/* End .title mb-2 */}
            <p className="mb-3">
            Trang phục bạn khoác lên người chính là cách để bạn giới thiệu với mọi người về cá tính sống của mình. Do đó, việc lựa chọn dòng sản phẩm chất lượng chính là cách để bạn thể hiện giá trị bản thân mình.
            </p>
            <div className="row">
              <div className="col-sm-7">
                <div className="contact-info">
                  <h3>Văn phòng</h3>
                  <ul className="contact-list">
                    <li>
                      <i className="icon-map-marker" />
                      936 Kha Vạn Cân, Trường Thọ, Thủ Đức, Hồ Chí Minh
                    </li>
                    <li>
                      <i className="icon-phone" />
                      <a href="tel:#">+92 423 567</a>
                    </li>
                    <li>
                      <i className="icon-envelope" />
                      <a href="mailto:#">junotran@gmail.com</a>
                    </li>
                  </ul>
                  {/* End .contact-list */}
                </div>
                {/* End .contact-info */}
              </div>
              {/* End .col-sm-7 */}
              <div className="col-sm-5">
                <div className="contact-info">
                  <h3>Thời gian</h3>
                  <ul className="contact-list">
                    <li>
                      <i className="icon-clock-o" />
                      <span className="text-dark">Thứ 2-Thứ 7</span> <br />
                      8H – 22H
                    </li>
                    <li>
                      <i className="icon-calendar" />
                      <span className="text-dark">Chủ nhật</span> <br />
                      8H – 12H
                    </li>
                  </ul>
                  {/* End .contact-list */}
                </div>
                {/* End .contact-info */}
              </div>
              {/* End .col-sm-5 */}
            </div>
            {/* End .row */}
          </div>
          {/* End .col-lg-6 */}
          <div className="col-lg-6">
            <h2 className="title mb-1">Bạn có câu hỏi nào không?</h2>
            {/* End .title mb-2 */}
            <p className="mb-2">
                Sử dụng mẫu dưới đây để liên hệ với nhóm bán hàng
            </p>
            <form onSubmit={ContactStore} method="post" className="contact-form mb-3">
              <div className="row">
                <div className="col-sm-6">
                  <label htmlFor="cname" className="sr-only">
                    Tên
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cname"
                    placeholder="Tên *"
                    required=""
                    onChange={(e)=> setName(e.target.value)}
                  />
                </div>
                {/* End .col-sm-6 */}
                <div className="col-sm-6">
                  <label htmlFor="cemail" className="sr-only">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="cemail"
                    placeholder="Email *"
                    required=""
                    onChange={(e)=> setEmail(e.target.value)}
                  />
                </div>
                {/* End .col-sm-6 */}
              </div>
              {/* End .row */}
              <div className="row">
                <div className="col-sm-6">
                  <label htmlFor="cphone" className="sr-only">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="cphone"
                    placeholder="Số điện thoại"
                    onChange={(e)=> setPhone(e.target.value)}
                  />
                </div>
                {/* End .col-sm-6 */}
                {/* <div className="col-sm-6">
                  <label htmlFor="csubject" className="sr-only">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="csubject"
                    placeholder="Subject"
                  />
                </div> */}
                {/* End .col-sm-6 */}
              </div>
              {/* End .row */}
              <label htmlFor="cmessage" className="sr-only">
                Nội dung
              </label>
              <textarea
                className="form-control"
                cols={30}
                rows={4}
                id="cmessage"
                required=""
                placeholder="Nội dung *"
                defaultValue={""}
                onChange={(e)=> setContent(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-outline-primary-2 btn-minwidth-sm"
              >
                <span>Gửi</span>
                <i className="icon-long-arrow-right" />
              </button>
            </form>
            {/* End .contact-form */}
          </div>
          {/* End .col-lg-6 */}
        </div>
        {/* End .row */}
        {/* End .stores */}
      </div>
      {/* End .container */}
      
      <div id="map" style={{ position: "relative", overflow: "hidden" }}>
  <div
    style={{
      height: "100%",
      width: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      backgroundColor: "rgb(229, 227, 223)"
    }}
  >
    <div className="gm-err-container">
      <div className="gm-err-content">
        <div className="gm-err-icon">
        <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.747833361371!2d106.77174587437354!3d10.830599689321543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752701b009c189%3A0x6e0129c1f2cf0b67!2zMjAgVMSDbmcgTmjGoW4gUGjDuiwgUGjGsOG7m2MgTG9uZyBCLCBRdeG6rW4gOSwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oIDcwMDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1712291708878!5m2!1svi!2s"
        // width={100}
        height={495}
        style={{ border: 0, width: "100%",}}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        />
        </div>
        <div className="gm-err-title">Oops! Something went wrong.</div>
        <div className="gm-err-message">
          This page didn't load Google Maps correctly. See the JavaScript
          console for technical details.
        </div>
      </div>
    </div>
  </div>
</div>

      {/* <div id="map" /> */}
      {/* End #map */}
    </div>
    {/* End .page-content */}
  </main>
  {/* End .main */}
</>
    );
}

export default Contact;