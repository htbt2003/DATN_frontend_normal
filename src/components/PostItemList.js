import { urlImage } from '../config';
import { Link } from 'react-router-dom';

function PostItemList(props) {
    const formattedDate = new Date(props.post.created_at).toLocaleString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        // hour: '2-digit',
        // minute: '2-digit',
        // second: '2-digit',
      });
    return (
        <article className="entry entry-list">
        <div className="row align-items-center">
          <div className="col-md-5">
            <figure className="entry-media">
              <Link to={"/chi-tiet-bai-viet/" + props.post.slug}>
                <img
                  src={urlImage + "post/" + props.post.image}
                  alt="image desc"
                />
              </Link>
            </figure>
            {/* End .entry-media */}
          </div>
          {/* End .col-md-5 */}
          <div className="col-md-7">
            <div className="entry-body">
              <div className="entry-meta">
                <span className="entry-author">
                  by <a href="#">John Doe</a>
                </span>
                <span className="meta-separator">|</span>
                <a href="#">{formattedDate}</a>
                <span className="meta-separator">|</span>
                <a href="#">2 Comments</a>
              </div>
              {/* End .entry-meta */}
              <h2 className="entry-title">
                <Link to={"/chi-tiet-bai-viet/" + props.post.slug}>{props.post.title}</Link>
              </h2>
              {/* End .entry-title */}
              {/* <div className="entry-cats">
                in <a href="#">Lifestyle</a>,<a href="#">Shopping</a>
              </div> */}
              {/* End .entry-cats */}
              <div className="entry-content">
                <p>
                    {props.post.metadesc}{" "}
                </p>
                <Link to={"/chi-tiet-bai-viet/" + props.post.slug} className="read-more">
                  Đọc thêm
                </Link>
              </div>
              {/* End .entry-content */}
            </div>
            {/* End .entry-body */}
          </div>
          {/* End .col-md-7 */}
        </div>
        {/* End .row */}
      </article>

    );
}

export default PostItemList;