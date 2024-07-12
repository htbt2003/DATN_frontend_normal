import { useEffect, useState } from 'react';
import PostServices from '../../../services/PostServices';
import PostItemList from '../../../components/PostItemList.js';
import TopicList from '../../../layouts/LayoutSite/TopicList';
import ReactPaginate from 'react-paginate';

function Post() {
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState();  
    const [posts, setPosts] = useState([]);
    document.title = "Danh sách bài viết"
    const fetchAPI = async () => {
      try {
        const result = await PostServices.getPostAll(page)
            setPosts(result.posts.data)
            setTotal(result.total);
      }
      catch (error) {
        console.log('wait...')
      }
    }
    useEffect(function () {
      fetchAPI()
    }, [page])
          //------------pagination-------------
  const numberPage = Math.ceil(total / 5);
  const handlePageChange = (event) => {
    setPage(event.selected + 1);
  };

    return (
<>
  <main className="main">
    {/* <div
      className="page-header text-center"
      style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
    >
      <div className="container">
        <h1 className="page-title">
          Danh sách bài viết<span>Bài viết</span>
        </h1>
      </div>
    </div> */}
    {/* End .page-header */}
    <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
      <div className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="index.html">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Blog</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Listing
          </li>
        </ol>
      </div>
      {/* End .container */}
    </nav>
    {/* End .breadcrumb-nav */}
    <div className="page-content">
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            {posts.map(function(post, index){
                return <PostItemList key={index} post={post}/>
            })} 
              {/*phân trang*/}
            {/* <nav aria-label="Page navigation">
              <ul className="pagination">
                <li className="page-item disabled">
                  <a
                    className="page-link page-link-prev"
                    href="#"
                    aria-label="Previous"
                    tabIndex={-1}
                    aria-disabled="true"
                  >
                    <span aria-hidden="true">
                      <i className="icon-long-arrow-left" />
                    </span>
                    Prev
                  </a>
                </li>
                <li className="page-item active" aria-current="page">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link page-link-next"
                    href="#"
                    aria-label="Next"
                  >
                    Next{" "}
                    <span aria-hidden="true">
                      <i className="icon-long-arrow-right" />
                    </span>
                  </a>
                </li>
              </ul>
            </nav> */}
            <ReactPaginate
                className="pagination"
                previousLabel="Previous"
                nextLabel="Next"
                pageClassName="page-item"
                pageLinkClassName="page-link "
                previousClassName="page-item"
                previousLinkClassName="page-link "
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageCount={numberPage}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageChange}
                containerClassName="pagination"
                activeClassName="active"
            />

          </div>
          {/* End .col-lg-9 */}
          <aside className="col-lg-3">
            <div className="sidebar">
              <div className="widget widget-search">
                <h3 className="widget-title">Search</h3>
                {/* End .widget-title */}
                <form action="#">
                  <label htmlFor="ws" className="sr-only">
                    Search in blog
                  </label>
                  <input
                    type="search"
                    className="form-control"
                    name="ws"
                    id="ws"
                    placeholder="Search in blog"
                    required=""
                  />
                  <button type="submit" className="btn">
                    <i className="icon-search" />
                    <span className="sr-only">Search</span>
                  </button>
                </form>
              </div>
              {/* End .widget */}
              <div className="widget widget-cats">
                <h3 className="widget-title">Categories</h3>
                {/* End .widget-title */}
                <ul>
                  <li>
                    <a href="#">
                      Lifestyle<span>3</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Shopping<span>3</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Fashion<span>1</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Travel<span>3</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Hobbies<span>2</span>
                    </a>
                  </li>
                </ul>
              </div>
              {/* End .widget */}
              <div className="widget">
                <h3 className="widget-title">Popular Posts</h3>
                {/* End .widget-title */}
                <ul className="posts-list">
                  <li>
                    <figure>
                      <a href="#">
                        <img
                          src="assets/images/blog/sidebar/post-1.jpg"
                          alt="post"
                        />
                      </a>
                    </figure>
                    <div>
                      <span>Nov 22, 2018</span>
                      <h4>
                        <a href="#">Aliquam tincidunt mauris eurisus.</a>
                      </h4>
                    </div>
                  </li>
                  <li>
                    <figure>
                      <a href="#">
                        <img
                          src="assets/images/blog/sidebar/post-2.jpg"
                          alt="post"
                        />
                      </a>
                    </figure>
                    <div>
                      <span>Nov 19, 2018</span>
                      <h4>
                        <a href="#">Cras ornare tristique elit.</a>
                      </h4>
                    </div>
                  </li>
                  <li>
                    <figure>
                      <a href="#">
                        <img
                          src="assets/images/blog/sidebar/post-3.jpg"
                          alt="post"
                        />
                      </a>
                    </figure>
                    <div>
                      <span>Nov 12, 2018</span>
                      <h4>
                        <a href="#">Vivamus vestibulum ntulla nec ante.</a>
                      </h4>
                    </div>
                  </li>
                  <li>
                    <figure>
                      <a href="#">
                        <img
                          src="assets/images/blog/sidebar/post-4.jpg"
                          alt="post"
                        />
                      </a>
                    </figure>
                    <div>
                      <span>Nov 25, 2018</span>
                      <h4>
                        <a href="#">Donec quis dui at dolor tempor interdum.</a>
                      </h4>
                    </div>
                  </li>
                </ul>
                {/* End .posts-list */}
              </div>
              {/* End .widget */}
              <div className="widget widget-banner-sidebar">
                <div className="banner-sidebar-title">ad box 280 x 280</div>
                {/* End .ad-title */}
                <div className="banner-sidebar banner-overlay">
                  <a href="#">
                    <img
                      src="assets/images/blog/sidebar/banner.jpg"
                      alt="banner"
                    />
                  </a>
                </div>
                {/* End .banner-ad */}
              </div>
              {/* End .widget */}
              <div className="widget">
                <h3 className="widget-title">Browse Tags</h3>
                {/* End .widget-title */}
                <div className="tagcloud">
                  <a href="#">fashion</a>
                  <a href="#">style</a>
                  <a href="#">women</a>
                  <a href="#">photography</a>
                  <a href="#">travel</a>
                  <a href="#">shopping</a>
                  <a href="#">hobbies</a>
                </div>
                {/* End .tagcloud */}
              </div>
              {/* End .widget */}
              <div className="widget widget-text">
                <h3 className="widget-title">About Blog</h3>
                {/* End .widget-title */}
                <div className="widget-text-content">
                  <p>
                    Vestibulum volutpat, lacus a ultrices sagittis, mi neque
                    euismod dui, pulvinar nunc sapien ornare nisl.
                  </p>
                </div>
                {/* End .widget-text-content */}
              </div>
              {/* End .widget */}
            </div>
            {/* End .sidebar */}
          </aside>
          {/* End .col-lg-3 */}
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}
    </div>
    {/* End .page-content */}
  </main>
  {/* End .main */}
</>
    );
}

export default Post;