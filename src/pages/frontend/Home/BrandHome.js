import { useEffect, useState } from "react";
import ProductItem from "../../../components/ProductItem03";
import BrandServices from '../../../services/BrandServices';
import { urlImage } from "../../../config";
import { Link } from "react-router-dom";

function BrandHome() {
    const [brands, setBrands] = useState([])
    const fetchAPI = async () => {
      try {
        const result = await BrandServices.brandHome(8)
        setBrands(result.brands)
      }
      catch (error) {
        console.log('wait...')
      }
    }
    useEffect(function () {
      fetchAPI()
    }, [])
        return ( 
          <div className="brand_logo mb-60">
          <div className="block_title">
            <h3>Brands</h3>
          </div>
          <div className="row">
            <div className="row">
            {
                    (brands && brands.length > 0 && brands.map(function (brand, index) {
                        return (
                          <div className="col-lg-2" key={index}>
                          <div className="single_brand">
                            <Link to={'thuong-hieu/' + brand.slug}>
                              <img src={urlImage + "brand/" + brand.image} alt="" />
                            </Link>
                          </div>
                        </div>          
                          );
                      }))
              }

              {/* <div className="col-lg-2">
                <div className="single_brand">
                  <Link href="#">
                    <img src="assets\img\brand\brand1.jpg" alt="" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-2">
                <div className="single_brand">
                  <Link href="#">
                    <img src="assets\img\brand\brand2.jpg" alt="" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-2">
                <div className="single_brand">
                  <Link href="#">
                    <img src="assets\img\brand\brand3.jpg" alt="" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-2">
                <div className="single_brand">
                  <Link href="#">
                    <img src="assets\img\brand\brand4.jpg" alt="" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-2">
                <div className="single_brand">
                  <Link href="#">
                    <img src="assets\img\brand\brand5.jpg" alt="" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-2">
                <div className="single_brand">
                  <Link href="#">
                    <img src="assets\img\brand\brand6.jpg" alt="" />
                  </Link>
                </div>
              </div> */}
            </div>
          </div>
        </div>
  
          //   <div className="new_brand_area" style={{marginRight:20}}>
          //   <div className="block_title">
          //     <h3>Best Seller Products</h3>
          //   </div>
          //   <div className="row">
          //     <div className="row" >
                // {
                //     (brands && brands.length > 0 && brands.map(function (brand, index) {
                //         return (
                //            <ProductItem brand={brand} key={index}/>
          
                //           );
                //       }))
                // }
          //     </div>
          //   </div>
          // </div>
    );
}

export default BrandHome;