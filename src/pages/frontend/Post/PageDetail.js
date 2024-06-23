import { useEffect, useState } from "react";
import PageServices from "../../../services/PageServices"
import { Link, useParams } from "react-router-dom";
import { urlImage } from "../../../config";

const PageDetail = () => {
    const [page, setPage] = useState([]);
    const { slug } = useParams();
    const fetchAPI = async () => {
        try {
            const result = await PageServices.getPageBySlug(slug)
            setPage(result.page)
        }
        catch (error) {
          console.log('wait...')
        }
      }
      useEffect(function () {
        fetchAPI()
      }, [slug])
    return (
<>
  <main className="main">
    <div
      className="page-header text-center"
      style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
    >
      <div className="container">
        <h1 className="page-title">
          Trang đơn<span>Giới thiệu</span>
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
          <li className="breadcrumb-item active">
            <a href="#">Giới thiệu</a>
          </li>
        </ol>
      </div>
      {/* End .container */}
    </nav>
    {/* End .breadcrumb-nav */}
    <div className="page-content pb-3">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <div className="about-text text-center mt-3">
              <h2 className="title text-center mb-2">{page.title}</h2>
              {/* End .title text-center mb-2 */}
              <div
                      dangerouslySetInnerHTML={{ __html: page.detail }}
                    />
              <p>
              </p>
              <img
                src={urlImage + "page/" + page.image}
                alt="signature"
                className="mx-auto mb-5"
              />
            </div>
            {/* End .about-text */}
          </div>
          {/* End .col-lg-10 offset-1 */}
        </div>
        {/* End .row */}
        <div className="row justify-content-center">
          <div className="col-lg-4 col-sm-6">
            <div className="icon-box icon-box-sm text-center">
              <span className="icon-box-icon">
                <i className="icon-puzzle-piece" />
              </span>
              <div className="icon-box-content">
                <h3 className="icon-box-title">Design Quality</h3>
                {/* End .icon-box-title */}
                <p>
                  Sed egestas, ante et vulputate volutpat, eros pede semper est,
                  vitae luctus metus libero <br />
                  eu augue.
                </p>
              </div>
              {/* End .icon-box-content */}
            </div>
            {/* End .icon-box */}
          </div>
          {/* End .col-lg-4 col-sm-6 */}
          <div className="col-lg-4 col-sm-6">
            <div className="icon-box icon-box-sm text-center">
              <span className="icon-box-icon">
                <i className="icon-life-ring" />
              </span>
              <div className="icon-box-content">
                <h3 className="icon-box-title">Professional Support</h3>
                {/* End .icon-box-title */}
                <p>
                  Praesent dapibus, neque id cursus faucibus, <br />
                  tortor neque egestas augue, eu vulputate <br />
                  magna eros eu erat.{" "}
                </p>
              </div>
              {/* End .icon-box-content */}
            </div>
            {/* End .icon-box */}
          </div>
          {/* End .col-lg-4 col-sm-6 */}
          <div className="col-lg-4 col-sm-6">
            <div className="icon-box icon-box-sm text-center">
              <span className="icon-box-icon">
                <i className="icon-heart-o" />
              </span>
              <div className="icon-box-content">
                <h3 className="icon-box-title">Made With Love</h3>
                {/* End .icon-box-title */}
                <p>
                  Pellentesque a diam sit amet mi ullamcorper <br />
                  vehicula. Nullam quis massa sit amet <br />
                  nibh viverra malesuada.
                </p>
              </div>
              {/* End .icon-box-content */}
            </div>
            {/* End .icon-box */}
          </div>
          {/* End .col-lg-4 col-sm-6 */}
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}
      <div className="mb-2" />
      {/* End .mb-2 */}
      <div
        className="bg-image pt-7 pb-5 pt-md-12 pb-md-9"
        style={{ backgroundImage: "url(assets/images/backgrounds/bg-4.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-6 col-md-3">
              <div className="count-container text-center">
                <div className="count-wrapper text-white">
                  <span
                    className="count"
                    data-from={0}
                    data-to={40}
                    data-speed={3000}
                    data-refresh-interval={50}
                  >
                    0
                  </span>
                  k+
                </div>
                {/* End .count-wrapper */}
                <h3 className="count-title text-white">Happy Customer</h3>
                {/* End .count-title */}
              </div>
              {/* End .count-container */}
            </div>
            {/* End .col-6 col-md-3 */}
            <div className="col-6 col-md-3">
              <div className="count-container text-center">
                <div className="count-wrapper text-white">
                  <span
                    className="count"
                    data-from={0}
                    data-to={20}
                    data-speed={3000}
                    data-refresh-interval={50}
                  >
                    0
                  </span>
                  +
                </div>
                {/* End .count-wrapper */}
                <h3 className="count-title text-white">Years in Business</h3>
                {/* End .count-title */}
              </div>
              {/* End .count-container */}
            </div>
            {/* End .col-6 col-md-3 */}
            <div className="col-6 col-md-3">
              <div className="count-container text-center">
                <div className="count-wrapper text-white">
                  <span
                    className="count"
                    data-from={0}
                    data-to={95}
                    data-speed={3000}
                    data-refresh-interval={50}
                  >
                    0
                  </span>
                  %
                </div>
                {/* End .count-wrapper */}
                <h3 className="count-title text-white">Return Clients</h3>
                {/* End .count-title */}
              </div>
              {/* End .count-container */}
            </div>
            {/* End .col-6 col-md-3 */}
            <div className="col-6 col-md-3">
              <div className="count-container text-center">
                <div className="count-wrapper text-white">
                  <span
                    className="count"
                    data-from={0}
                    data-to={15}
                    data-speed={3000}
                    data-refresh-interval={50}
                  >
                    0
                  </span>
                </div>
                {/* End .count-wrapper */}
                <h3 className="count-title text-white">Awards Won</h3>
                {/* End .count-title */}
              </div>
              {/* End .count-container */}
            </div>
            {/* End .col-6 col-md-3 */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </div>
      {/* End .bg-image pt-8 pb-8 */}
      <div className="bg-light-2 pt-6 pb-7 mb-6">
        <div className="container">
          <h2 className="title text-center mb-4">Meet Our Team</h2>
          {/* End .title text-center mb-2 */}
          <div className="row">
            <div className="col-sm-6 col-lg-3">
              <div className="member member-2 text-center">
                <figure className="member-media">
                  <img
                    src="assets/images/team/about-2/member-1.jpg"
                    alt="member photo"
                  />
                  <figcaption className="member-overlay">
                    <div className="social-icons social-icons-simple">
                      <a
                        href="#"
                        className="social-icon"
                        title="Facebook"
                        target="_blank"
                      >
                        <i className="icon-facebook-f" />
                      </a>
                      <a
                        href="#"
                        className="social-icon"
                        title="Twitter"
                        target="_blank"
                      >
                        <i className="icon-twitter" />
                      </a>
                      <a
                        href="#"
                        className="social-icon"
                        title="Instagram"
                        target="_blank"
                      >
                        <i className="icon-instagram" />
                      </a>
                    </div>
                    {/* End .soial-icons */}
                  </figcaption>
                  {/* End .member-overlay */}
                </figure>
                {/* End .member-media */}
                <div className="member-content">
                  <h3 className="member-title">
                    Samanta Grey<span>Founder &amp; CEO</span>
                  </h3>
                  {/* End .member-title */}
                </div>
                {/* End .member-content */}
              </div>
              {/* End .member */}
            </div>
            {/* End .col-lg-3 */}
            <div className="col-sm-6 col-lg-3">
              <div className="member member-2 text-center">
                <figure className="member-media">
                  <img
                    src="assets/images/team/about-2/member-2.jpg"
                    alt="member photo"
                  />
                  <figcaption className="member-overlay">
                    <div className="social-icons social-icons-simple">
                      <a
                        href="#"
                        className="social-icon"
                        title="Facebook"
                        target="_blank"
                      >
                        <i className="icon-facebook-f" />
                      </a>
                      <a
                        href="#"
                        className="social-icon"
                        title="Twitter"
                        target="_blank"
                      >
                        <i className="icon-twitter" />
                      </a>
                      <a
                        href="#"
                        className="social-icon"
                        title="Instagram"
                        target="_blank"
                      >
                        <i className="icon-instagram" />
                      </a>
                    </div>
                    {/* End .soial-icons */}
                  </figcaption>
                  {/* End .member-overlay */}
                </figure>
                {/* End .member-media */}
                <div className="member-content">
                  <h3 className="member-title">
                    Bruce Sutton<span>Sales &amp; Marketing Manager</span>
                  </h3>
                  {/* End .member-title */}
                </div>
                {/* End .member-content */}
              </div>
              {/* End .member */}
            </div>
            {/* End .col-lg-3 */}
            <div className="col-sm-6 col-lg-3">
              <div className="member member-2 text-center">
                <figure className="member-media">
                  <img
                    src="assets/images/team/about-2/member-3.jpg"
                    alt="member photo"
                  />
                  <figcaption className="member-overlay">
                    <div className="social-icons social-icons-simple">
                      <a
                        href="#"
                        className="social-icon"
                        title="Facebook"
                        target="_blank"
                      >
                        <i className="icon-facebook-f" />
                      </a>
                      <a
                        href="#"
                        className="social-icon"
                        title="Twitter"
                        target="_blank"
                      >
                        <i className="icon-twitter" />
                      </a>
                      <a
                        href="#"
                        className="social-icon"
                        title="Instagram"
                        target="_blank"
                      >
                        <i className="icon-instagram" />
                      </a>
                    </div>
                    {/* End .soial-icons */}
                  </figcaption>
                  {/* End .member-overlay */}
                </figure>
                {/* End .member-media */}
                <div className="member-content">
                  <h3 className="member-title">
                    Janet Joy<span>Product Manager</span>
                  </h3>
                  {/* End .member-title */}
                </div>
                {/* End .member-content */}
              </div>
              {/* End .member */}
            </div>
            {/* End .col-lg-3 */}
            <div className="col-sm-6 col-lg-3">
              <div className="member member-2 text-center">
                <figure className="member-media">
                  <img
                    src="assets/images/team/about-2/member-4.jpg"
                    alt="member photo"
                  />
                  <figcaption className="member-overlay">
                    <div className="social-icons social-icons-simple">
                      <a
                        href="#"
                        className="social-icon"
                        title="Facebook"
                        target="_blank"
                      >
                        <i className="icon-facebook-f" />
                      </a>
                      <a
                        href="#"
                        className="social-icon"
                        title="Twitter"
                        target="_blank"
                      >
                        <i className="icon-twitter" />
                      </a>
                      <a
                        href="#"
                        className="social-icon"
                        title="Instagram"
                        target="_blank"
                      >
                        <i className="icon-instagram" />
                      </a>
                    </div>
                    {/* End .soial-icons */}
                  </figcaption>
                  {/* End .member-overlay */}
                </figure>
                {/* End .member-media */}
                <div className="member-content">
                  <h3 className="member-title">
                    Mark Pocket<span>Product Manager</span>
                  </h3>
                  {/* End .member-title */}
                </div>
                {/* End .member-content */}
              </div>
              {/* End .member */}
            </div>
            {/* End .col-lg-3 */}
            <div className="col-sm-6 col-lg-3">
              <div className="member member-2 text-center">
                <figure className="member-media">
                  <img
                    src="assets/images/team/about-2/member-5.jpg"
                    alt="member photo"
                  />
                  <figcaption className="member-overlay">
                    <div className="social-icons social-icons-simple">
                      <a
                        href="#"
                        className="social-icon"
                        title="Facebook"
                        target="_blank"
                      >
                        <i className="icon-facebook-f" />
                      </a>
                      <a
                        href="#"
                        className="social-icon"
                        title="Twitter"
                        target="_blank"
                      >
                        <i className="icon-twitter" />
                      </a>
                      <a
                        href="#"
                        className="social-icon"
                        title="Instagram"
                        target="_blank"
                      >
                        <i className="icon-instagram" />
                      </a>
                    </div>
                    {/* End .soial-icons */}
                  </figcaption>
                  {/* End .member-overlay */}
                </figure>
                {/* End .member-media */}
                <div className="member-content">
                  <h3 className="member-title">
                    Damion Blue<span>Sales &amp; Marketing Manager</span>
                  </h3>
                  {/* End .member-title */}
                </div>
                {/* End .member-content */}
              </div>
              {/* End .member */}
            </div>
            {/* End .col-lg-3 */}
            <div className="col-sm-6 col-lg-3">
              <div className="member member-2 text-center">
                <figure className="member-media">
                  <img
                    src="assets/images/team/about-2/member-6.jpg"
                    alt="member photo"
                  />
                  <figcaption className="member-overlay">
                    <div className="social-icons social-icons-simple">
                      <a
                        href="#"
                        className="social-icon"
                        title="Facebook"
                        target="_blank"
                      >
                        <i className="icon-facebook-f" />
                      </a>
                      <a
                        href="#"
                        className="social-icon"
                        title="Twitter"
                        target="_blank"
                      >
                        <i className="icon-twitter" />
                      </a>
                      <a
                        href="#"
                        className="social-icon"
                        title="Instagram"
                        target="_blank"
                      >
                        <i className="icon-instagram" />
                      </a>
                    </div>
                    {/* End .soial-icons */}
                  </figcaption>
                  {/* End .member-overlay */}
                </figure>
                {/* End .member-media */}
                <div className="member-content">
                  <h3 className="member-title">
                    Lenard Smith<span>Product Manager</span>
                  </h3>
                  {/* End .member-title */}
                </div>
                {/* End .member-content */}
              </div>
              {/* End .member */}
            </div>
            {/* End .col-lg-3 */}
            <div className="col-sm-6 col-lg-3">
              <div className="member member-2 text-center">
                <figure className="member-media">
                  <img
                    src="assets/images/team/about-2/member-7.jpg"
                    alt="member photo"
                  />
                  <figcaption className="member-overlay">
                    <div className="social-icons social-icons-simple">
                      <a
                        href="#"
                        className="social-icon"
                        title="Facebook"
                        target="_blank"
                      >
                        <i className="icon-facebook-f" />
                      </a>
                      <a
                        href="#"
                        className="social-icon"
                        title="Twitter"
                        target="_blank"
                      >
                        <i className="icon-twitter" />
                      </a>
                      <a
                        href="#"
                        className="social-icon"
                        title="Instagram"
                        target="_blank"
                      >
                        <i className="icon-instagram" />
                      </a>
                    </div>
                    {/* End .soial-icons */}
                  </figcaption>
                  {/* End .member-overlay */}
                </figure>
                {/* End .member-media */}
                <div className="member-content">
                  <h3 className="member-title">
                    Rachel Green<span>Product Manager</span>
                  </h3>
                  {/* End .member-title */}
                </div>
                {/* End .member-content */}
              </div>
              {/* End .member */}
            </div>
            {/* End .col-lg-3 */}
            <div className="col-sm-6 col-lg-3">
              <div className="member member-2 text-center">
                <figure className="member-media">
                  <img
                    src="assets/images/team/about-2/member-8.jpg"
                    alt="member photo"
                  />
                  <figcaption className="member-overlay">
                    <div className="social-icons social-icons-simple">
                      <a
                        href="#"
                        className="social-icon"
                        title="Facebook"
                        target="_blank"
                      >
                        <i className="icon-facebook-f" />
                      </a>
                      <a
                        href="#"
                        className="social-icon"
                        title="Twitter"
                        target="_blank"
                      >
                        <i className="icon-twitter" />
                      </a>
                      <a
                        href="#"
                        className="social-icon"
                        title="Instagram"
                        target="_blank"
                      >
                        <i className="icon-instagram" />
                      </a>
                    </div>
                    {/* End .soial-icons */}
                  </figcaption>
                  {/* End .member-overlay */}
                </figure>
                {/* End .member-media */}
                <div className="member-content">
                  <h3 className="member-title">
                    David Doe<span>Product Manager</span>
                  </h3>
                  {/* End .member-title */}
                </div>
                {/* End .member-content */}
              </div>
              {/* End .member */}
            </div>
            {/* End .col-lg-3 */}
          </div>
          {/* End .row */}
          <div className="text-center mt-3">
            <a
              href="blog.html"
              className="btn btn-sm btn-minwidth-lg btn-outline-primary-2"
            >
              <span>LETS START WORK</span>
              <i className="icon-long-arrow-right" />
            </a>
          </div>
          {/* End .text-center */}
        </div>
        {/* End .container */}
      </div>
      {/* End .bg-light-2 pt-6 pb-6 */}
      <div className="container">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <div className="brands-text text-center mx-auto mb-6">
              <h2 className="title">
                The world's premium design brands in one destination.
              </h2>
              {/* End .title */}
              <p>
                Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi
                neque, aliquet vel, dapibus id, mattis vel, nis
              </p>
            </div>
            {/* End .brands-text */}
            <div className="brands-display">
              <div className="row justify-content-center">
                <div className="col-6 col-sm-4 col-md-3">
                  <a href="#" className="brand">
                    <img src="assets/images/brands/1.png" alt="Brand Name" />
                  </a>
                </div>
                {/* End .col-md-3 */}
                <div className="col-6 col-sm-4 col-md-3">
                  <a href="#" className="brand">
                    <img src="assets/images/brands/2.png" alt="Brand Name" />
                  </a>
                </div>
                {/* End .col-md-3 */}
                <div className="col-6 col-sm-4 col-md-3">
                  <a href="#" className="brand">
                    <img src="assets/images/brands/3.png" alt="Brand Name" />
                  </a>
                </div>
                {/* End .col-md-3 */}
                <div className="col-6 col-sm-4 col-md-3">
                  <a href="#" className="brand">
                    <img src="assets/images/brands/7.png" alt="Brand Name" />
                  </a>
                </div>
                {/* End .col-md-3 */}
                <div className="col-6 col-sm-4 col-md-3">
                  <a href="#" className="brand">
                    <img src="assets/images/brands/4.png" alt="Brand Name" />
                  </a>
                </div>
                {/* End .col-md-3 */}
                <div className="col-6 col-sm-4 col-md-3">
                  <a href="#" className="brand">
                    <img src="assets/images/brands/5.png" alt="Brand Name" />
                  </a>
                </div>
                {/* End .col-md-3 */}
                <div className="col-6 col-sm-4 col-md-3">
                  <a href="#" className="brand">
                    <img src="assets/images/brands/6.png" alt="Brand Name" />
                  </a>
                </div>
                {/* End .col-md-3 */}
                <div className="col-6 col-sm-4 col-md-3">
                  <a href="#" className="brand">
                    <img src="assets/images/brands/9.png" alt="Brand Name" />
                  </a>
                </div>
                {/* End .col-md-3 */}
              </div>
              {/* End .row */}
            </div>
            {/* End .brands-display */}
          </div>
          {/* End .col-lg-10 offset-lg-1 */}
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}
    </div>
    {/* End .page-content */}
  </main>
  {/* End .main */}
</>

    );
}

export default PageDetail;