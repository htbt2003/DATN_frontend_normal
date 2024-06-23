import { FcNext } from 'react-icons/fc';
import { urlImage } from '../config';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import React from 'react'

function ProductItem01(props) {
  const dispatch = useDispatch();
    return ( 
<>
  <div className="product product-11 text-center">
    <figure className="product-media">
      <span className="product-label label-circle label-sale">Sale</span>
      <Link to={"/chi-tiet-san-pham/" + props.product.slug}>
        <img
          src={urlImage + "product/" + props.product.image}
          alt="Product image"
          className="product-image"
        />
        {/* <img
          src="assets/images/demos/demo-2/products/product-4-2.jpg"
          alt="Product image"
          className="product-image-hover"
        /> */}
      </Link>
      <div className="product-action-vertical">
        <Link href="#" className="btn-product-icon btn-wishlist">
          <span>Thêm vào yêu thích</span>
        </Link>
      </div>
      {/* End .product-action-vertical */}
    </figure>
    {/* End .product-media */}
    <div className="product-body">
      <h3 className="product-title">
        <Link href="product.html">{props.product.name}</Link>
      </h3>
      {/* End .product-title */}
      {
            props.product.price_sale!=null ?
            (
              <div className="product-price">
                <span className="new-price">{props.product.price_sale}đ</span>
                <span className="old-price">Was {props.product.price}đ</span>
              </div>
            )
            :
            (
              <div className="product-price">
                <span className="new-price">{props.product.price}đ</span>
              </div>
            )
          }
      {/* End .product-price */}
      {/* rating */}
      <div className="ratings-container">
        <div className="ratings">
          <div className="ratings-val" style={{ width: "40%" }} />
          {/* End .ratings-val */}
        </div>
        {/* End .ratings */}
        <span className="ratings-text">( 4 Reviews )</span>
      </div>
      {/* color */}
      <div className="product-nav product-nav-dots">
        <Link href="#" className="active" style={{ background: "#878883" }}>
          <span className="sr-only">Color name</span>
        </Link>
        <Link href="#" style={{ background: "#dfd5c2" }}>
          <span className="sr-only">Color name</span>
        </Link>
      </div>
      {/* End .product-nav */}
    </div>
    {/* End .product-body */}
    <div className="product-action">
      <Link onClick={()=>dispatch(AddCart(props.product))} className="btn-product btn-cart">
        <span>Thêm vào giỏ hàng</span>
      </Link>
    </div>
    {/* End .product-action */}
  </div>
  {/* End .product */}
</>

);
}
export default ProductItem01;
