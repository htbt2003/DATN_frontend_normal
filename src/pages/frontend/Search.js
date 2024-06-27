import { useParams } from "react-router-dom";
import ProductItem02 from "../../components/ProductItem02";
import { useEffect, useState } from "react";
import ProductServices from "../../services/ProductServices"
// import ReactPaginate from 'react-paginate';
// import $ from 'jquery';
import PostItemGrid from "../../components/PostItemGrid";

function Search(prop) {
  const { key } = useParams();
  const [total, setTotal] = useState(0);
  const [totalPost, setTotalPost] = useState(0);
  const [products, setProducts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [reload, setReload] = useState();

  document.title = "Kết quả tìm kiếm";
  useEffect(function () {
    (async function () {
      const result = await ProductServices.getSearch(key);
      setProducts(result.products)
      setPosts(result.posts)
      // setTotal(result.prototal)
      // setTotalPost(reload.posttoltal)
      console.log(result.search)
    })();
  }, [key]);

  // console.log(key)

  console.log(products)

  return (
    <main className="main">
      <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Pages</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Tìm kiếm
            </li>
          </ol>
        </div>
        {/* End .container */}
      </nav>
      {/* End .breadcrumb-nav */}
      {
        products != null > 0 || posts != null ?
          (
            <div className="page-content">
              <div className="container">
                <h4>Kết quả tìm kiếm cho: {key}</h4>
                <div className="new_product_area product_two">
                  <div className="row">
                    <div className="col-12">
                      <div className="block_title">
                        <h3> Sản phẩm</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="shop_tab_product">
                  <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="large" role="tabpanel">
                      <div className="row">
                        {products && products.map(function (product, index) {
                          return <ProductItem02 key={index} product={product} />
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                {/*shop tab product end*/}
                <hr></hr>
                {/*featured product area start*/}
                <div className="new_product_area product_two">
                  <div className="row">
                    <div className="col-12">
                      <div className="block_title">
                        <h3> Bài viết</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="shop_tab_product">
                  <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="large" role="tabpanel">
                      <div className="row">
                        {posts && posts.map(function (post, index) {
                          return <PostItemGrid key={index} post={post} />
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                {/*shop tab product end*/}
              </div>
            </div>
          )
          :
          (
            <div className="pos_home_section" style={{ height: 600 }}>
              <div className="text-center">
                <img src="assets\img\search.png" alt="" />
                <h3>Không tìm thấy kết quả nào</h3>
              </div>
            </div>
          )
      }
      {/* End .login-page section-bg */}
    </main>

  )


}

export default Search;