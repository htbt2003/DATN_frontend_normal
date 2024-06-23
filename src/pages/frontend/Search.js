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

return(
    <>
          {/*breadcrumbs area start*/}
  <div className="breadcrumbs_area">
    <div className="row">
      <div className="col-12">
        <div className="breadcrumb_content">
          <ul>
            <li>
              <a href="index.html">home</a>
            </li>
            <li>
              <i className="fa fa-angle-right" />
            </li>
            <li>shop</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  {/*breadcrumbs area end*/}
    {
        products!=null > 0 || posts!=null ?
        (
            <div className="pos_home_section">
            <h4>Kết quả tìm kiếm cho: {key}</h4>
            <div className="new_product_area product_two mt-5">
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
                  {products && products.map(function(product, index){
                        return <ProductItem02 key={index} product={product}/>
                    })}
            </div>
          </div>
        </div>
      </div>
      {/*shop tab product end*/}

            {/*new product area start*/}
            {/*featured product area start*/}
            <div className="new_product_area product_two mt-5">
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
            {posts && posts.map(function(post, index){
                            return <PostItemGrid key={index} post={post}/>
                        })}
            </div>
          </div>
        </div>
      </div>
      {/*shop tab product end*/}

            {/*featured product area start*/}
            {/*blog area start*/}
            {/* <div className="blog_area blog_two">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="single_blog">
                    <div className="blog_thumb">
                      <a href="blog-details.html">
                        <img src="assets\img\blog\blog3.jpg" alt="" />
                      </a>
                    </div>
                    <div className="blog_content">
                      <div className="blog_post">
                        <ul>
                          <li>
                            <a href="#">Tech</a>
                          </li>
                        </ul>
                      </div>
                      <h3>
                        <a href="blog-details.html">
                          When an unknown took a galley of type.
                        </a>
                      </h3>
                      <p>
                        Distinctively simplify dynamic resources whereas prospective
                        core competencies. Objectively pursue multidisciplinary human
                        capital for interoperable.
                      </p>
                      <div className="post_footer">
                        <div className="post_meta">
                          <ul>
                            <li>Jun 20, 2018</li>
                            <li>3 Comments</li>
                          </ul>
                        </div>
                        <div className="Read_more">
                          <a href="blog-details.html">
                            Read more <i className="fa fa-angle-double-right" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="single_blog">
                    <div className="blog_thumb">
                      <a href="blog-details.html">
                        <img src="assets\img\blog\blog4.jpg" alt="" />
                      </a>
                    </div>
                    <div className="blog_content">
                      <div className="blog_post">
                        <ul>
                          <li>
                            <a href="#">Men</a>
                          </li>
                        </ul>
                      </div>
                      <h3>
                        <a href="blog-details.html">
                          When an unknown took a galley of type.
                        </a>
                      </h3>
                      <p>
                        Distinctively simplify dynamic resources whereas prospective
                        core competencies. Objectively pursue multidisciplinary human
                        capital for interoperable.
                      </p>
                      <div className="post_footer">
                        <div className="post_meta">
                          <ul>
                            <li>Jun 20, 2018</li>
                            <li>3 Comments</li>
                          </ul>
                        </div>
                        <div className="Read_more">
                          <a href="blog-details.html">
                            Read more <i className="fa fa-angle-double-right" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="single_blog">
                    <div className="blog_thumb">
                      <a href="blog-details.html">
                        <img src="assets\img\blog\blog1.jpg" alt="" />
                      </a>
                    </div>
                    <div className="blog_content">
                      <div className="blog_post">
                        <ul>
                          <li>
                            <a href="#">Women</a>
                          </li>
                        </ul>
                      </div>
                      <h3>
                        <a href="blog-details.html">
                          When an unknown took a galley of type.
                        </a>
                      </h3>
                      <p>
                        Distinctively simplify dynamic resources whereas prospective
                        core competencies. Objectively pursue multidisciplinary human
                        capital for interoperable.
                      </p>
                      <div className="post_footer">
                        <div className="post_meta">
                          <ul>
                            <li>Jun 20, 2018</li>
                            <li>3 Comments</li>
                          </ul>
                        </div>
                        <div className="Read_more">
                          <a href="blog-details.html">
                            Read more <i className="fa fa-angle-double-right" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {/*blog area end*/}
          </div>
        
        )
        :
        (
            <div className="pos_home_section" style={{height:600}}>
                <div className="text-center">
                <img src="assets\img\search.png" alt="" />
                    <h3>Không tìm thấy kết quả nào</h3>
                </div>
          </div>
        )
    }
</>

)


}

export default Search;