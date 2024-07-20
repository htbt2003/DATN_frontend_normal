import { useEffect, useState } from "react";
import PostServices from "../../../services/PostServices"
import { useParams } from "react-router-dom";
import { urlImage } from "../../../config";
import PostItemGrid from "../../../components/PostItemGrid";

function PostDetail() {
  const [post, setPost] = useState([]);
  const [post_other, setProductOther] = useState([]);
  const { slug } = useParams();
  const formattedDate = new Date(post.created_at).toLocaleString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const fetchAPI = async () => {
    try {
      const result = await PostServices.getTopicBySlug(slug)
      setPost(result.post)
      setProductOther(result.post_other)
    }
    catch (error) {
      console.log('wait...')
    }
  }
  useEffect(function () {
    fetchAPI()
  }, [slug])

  return (
    <>
      <main className="main">
        <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Trang chủ</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Chi tiết bài viết</a>
              </li>
              {/* <li className="breadcrumb-item active" aria-current="page">
                Fullwidth
              </li> */}
            </ol>
          </div>
          {/* End .container */}
        </nav>
        {/* End .breadcrumb-nav */}
        <div className="page-content">
          {/* <figure className="entry-media">
        <img src={urlImage + "post/" + post.image} alt="image desc" />
      </figure> */}
          {/* End .entry-media */}
          <div className="container">
            <article className="entry single-entry entry-fullwidth">
              <div className="row">
                <div className="col-lg-11">
                  <div className="entry-body">
                    <div className="entry-meta">
                      <span className="entry-author">
                        {/* by <a href="#">{post.created_by}</a> */}
                      </span>
                      {/* <span className="meta-separator">|</span> */}
                      <a href="#">{formattedDate}</a>
                      {/* <span className="meta-separator">|</span> */}
                      {/* <a href="#">2 Comments</a> */}
                    </div>
                    {/* End .entry-meta */}
                    <h2 className="entry-title entry-title-big">
                      {post.title}
                    </h2>
                    <figure className="entry-media">
                      <img src={urlImage + "post/" + post.image} alt="image desc" />
                    </figure>
                    {/* End .entry-title */}
                    <div className="entry-cats">
                      {/* in <a href="#">Travel</a> */}
                    </div>
                    {/* End .entry-cats */}
                    <div className="entry-content editor-content">
                      <div
                        dangerouslySetInnerHTML={{ __html: post.detail }}
                      />
                      <div className="pb-1" />
                      {/* End .pb-1 */}
                      <div className="pb-1" />
                    </div>
                    

                    {/* End .entry-content */}
                    <div className="entry-footer row no-gutters">
                      <div className="col">
                        <div className="entry-tags">
                          {/* <span>Tags:</span> <a href="#">photography</a>{" "}
                          <a href="#">style</a> */}
                        </div>
                        {/* End .entry-tags */}
                      </div>
                      {/* End .col */}
                    </div>
                    {/* End .entry-footer row no-gutters */}
                  </div>
                  {/* End .entry-body */}
                </div>
                {/*share */}
                <div className="col-lg-1 order-lg-first mb-2 mb-lg-0">
                  <div className="sticky-content">
                    <div className="social-icons social-icons-colored social-icons-vertical">
                      <span className="social-label">Chia sẽ :</span>
                      <a
                        href="#"
                        className="social-icon social-facebook"
                        title="Facebook"
                        target="_blank"
                      >
                        <i className="icon-facebook-f" />
                      </a>
                      <a
                        href="#"
                        className="social-icon social-twitter"
                        title="Twitter"
                        target="_blank"
                      >
                        <i className="icon-twitter" />
                      </a>
                      <a
                        href="#"
                        className="social-icon social-pinterest"
                        title="Pinterest"
                        target="_blank"
                      >
                        <i className="icon-pinterest" />
                      </a>
                      <a
                        href="#"
                        className="social-icon social-linkedin"
                        title="Linkedin"
                        target="_blank"
                      >
                        <i className="icon-linkedin" />
                      </a>
                    </div>
                  </div>
                </div>

              </div>
              {/* End .row */}
              {/* End .entry-author-details*/}
            </article>
            <hr className="mt-0 mb-6" />
            {/* Bài viết liên quan */}
            <div className="related-posts">
              <h3 className="title">Bài viết liên quan</h3>
              <div className="products">
                <div className="row justify-content-center">
                  {
                    (post_other && post_other.length > 0 && post_other.map(function (post, index) {
                      return (
                        <PostItemGrid post={post} key={index} />

                      );
                    }))
                  }
                </div>
              </div>
              {/* End .owl-carousel */}
            </div>
            {/* End .related-posts */}
            <div className="comments">
              <h3 className="title">0 Comment</h3>
              {/* End .title */}
            </div>
            {/* End .comments */}
            <div className="reply">
              <div className="heading">
                <h3 className="title">Leave A Reply</h3>
                {/* End .title */}
                <p className="title-desc">
                  Your email address will not be published. Required fields are
                  marked *
                </p>
              </div>
              {/* End .heading */}
              <form action="#">
                <label htmlFor="reply-message" className="sr-only">
                  Comment
                </label>
                <textarea
                  name="reply-message"
                  id="reply-message"
                  cols={30}
                  rows={4}
                  className="form-control"
                  required=""
                  placeholder="Comment *"
                  defaultValue={""}
                />
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="reply-name" className="sr-only">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="reply-name"
                      name="reply-name"
                      required=""
                      placeholder="Name *"
                    />
                  </div>
                  {/* End .col-md-6 */}
                  <div className="col-md-6">
                    <label htmlFor="reply-email" className="sr-only">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="reply-email"
                      name="reply-email"
                      required=""
                      placeholder="Email *"
                    />
                  </div>
                  {/* End .col-md-6 */}
                </div>
                {/* End .row */}
                <button type="submit" className="btn btn-outline-primary-2">
                  <span>POST COMMENT</span>
                  <i className="icon-long-arrow-right" />
                </button>
              </form>
            </div>
            {/* End .reply */}
          </div>
          {/* End .container */}
        </div>
        {/* End .page-content */}
      </main>
      {/* End .main */}
    </>
  );
}

export default PostDetail;