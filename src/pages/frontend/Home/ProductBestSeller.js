import { memo, useEffect, useState } from "react";
import ProductItem02 from "../../../components/ProductItem02";
import ProductServices from '../../../services/ProductServices';

function ProductBestSeller({ data }) {
    const products = data
    // console.log(data)
    // const fetchAPI = async () => {
    //   try {
    //     const response = await ProductServices.getProductBestSeller(10)
    //     setProducts(response.products)
    //   }
    //   catch (error) {
    //     console.log('wait...')
    //   }
    // }
    // useEffect(function () {
    //   fetchAPI()
    // }, [products])
  return ( 
    <div
      className="tab-pane p-0 fade"
      id="products-sale-tab"
      role="tabpanel"
      aria-labelledby="products-sale-link"
    >
 <div className="products">
            <div className="row justify-content-center">
            {
                  (products && products.length > 0 && products.map(function (product, index) {
                      return (
                         <ProductItem02 product={product} key={index} type={'hot'}/>
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

export default memo(ProductBestSeller);