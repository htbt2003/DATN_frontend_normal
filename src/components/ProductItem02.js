import { FcNext } from 'react-icons/fc';
import { urlImage } from '../config';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import React from 'react'
import { AddCart } from '../redux/cartSlice';
import swal from 'sweetalert';

function ProductItem02(props) {
  // const product = props.product
  const dispatch = useDispatch()
  return (
    <div className="col-6 col-md-4 col-lg-3 col-xl-5col">
      <div className="product product-7 text-center">
        <figure className="product-media">
          <span className="product-label label-circle label-sale">
            Sale
          </span>
          <Link to={"/chi-tiet-san-pham/" + props.product.slug}>
            <img
              src={urlImage + "product/" + props.product.image}
              alt="Product image"
              className="product-image"
            />
            <img
              src={urlImage + "product/" + props.product.image}
              alt="Product image"
              className="product-image-hover"
            />
          </Link>
          <div className="product-action-vertical">
            <Link
              href="#"
              className="btn-product-icon btn-wishlist btn-expandable"
            >
              <span>Thêm vào yêu thích</span>
            </Link>
            <Link
              href="popup/quickView.html"
              className="btn-product-icon btn-quickview"
              title="Quick view"
            >
              <span>Quick view</span>
            </Link>
          </div>
          {/* End .product-action-vertical */}
          <div className="product-action">
            <Link onClick={() => {
              dispatch(AddCart(props.product));
              swal("Thành công", "Thêm vào giỏ hàng thành công", "success");
            }} className="btn-product btn-cart">
              <span>Thêm vào giỏ hàng</span>
            </Link>
          </div>
          {/* End .product-action */}
        </figure>
        {/* End .product-media */}
        <div className="product-body">
          <h3 className="product-title">
            <Link to={"/chi-tiet-san-pham/" + props.product.slug}>{props.product.name}</Link>
          </h3>
          {/* End .product-title */}
          {
            props.product.price_sale != null ?
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
          {/* <div className="ratings-container">
            <div className="ratings">
              <div className="ratings-val" style={{ width: "40%" }} />
            </div>
            <span className="ratings-text">( 4 Reviews )</span>
          </div> */}
          {/* End .rating-container */}
          {/* color */}
          {/* <div className="product-nav product-nav-dots">
            <Link
              href="#"
              className="active"
              style={{ background: "#d5ad81" }}
            >
              <span className="sr-only">Color name</span>
            </Link>
            <Link href="#" style={{ background: "#333333" }}>
              <span className="sr-only">Color name</span>
            </Link>
          </div>
 */}
        </div>
        {/* End .product-body */}
      </div>
      {/* End .product */}
    </div>

  );
}
export default ProductItem02;
