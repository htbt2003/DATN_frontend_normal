import Slider from "./Slider";
import CategoryServices from "../../../services/CategoryServices"
import ProductHome from "./ProductHome";
import CategoryList from "../../../layouts/LayoutSite/CategoryList";
import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from 'react';
import ProductNew from "./ProductNew";
import ProductSale from "./ProductSale";
import ProductBestSeller from "./ProductBestSeller";
import BrandHome from "./BrandHome";
import DataProvider, { DataContext } from "./DataProvider";
import { urlImage } from "../../../config";

function HomeData() {
  const { categories, bestSeller, proNew, proSale, sliders, posts } = useContext(DataContext);
    document.title = "Shop thời trang"
    const truncateText = (text, maxLength) => {
      if (text.length > maxLength) {
          return text.substring(0, maxLength) + '...';
      }
      return text;
  };
    return (
<>

  <main className="main" style={{ backgroundColor: "#f9f9f9" }}>
    <Slider data={sliders}/>
    <div className="mb-3 mb-lg-5" />
    {/* End .mb-3 mb-lg-5 */}
    {/* End .banner-group */}
    <div className="mb-3" />
    {/* End .mb-6 */}
    <div className="container">
      <ul
        className="nav nav-pills nav-border-anim nav-big justify-content-center mb-3"
        role="tablist"
      >
        <li className="nav-item">
          <a
            className="nav-link active"
            id="products-new-link"
            data-toggle="tab"
            href="#products-new-tab"
            role="tab"
            aria-controls="products-new-tab"
            aria-selected="true"
          >
            Mới
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="products-sale-link"
            data-toggle="tab"
            href="#products-sale-tab"
            role="tab"
            aria-controls="products-sale-tab"
            aria-selected="false"
          >
            Bán chạy
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="products-top-link"
            data-toggle="tab"
            href="#products-top-tab"
            role="tab"
            aria-controls="products-top-tab"
            aria-selected="false"
          >
            Khuyến mãi
          </a>
        </li>
      </ul>
    </div>
    {/* End .container */}
    <>
  <div className="container">
    <div className="tab-content">
      {/* product new */}
      <ProductNew data={proNew}/>      
      {/* product best seller */}
      <ProductBestSeller data={bestSeller}/>
        {/* product sale */}
      <ProductSale data={proSale}/>
    </div>
    {/* End .tab-content */}
  </div>
  {/* End .container-fluid */}
</>

    {/* End .container-fluid */}
    <div className="mb-5" />
    {/* End .mb-5 */}
    {/*Deal of the Day */}
    {/* <div className="bg-light deal-container pt-5 pb-3 mb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <div className="deal">
              <div className="deal-content">
                <h4>Limited Quantities</h4>
                <h2>Deal of the Day</h2>
                <h3 className="product-title">
                  <a href="product.html">POÄNG</a>
                </h3>
                <div className="product-price">
                  <span className="new-price">$149.00</span>
                  <span className="old-price">Was $240.00</span>
                </div>
                <div className="deal-countdown" data-until="+10h" />
                <a href="product.html" className="btn btn-primary">
                  <span>Shop Now</span>
                  <i className="icon-long-arrow-right" />
                </a>
              </div>
              <div className="deal-image">
                <a href="product.html">
                  <img
                    src="assets/images/demos/demo-2/deal/product-1.jpg"
                    alt="image"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="banner banner-overlay banner-overlay-light text-center d-none d-lg-block">
              <a href="#">
                <img
                  src="assets/images/demos/demo-2/banners/banner-5.jpg"
                  alt="Banner"
                />
              </a>
              <div className="banner-content banner-content-top banner-content-center">
                <h4 className="banner-subtitle">The Best Choice</h4>
                <h3 className="banner-title">AGEN</h3>
                <div className="banner-text text-primary">$49.99</div>
                <a href="#" className="btn btn-outline-gray banner-link">
                  Shop Now
                  <i className="icon-long-arrow-right" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> */}
    {/* End .bg-light */}
    {/* <div className="mb-6" /> */}
    {/* End .mb-6 */}
    <div className="container">
    <hr className="mb-6" ></hr>
      <div className="heading heading-center mb-3">
        <h2 className="title">Phổ biến</h2>
        {/* End .title */}
        <ul className="nav nav-pills justify-content-center" role="tablist">
        {categories.map(function (category ,index){
          if(index == 0){
            return (
              <li className="nav-item">
              <a
                className="nav-link active"
                id= {category.slug + "-link"}
                data-toggle="tab"
                href= {"#" + category.slug + "-tab"}
                role="tab"
                aria-controls= {category.slug + "-tab"}
                aria-selected="true"
              >
                {category.name}
              </a>
            </li>      
            );
          }
          else{
            return (
              <li className="nav-item">
              <a
                className="nav-link"
                id= {category.slug + "-link"}
                data-toggle="tab"
                href= {"#" + category.slug + "-tab"}
                role="tab"
                aria-controls= {category.slug + "-tab"}
                aria-selected="false"
              >
                {category.name}
              </a>
            </li>      
            );
          }
      })}
        </ul>
      </div>
      {/* End .heading */}
      <div className="tab-content">
        {categories.map(function (category ,index){
          return <ProductHome index={index} category={category}/>   
        })}
        {/* .End .tab-pane */}
      </div>
      {/* End .tab-content */}
      <hr className="mt-0 mb-6" />
    </div>
    {/* End .container */}
    <div className="blog-posts">
      <div className="container">
      <div className="heading heading-flex p-3">
        <div className="heading-left">
          <h2 className="title mb-0 font-weight-bold">Bài viết</h2>
      </div>
  {/* End .heading-left */}
  <div className="heading-right">
    <a
      href="category.html"
      className="title-link font-size-normal text-uppercase font-weight-normal"
    >
      Xem thêm
      <i className="icon-long-arrow-right" />
    </a>
  </div>
  {/* End .heading-right */}
</div>

        {/* End .title-lg text-center */}
        <div className="products">
            <div className="row justify-content-center">
              { posts && posts.map((post, index)=>(
                            <article key={index} className="entry entry-display p-3">
                              <div className="address">
                              <figure className="entry-media">
                              <Link to={"/chi-tiet-bai-viet/" + post.slug}>
                                <img
                                   src={urlImage + "post/" + post.image}
                                  alt="image desc"
                                 style={{height:"180px", width:"260px"}}
                                />
                              </Link>
                            </figure>
                            <div className="entry-body text-center">
                              <div className="entry-meta">
                                <a href="#">{post.created_at}</a>
                              </div>
                              <h3 className="entry-title">
                                <a href="single.html">{truncateText(post.title, 20)}{}</a>
                              </h3>
                              <div className="entry-content">
                                <a href="single.html" className="read-more">
                                {truncateText(post.metadesc, 20)}{}
                                </a>
                              </div>
                            </div>
                              </div>
                          </article>                
              ))}

            </div>
            {/* End .row */}
          </div>
      </div>
      {/* End .container */}
    </div>
    {/* End .blog-posts */}
  </main>
  {/* End .main */}
</>

    );
}

export default function Home() {
  return (
    <DataProvider>
      <HomeData />
    </DataProvider>
  );
}