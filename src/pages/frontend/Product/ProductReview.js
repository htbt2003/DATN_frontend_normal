import { useEffect, useState } from "react";
import { BiSolidStar } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa6";
import swal from "sweetalert";
import ReviewServies from '../../../services/ReviewServies';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const ProductReview = ({ reviews, setReload, product_id }) => {
  const user= useSelector((state) => state.auth.user)
  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setsComment] = useState("")
  let count = reviews ? reviews.length : 0;
  // console.log(user.id)
  async function handleSubmitReview() {
    if (comment === "") {
      swal("Failed", "Vui lòng viết bình luận đánh giá", "error");
      return
    }
    const review = {
      user_id: user.id,
      product_id: product_id,
      comment: comment,
      rating: selectedRating + 1,
    }
    await ReviewServies.create(review)
      .then((result) => {
        setSelectedRating(0);
        setsComment("");
      })
    setReload(Date.now);
  }

  return (
    <>
      <div className="reviews">
        <h3>Reviews ({count})</h3>
        {reviews && reviews.map(function (review, index) {
          return (
            <div className="review" key={index}>
              <div className="row no-gutters">
                <div className="col-auto">
                  {/* <h4>
                          <Link href="#">{review.user_name}</Link>
                        </h4> */}
                  <div className="ratings-container">
                    <div className="ratings">
                      <div
                        className="ratings-val"
                        style={{ width: `${review.rating * 20}%` }}
                      />
                      {/* End .ratings-val */}
                    </div>
                    {/* End .ratings */}
                  </div>
                  {/* End .rating-container */}
                  <span className="review-date">6 days ago</span>
                </div>
                {/* End .col */}
                <div className="col">
                  <h4>{review.user_name}</h4>
                  <div className="review-content">
                    <p>
                      {review.comment}
                    </p>
                  </div>
                  {/* End .review-content */}
                  {/* <div className="review-action">
                          <Link href="#">
                            <i className="icon-thumbs-up" />
                            Helpful (2)
                          </Link>
                          <Link href="#">
                            <i className="icon-thumbs-down" />
                            Unhelpful (0)
                          </Link>
                        </div> */}
                  {/* End .review-action */}
                </div>
                {/* End .col-auto */}
              </div>
              {/* End .row */}
            </div>
          )
        })}
        {/* End .review */}
      </div>
      {
        user!=null?(
          <div className="product_review_form mt-2 border p-5">
          <div >
            <h3>Đánh giá sản phẩm</h3>
            <div className="">
              <ul className="row ml-1">
                {[...Array(5)].map(function (_, i) {
                  return (
                    <li key={i} >
                      {
                        i <= selectedRating ?
                          (
                            <BiSolidStar size={20} color="#fcb941" onClick={() => setSelectedRating(i)} />
  
                          )
                          :
                          (
                            <FaRegStar size={20} onClick={() => setSelectedRating(i)} />
                          )
                      }
  
  
                    </li>
                  )
                })}
              </ul>
            </div>
                <div className="">
                  <p >Hãy để lại những dòng nhận xét của bạn về sản phẩm này</p>
                  <textarea
                    className="form-control"
                    placeholder="Nội dung *"
                    value={comment} onChange={(e) => setsComment(e.target.value)}
                  />
                </div>
            <div className="btn-wrap">
              <a className="btn btn-primary btn-round" onClick={handleSubmitReview}>
                Thêm
              </a>
            </div>
          </div>
        </div>  
        ):null
      }

    </>
  );
}


export default ProductReview;

