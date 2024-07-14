import { useParams } from "react-router-dom";
import PostServices from "../../../services/PostServices"
import TopicServices from "../../../services/TopicServices"
import { useEffect, useState } from "react";
import TopicList from "../../../layouts/LayoutSite/TopicList";
import PostItemList from "../../../components/PostItemList";
import ReactPaginate from "react-paginate";
import { urlImage } from "../../../config";

function PostTopic() {
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState();  
    const { slug } = useParams();
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState("");
    document.title = title;
    const fetchAPI = async () => {
      try {
        const result = await TopicServices.getTopicBySlug(slug);
        const topicid = result.topic.id;
        setTitle(result.topic.name);
        const resultp = await PostServices.getPostByTopicId(page, topicid);
        setPosts(resultp.posts.data)
        setTotal(resultp.total);
      }
      catch (error) {
        console.log('wait...')
      }
    }
    useEffect(function () {
      fetchAPI()
    }, [slug, page])

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
          {title}<span>Bài viết</span>
        </h1>
      </div>
    </div> */}
    {/* End .page-header */}
    <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
      <div className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="index.html">Trang chủ</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Bài viết</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
          { slug }
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
            <div className="widget widget-cats p-3 bg-light border rounded shadow-sm">
                <strong><h3 className="widget-title">Danh mục</h3></strong>
                <ul>
                  <li>
                    <a href="#">
                    Cách sống<span>3</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                    Mua sắm<span>3</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Thời trang<span>1</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Du lịch<span>3</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Sở thích<span>2</span>
                    </a>
                  </li>
                </ul>
              </div>
              {/* End .widget */}
              <div className="widget shadow-sm border rounded p-3">
                <h3 className="widget-title">Bài viết phổ biến</h3>
                {/* End .widget-title */}
                <ul className="posts-list">
                {posts.map(function(post, index){
                return (
                  <li>
                  <figure>
                    <a href="#">
                      <img
                        src={urlImage + 'post/'+ post.image}
                        alt="post"
                        style={{height:"80px", width:'70px'}}
                      />
                    </a>
                  </figure>
                  <div>
                    <span>22/11/2023</span>
                    <h4>
                      <a href="#">{post.title}</a>
                    </h4>
                  </div>
                </li>
                )
            })} 
                </ul>
                {/* End .posts-list */}
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
)
}

export default PostTopic;