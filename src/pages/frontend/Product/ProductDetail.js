import { useEffect, useRef, useState } from "react";
import ProductServices from '../../../services/ProductServices';
import { Link, useParams } from "react-router-dom";
import { urlImage } from "../../../config";
import ProductItem03 from "../../../components/ProductItem03";
import { useDispatch } from 'react-redux';
import React from 'react'
import ProductReview from "./ProductReview.js";
import { AddCart } from '../../../redux/cartSlice';
import swal from "sweetalert";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import ReviewServies from "../../../services/ReviewServies.js";
function ProductDetail() {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState([]);
  const sliderRef = useRef(null);
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [product, setProduct] = useState([]);
  const [product_other, setProductOther] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [variants, setVariants] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reload, setReload] = useState();
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [addcart, setaddcart] = useState([]);
  useEffect(() => {
    document.title = product.name || 'Product Detail';
  }, [product]);
  const fetchAPI = async () => {
    try {
      const response = await ProductServices.getProductBySlug(slug)
      setProduct(response.product)
      setImages(response.product.images)
      setCurrentImage(response.product.images[0].image)
      setAttributes(response.product.productattributes)
      setVariants(response.product.variants)
      setProductOther(response.product_other)
      const result = await ReviewServies.getReviewProduct(response.product.id);
      setReviews(result.reviews);
    }
    catch (error) {
      console.log(error)
    }
  };
  useEffect(function () {
    // window.scroll(0, 0);
    fetchAPI()
  }, [slug, reload])
  const settings = {
    vertical: true,
    verticalSwiping: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
    afterChange: (index) => setCurrentImage(images[index].image),
  };
  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };
  //Chọn giá trị thuộc tính sản phẩm
  const handleAttributeChange = (attributeId, valueId, image) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [attributeId]: valueId
    }));
    if (image.length > 0) {
      setCurrentImage(image)
    }
  };
  console.log( product.detail)

  //lấy ra variant từ các giá trị thuộc tính đã chọn---------------------------------
  const findSelectedVariant = (variants, selectedAttributes) => {
    for (const variant of variants) {
      const variantValues = variant.variant_values.map(av => av.product_attribute_value_id);
      const selectedValues = Object.values(selectedAttributes);
      // Kiểm tra xem các attribute_values của variant có chứa selectedAttributes không
      const result = (variantValues.length === selectedValues.length &&
        variantValues.every(value => selectedValues.includes(value)));
      if (result) {
        return variant;
      }
    }
    return null;
  };
  useEffect(() => {
    const selectedVariant = findSelectedVariant(variants, selectedAttributes);
    if (variants.length > 0) {
      if (selectedVariant) {
        setaddcart(selectedVariant);
      } else {
        setaddcart(null);
      }
    } else {
      setaddcart(product);
    }
  }, [selectedAttributes, variants, product]);
  const handleAddCart = () => {
    if(variants.length>0 && !addcart){
      swal("Cảnh báo", "Vui lòng đưa ra lựa chọn", "warning");
    }
    else{
      dispatch(AddCart(addcart));
      swal("Thành công", "Thêm vào giỏ hàng thành công", "success");  
    }
  };
  ///------------------------------------------------------------------------------------
  return (
    <>
      <main className="main">
        <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
          <div className="container d-flex align-items-center">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Products</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Default
              </li>
            </ol>
            <nav className="product-pager ml-auto" aria-label="Product">
              <a
                className="product-pager-link product-pager-prev"
                href="#"
                aria-label="Previous"
                tabIndex={-1}
              >
                <i className="icon-angle-left" />
                <span>Prev</span>
              </a>
              <a
                className="product-pager-link product-pager-next"
                href="#"
                aria-label="Next"
                tabIndex={-1}
              >
                <span>Next</span>
                <i className="icon-angle-right" />
              </a>
            </nav>
            {/* End .pager-nav */}
          </div>
          {/* End .container */}
        </nav>
        {/* End .breadcrumb-nav */}
        <div className="page-content">
          <div className="container">
            <div className="product-details-top">
              <div className="row">
                <div className="col-md-6">
                  <div className="product-gallery product-gallery-vertical">
                    <div className="row">
                      <figure className="product-main-image">
                        <img
                          style={{ height: "625px" }}
                          src={urlImage + "pro_image/" + currentImage} alt="Preview"
                        // src={urlImage + "product/" + product.image}
                        />
                        {/* <a
                          href="#"
                          id="btn-product-gallery"
                          className="btn-product-gallery"
                        >
                          <i className="icon-arrows" />
                        </a> */}
                      </figure>
                      {/* End .product-main-image */}
                      <div
                        id="product-zoom-gallery" className="product-image-gallery gallery-controls"
                      >
                        <button onClick={handlePrev} className="gallery-control-prev btn-outline-primary bg-white">
                          <FaChevronUp />
                        </button>
                        <div className="" >
                          <Slider {...settings} className="" ref={sliderRef}>
                            {images.map((image, index) => (
                              <div key={index} className="">
                                <a
                                  className=" active"
                                >
                                  <img
                                    src={urlImage + "pro_image/" + image.image}
                                    alt="product side"
                                  />
                                </a>
                              </div>
                            ))}
                          </Slider>

                        </div>
                        <button onClick={handleNext} style={{ background: "#cbcdce" }} className="gallery-control-next  btn-outline-primary bg-white">
                          <FaChevronDown />
                        </button>
                      </div>
                      {/* End .product-image-gallery */}
                    </div>
                    {/* End .row */}
                  </div>
                  {/* End .product-gallery */}
                </div>
                {/* End .col-md-6 */}
                <div className="col-md-6">
                  <div className="product-details">
                    <h1 className="product-title">
                      {product.name}
                    </h1>
                    {/* End .product-title */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div className="ratings-val" style={{ width: "80%" }} />
                        {/* End .ratings-val */}
                      </div>
                      {/* End .ratings */}
                      <a
                        className="ratings-text"
                        href="#product-review-link"
                        id="review-link"
                      >
                        {/* ( 2 Reviews ) */}
                      </a>
                    </div>
                    {/* End .rating-container */}
                    {
                      product.price_sale != null ?
                        (
                          <div className="product-price">
                            <span className="new-price">{product.price_sale}đ</span>
                            <span className="old-price">Was {product.price}đ</span>
                          </div>
                        )
                        :
                        (
                          <div className="product-price">
                            <span className="new-price">{product.price}đ</span>
                          </div>
                        )
                    }
                    {/* End .product-price */}
                    <div className="product-content">
                      <p>
                        {product.metadesc}{" "}
                      </p>
                    </div>
                    {/* End .product-content */}
                    {attributes.map((attribute, index) => (
                      <div className="details-filter-row details-row-size" key={index}>
                        <label>{attribute.attribute.name}</label>
                        <div className="product-nav product-nav-thumbs">
                          {attribute.product_attribute_values.map((item, index) => (
                            <div key={index} className="gallery-thumbnail">
                              {
                                !(item.image) ? (
                                  <Link onClick={() => handleAttributeChange(attribute.id, item.id, item.image)} 
                                  className="active mr-2" 
                                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: selectedAttributes[attribute.id] === item.id ? '#fff' : '#a6c76c',
                                    background: selectedAttributes[attribute.id] === item.id ? '#a6c76c' : 'transparent', }}>
                                    {item.attribute_value.name}
                                  </Link>
                                ) : (
                                  <Link className="active">
                                    <img
                                      src={urlImage + "pro_image/" + item.image}
                                      alt="product desc"
                                    />
                                  </Link>
                                )
                              }
                            </div>
                          ))}

                          {/* <a href="#" className="active">
                            <img
                              src="assets/images/products/single/1-thumb.jpg"
                              alt="product desc"
                            />
                          </a>
                          <a href="#">
                            <img
                              src="assets/images/products/single/2-thumb.jpg"
                              alt="product desc"
                            />
                          </a> */}
                        </div>
                        {/* End .product-nav */}
                      </div>

                    ))}
                    {/* <div className="details-filter-row details-row-size">
                      <label>Color:</label>
                      <div className="product-nav product-nav-thumbs">
                        <a href="#" className="active">
                          <img
                            src="assets/images/products/single/1-thumb.jpg"
                            alt="product desc"
                          />
                        </a>
                        <a href="#">
                          <img
                            src="assets/images/products/single/2-thumb.jpg"
                            alt="product desc"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="details-filter-row details-row-size">
                      <label htmlFor="size">Size:</label>
                      <div className="select-custom">
                        <select name="size" id="size" className="form-control">
                          <option value="#" selected="selected">
                            Select a size
                          </option>
                          <option value="s">Small</option>
                          <option value="m">Medium</option>
                          <option value="l">Large</option>
                          <option value="xl">Extra Large</option>
                        </select>
                      </div>
                      <a href="#" className="size-guide">
                        <i className="icon-th-list" />
                        size guide
                      </a>
                    </div> */}
                    {/* End .details-filter-row */}
                    {/* End .details-filter-row */}
                    <div className="product-details-action">
                      <div class="row">
                        <div class="col-md-2">
                          <label for="qty" class="col-form-label">Qty:</label>
                        </div>
                        <div class="col-md-6">
                          <div class="input-group">
                            <input type="number" id="qty" class="form-control" min="1" max="10" step="1" data-decimals="0" value="1" />
                          </div>
                        </div>
                      </div>
                      <div className="btn-cart"
                        onClick={handleAddCart}
                      >
                        <span>Thêm vào giỏ hàng</span>
                      </div>
                      {/* End .details-action-wrapper */}
                    </div>
                    {/* End .product-details-action */}
                    <div className="product-details-footer">
                      <div className="product-cat">
                        <span>Category:</span>
                        <a href="#">Women</a>,<a href="#">Dresses</a>,
                        <a href="#">Yellow</a>
                      </div>
                      {/* End .product-cat */}
                      <div className="social-icons social-icons-sm">
                        <span className="social-label">Share:</span>
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
                        <a
                          href="#"
                          className="social-icon"
                          title="Pinterest"
                          target="_blank"
                        >
                          <i className="icon-pinterest" />
                        </a>
                      </div>
                    </div>
                    {/* End .product-details-footer */}
                  </div>
                  {/* End .product-details */}
                </div>
                {/* End .col-md-6 */}
              </div>
              {/* End .row */}
            </div>
            {/* End .product-details-top */}
            <div className="product-details-tab">
              <ul className="nav nav-pills justify-content-center" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="product-desc-link"
                    data-toggle="tab"
                    href="#product-desc-tab"
                    role="tab"
                    aria-controls="product-desc-tab"
                    aria-selected="true"
                  >
                    Chi tiết sản phẩm
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="product-review-link"
                    data-toggle="tab"
                    href="#product-review-tab"
                    role="tab"
                    aria-controls="product-review-tab"
                    aria-selected="false"
                  >
                    Reviews
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div
                  className="tab-pane fade show active"
                  id="product-desc-tab"
                  role="tabpanel"
                // aria-labelledby="product-desc-link"
                >
                  <div className="product-desc-content">
                    <h3>Thông tin sản phẩm</h3>
                    <div
                      dangerouslySetInnerHTML={{ __html: product.detail }}
                    />
                  </div>
                  {/* End .product-desc-content */}
                </div>
                {/* .End .tab-pane */}
                <div
                  className="tab-pane fade"
                  id="product-review-tab"
                  role="tabpanel"
                // aria-labelledby="product-review-link"
                >
                  <ProductReview reviews={reviews} setReload={setReload} product_id={product.id} />
                  {/* End .reviews */}
                </div>
                {/* .End .tab-pane */}
              </div>
              {/* End .tab-content */}
            </div>

            {/* End .product-details-tab */}
            <h2 className="title text-center mb-4">Có thể bạn cũng thích</h2>
            {/* End .title text-center */}
            <div className="products">
              <div className="row justify-content-center">
                {
                  (product_other && product_other.length > 0 && product_other.map(function (product, index) {
                    return (
                      <ProductItem03 product={product} key={index} />
                    );
                  }))
                }
              </div>
              {/* End .row */}
            </div>

            {/* End .owl-carousel */}
          </div>
          {/* End .container */}
        </div>
        {/* End .page-content */}
      </main>
      {/* End .main */}
    </>
  );
}

export default ProductDetail
