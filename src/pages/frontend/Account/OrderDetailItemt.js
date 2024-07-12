import { useEffect, useState } from "react";
import { urlImage } from "../../../config";
import { Link } from "react-router-dom";

const OrderDetailItemt = ({ orderDetails }) => {
  const products = orderDetails;
  useEffect(function () {

  }, [])

  return (
    <div className="order-content">
      {
        products && products.map((product, index) => {
          let name = product.name;
          let hinhanh = urlImage + "product/" + product.image;
          let price_sell = product.price_sell;

          if (product.variant) {
            name = product.variant.name;
            price_sell = product.variant.price;

            product.variant.variant_values.forEach(function (item1) {
              if (item1.product_attribute_value.image != null) {
                hinhanh = urlImage + "pro_attribute/" + item1.product_attribute_value.image;
              }
            });
          }
          console.log(product.name)
          return (
            <div className="product row justify-content-between" key={index}>
              <div className="product-col">
                <div className="product">
                  <figure className="product-media">
                    <a href="#">
                      <img
                        src={hinhanh}
                        alt="Product image"
                      />
                    </a>
                  </figure>
                  <h3 className="product-title">
                    <Link href="#">{name}</Link>
                    <p>
                    {product.variant && product.variant.variant_values.map((item2, index) =>
                      <a className='mr-3 text-sm' key={index}>{item2.product_attribute_value.attribute_value.name}</a>
                    )}
                    </p>
                   <div>x{product.qty}</div>
                  </h3>
                  {/* End .product-title */}
                </div>
                {/* End .product */}
              </div>
              <div className="price-col">
                {product.price_bill < price_sell ? (
                  <>
                    <div style={{ textDecoration: 'line-through', color: 'red' }}>
                      {price_sell?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </div>
                    <div>
                      {product.price_bill?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </div>
                  </>
                ) : (
                  <div>
                    {product.price_bill?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                  </div>
                )}

              </div>
            </div>
          )
        })
      }
    </div>
  )
}
export default OrderDetailItemt;