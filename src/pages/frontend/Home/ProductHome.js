import { useEffect, useState } from "react";
import ProductItem02 from "../../../components/ProductItem02";
import ProductServices from '../../../services/ProductServices';
import { Link } from "react-router-dom";

function ProductHome(props) {
    const [products, setProducts] = useState([])
    const fetchAPI = async () => {
      try {
        const response = await ProductServices.getProductHome(10, props.category.id)
        setProducts(response.products)
      }
      catch (error) {
        console.log('wait...')
      }
    }
    useEffect(function () {
      fetchAPI()
    }, [])
        return ( 
          <div
          className= { props.index == 0 ? "tab-pane p-0 fade active show" : "tab-pane p-0 fade" }
          id={props.category.slug + "-tab"}
          role="tabpanel"
          aria-labelledby={props.category.slug + "-link"}
        >
          <div className="products">
            <div className="row justify-content-center">
            {
                  (products && products.length > 0 && products.map(function (product, index) {
                      return (
                         <ProductItem02 product={product} key={index}/>
                        );
                    }))
              }
            </div>
            {/* End .row */}
          </div>
          {/* End .products */}
          <div className="more-container text-center mt-2">
            <Link to={"danh-muc-san-pham/" + props.category.slug} className="btn btn-outline-dark-3 btn-more">
              <span>Xem thêm</span>
              <i className="icon-long-arrow-right" />
            </Link>
          </div>
        </div>
    
    );
    // }
}

export default ProductHome;