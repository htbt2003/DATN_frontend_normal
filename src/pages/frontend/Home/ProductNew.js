import { memo, useEffect, useState } from "react";
import ProductItem02 from "../../../components/ProductItem02";
import ProductServices from '../../../services/ProductServices';
import { Link } from "react-router-dom";

function ProductNew(prop) {
  const products = prop.data
  // const [products, setProducts] = useState([])
  // const fetchAPI = async () => {
  //   try {
  //     const response = await ProductServices.getProductNew(10)
  //     setProducts(response.products)
  //   }
  //   catch (error) {
  //     console.log('wait...')
  //   }
  // }
  // useEffect(function () {
  //   fetchAPI()
  // }, [])
  return (
    <div
    className="tab-pane p-0 fade show active"
    id="products-new-tab"
    role="tabpanel"
    aria-labelledby="products-new-link"
  >
          <div className="products">
            <div className="row justify-content-center">
            {
                  (products && products.length > 0 && products.map(function (product, index) {
                      return (
                         <ProductItem02 product={product} key={index} type={'new'}/>
                        );
                    }))
              }
            </div>
            {/* End .row */}
          </div> 
          {/* <div className="more-container text-center mt-2">
            <Link to={"danh-muc-san-pham/"} className="btn btn-outline-dark-3 btn-more">
              <span>Xem thêm</span>
              <i className="icon-long-arrow-right" />
            </Link>
          </div> */}

           </div>
);
}

export default memo(ProductNew);