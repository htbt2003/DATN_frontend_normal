import { useEffect, useState } from "react";
// import OrderDetailServices from '../../../services/OrderDetailServices';
import OrderServices from '../../../services/OrderServices';
import { urlImage } from "../../../config";

const OrderDetailItemt = (prop) => {
    const [order_details, setOrderDetail] = useState([]);
    const fetchAPI = async () => {
      const result = await OrderServices.orderDetail(prop.order_id);
        setOrderDetail(result.orderDetails)
      // try {
      //   const result = await OrderServices.orderDetail(prop.order_id);
      //   setOrderDetail(result.orderDetails)
      // }
      // catch (error) {
      //   console.log(error)
      // }
    }
    useEffect(function () {
      fetchAPI()
    }, [])
    console.log(prop.order_id)
    return (
      <div className="order-content">
        {
          order_details && order_details.map((order_detail, index) => {
            return (
              <div className="product row justify-content-between" key={index}>
                <div className="product-col">
                  <div className="product">
                    <figure className="product-media">
                      <a href="#">
                        <img
                          src={urlImage + "product/" + order_detail.image}
                          alt="Product image"
                        />
                      </a>
                    </figure>
                    <h3 className="product-title">
                      <a href="#">{order_detail.name}</a>
                      <p href="#">Beige knitted elastic runner shoes</p>
                    </h3>
                    {/* End .product-title */}
                  </div>
                  {/* End .product */}
                </div>
                <div className="price-col">{order_detail.price}</div>
                <div className="price-col">Số lượng: {order_detail.qty}</div>
              </div>
            )
          })
        }
      </div>
    )
  }
export default OrderDetailItemt;