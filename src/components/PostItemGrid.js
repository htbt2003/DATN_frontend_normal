import { urlImage } from '../config';
import { Link } from 'react-router-dom';

function PostItemGrid(props) {
    const formattedDate = new Date(props.post.created_at).toLocaleString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    return (
        <article className="entry entry-grid" style={{marginRight:"20px", width:"277px"}}>
        <figure className="entry-media">
            <Link to={"/chi-tiet-bai-viet/" + props.post.slug}>
            <img
              src={urlImage + "post/" + props.post.image}
              alt="image desc"
            />
          </Link>
        </figure>
        {/* End .entry-media */}
        <div className="entry-body">
          <div className="entry-meta">
            <a href="#">{formattedDate}</a>
            <span className="meta-separator">|</span>
            <a href="#">2 Comments</a>
          </div>
          {/* End .entry-meta */}
          <h2 className="entry-title">
          <Link to={"/chi-tiet-bai-viet/" + props.post.slug}>{props.post.title}</Link>
          </h2>
          {/* End .entry-title */}
          <div className="entry-cats">
            <Link to={"/chi-tiet-bai-viet/" + props.post.slug}>{props.post.metadesc}</Link>
          </div>
          {/* End .entry-cats */}
        </div>
        {/* End .entry-body */}
      </article>

    );
}

export default PostItemGrid;