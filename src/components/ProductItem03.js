import { FcNext } from 'react-icons/fc';
import { urlImage } from '../config';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import React from 'react'
import {AddCart} from '../redux/cartSlice';
import swal from 'sweetalert';

function ProductItem03(props) {
  const dispatch = useDispatch();
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
};
    return ( 
    <div className="product product-7 text-center">
      <figure className="product-media">
      {
             props.product.price_sale != null ?(
              <span className="product-label label-circle label-sale">
              Sale
            </span> 
             ):(
              props.type=='new'?(
                <span className="product-label label-new">New</span>
              ):(
                props.type=='hot'?(
                  <span className="product-label label-circle label-sale">
              Hot
            </span> 
                ):null
              )
             )
          }
        <Link to={"/chi-tiet-san-pham/" + props.product.slug}>
          <img
            src={urlImage + "product/" + props.product.image}
            alt="Product image"
            className="product-image"
          />
        </Link>
        {/* <div className="product-action-vertical">
          <Link href="#" className="btn-product-icon btn-wishlist btn-expandable">
            <span>Thêm vào yêu thích</span>
          </Link>
          <Link
            href="popup/quickView.html"
            className="btn-product-icon btn-quickview"
            title="Quick view"
          >
            <span>Quick view</span>
          </Link>
          <Link href="#" className="btn-product-icon btn-compare" title="Compare">
            <span>Compare</span>
          </Link>
        </div> */}
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
        <div className="product-cat">
          <Link href="#">Women</Link>
        </div>
        {/* End .product-cat */}
        <h3 className="product-title">
          <Link to={"/chi-tiet-san-pham/" + props.product.slug}>{truncateText(props.product.name, 50)}</Link>
        </h3>
        {/* End .product-title */}
        {
            props.product.price_sale!=null ?
            (
              <div className="product-price">
                <span className="new-price">{props.product.price_sale?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                <span className="old-price">- {props.product.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
              </div>
            )
            :
            (
              <div className="product-price">
                <span className="new-price">{props.product.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
              </div>
            )
          }
        {/* End .product-price */}
        <div className="ratings-container">
          <div className="ratings">
            <div className="ratings-val" style={{ width: `${props.product.avg_rating * 20}%` }} />
          </div>
          <span className="ratings-text">( {props.product.sum_qty_selled? props.product.sum_qty_selled : 0} đã bán )</span>
        </div>
        {/* <div className="product-nav product-nav-thumbs">
          <Link href="#" className="active">
            <img
              src="assets/images/products/product-4-thumb.jpg"
              alt="product desc"
            />
          </Link>
          <Link href="#">
            <img
              src="assets/images/products/product-4-2-thumb.jpg"
              alt="product desc"
            />
          </Link>
          <Link href="#">
            <img
              src="assets/images/products/product-4-3-thumb.jpg"
              alt="product desc"
            />
          </Link>
        </div> */}
      </div>
    </div>

);
}
export default ProductItem03;
