import { useEffect, useRef, useState } from 'react';
import ProductItem03 from '../../../components/ProductItem03.js';
import ProductServices from '../../../services/ProductServices';
import BrandServices from '../../../services/BrandServices';
import ReactPaginate from 'react-paginate';
import { useParams } from 'react-router-dom';
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';

function ProductBrand() {
  const sliderRef = useRef(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const { slug } = useParams();
  const [sort, setSort] = useState();
  const [prices, setPrices] = useState([0, 1000000]);
  const [reload, setReload] = useState();
  document.title = title
  var condition = {
    prices: {
      form: prices[0],
      to: prices[1],
    },
    sort: sort,
  }
  const fetchAPI = async () => {
    try {
      const result = await BrandServices.getBrandBySlug(slug);
      const catid = result.brand.id;
      setTitle(result.brand.name);
      const resultpro = await ProductServices.getProductByBrandId(page, catid, condition)
      setProducts(resultpro.products.data)
      setTotal(resultpro.total);
    }
    catch (error) {
      console.log('wait...')
    }
  }
  useEffect(function () {
    fetchAPI()
  }, [slug, prices])

      //------------pagination-------------
  const numberPage = Math.ceil(total / 8);
  const handlePageChange = (event) => {
    setPage(event.selected + 1);
    setReload(Date.now)
  };
  //-------thanh lọc giá--------
  useEffect(() => {
    if (!sliderRef.current) return;
  
    const priceSlider = sliderRef.current;
  
    noUiSlider.create(priceSlider, {
      start: [0, 1000000],
      connect: true,
      step: 50,
      margin: 200,
      range: {
        min: 0,
        max: 1000000
      },
      tooltips: true,
      format: wNumb({
        decimals: 0,
        prefix: ''
      })
    });
  
    const updatePriceRange = (values) => {
      document.getElementById('filter-price-range').textContent = values.join(' - ');
    };
  
    const setFinalPrices = (values) => {
      setPrices(values.map(value => parseInt(value.replace('$', ''), 10)));
    };
  
    priceSlider.noUiSlider.on('update', updatePriceRange);
    priceSlider.noUiSlider.on('change', setFinalPrices);
  
    return () => {
      if (priceSlider.noUiSlider) {
        priceSlider.noUiSlider.off('update', updatePriceRange);
        priceSlider.noUiSlider.off('change', setFinalPrices);
        priceSlider.noUiSlider.destroy();
      }
    };
  }, []);
    //----------sort--------
  const handleSortChange = (event) => {
    setSort(event.target.value);
    setReload(Date.now)
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission, e.g., trigger sorting based on selectedOption
    console.log('Selected sorting option:', sort);
  };

    return (
<>
  <main className="main">
    <div
      className="page-header text-center"
      style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
    >
      <div className="container">
        <h1 className="page-title">
          {title}<span>Thương hiệu</span>
        </h1>
      </div>
      {/* End .container */}
    </div>
    {/* End .page-header */}
    <nav aria-label="breadcrumb" className="breadcrumb-nav mb-2">
      <div className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="index.html">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Shop</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Grid 4 Columns
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
            <div className="toolbox">
              <div className="toolbox-left">
                <div className="toolbox-info">
                  Showing <span>9 of 56</span> Products
                </div>
                {/* End .toolbox-info */}
              </div>
              {/* End .toolbox-left */}
              <div className="toolbox-right">
                <div className="toolbox-sort">
                  <label htmlFor="sortby">Sort by:</label>
                  <div className="select-custom">
                    <select name="sortby" id="sortby" className="form-control">
                      <option value="popularity" selected="selected">
                        Most Popular
                      </option>
                      <option value="rating">Most Rated</option>
                      <option value="date">Date</option>
                    </select>
                  </div>
                </div>
                {/* End .toolbox-sort */}
                <div className="toolbox-layout">
                  <a href="category-list.html" className="btn-layout">
                    <svg width={16} height={10}>
                      <rect x={0} y={0} width={4} height={4} />
                      <rect x={6} y={0} width={10} height={4} />
                      <rect x={0} y={6} width={4} height={4} />
                      <rect x={6} y={6} width={10} height={4} />
                    </svg>
                  </a>
                  <a href="category-4cols.html" className="btn-layout active">
                    <svg width={22} height={10}>
                      <rect x={0} y={0} width={4} height={4} />
                      <rect x={6} y={0} width={4} height={4} />
                      <rect x={12} y={0} width={4} height={4} />
                      <rect x={18} y={0} width={4} height={4} />
                      <rect x={0} y={6} width={4} height={4} />
                      <rect x={6} y={6} width={4} height={4} />
                      <rect x={12} y={6} width={4} height={4} />
                      <rect x={18} y={6} width={4} height={4} />
                    </svg>
                  </a>
                </div>
                {/* End .toolbox-layout */}
              </div>
              {/* End .toolbox-right */}
            </div>
            {/* End .toolbox */}
            <div className="products mb-3">
              <div className="row justify-content-center">
                {products && products.map(function(product, index){
                          return (
                            <div className="col-6 col-md-4 col-lg-4">
                              <ProductItem03 key={index} product={product}/>
                            </div>
                          )
                      })}
              </div>
              {/* End .row */}
            </div>
            {/* End .products */}
            {/* <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center">
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
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item-total">of 6</li>
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
                    className="pagination justify-content-center"
                    previousLabel="«"
                    nextLabel="»"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
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
          <aside className="col-lg-3 order-lg-first">
            <div className="sidebar sidebar-shop">
              <div className="widget widget-clean">
                <label>Filters:</label>
                <a href="#" className="sidebar-filter-clear">
                  Clean All
                </a>
              </div>
              {/*Category */}
              <div className="widget widget-collapsible">
                <h3 className="widget-title">
                  <a
                    data-toggle="collapse"
                    href="#widget-1"
                    role="button"
                    aria-expanded="true"
                    aria-controls="widget-1"
                  >
                    Category
                  </a>
                </h3>
                {/* End .widget-title */}
                <div className="collapse show" id="widget-1">
                  <div className="widget-body">
                    <div className="filter-items filter-items-count">
                      <div className="filter-item">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="cat-1"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="cat-1"
                          >
                            Dresses
                          </label>
                        </div>
                        {/* End .custom-checkbox */}
                        <span className="item-count">3</span>
                      </div>
                      {/* End .filter-item */}
                      <div className="filter-item">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="cat-2"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="cat-2"
                          >
                            T-shirts
                          </label>
                        </div>
                        {/* End .custom-checkbox */}
                        <span className="item-count">0</span>
                      </div>
                      {/* End .filter-item */}
                      <div className="filter-item">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="cat-3"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="cat-3"
                          >
                            Bags
                          </label>
                        </div>
                        {/* End .custom-checkbox */}
                        <span className="item-count">4</span>
                      </div>
                      {/* End .filter-item */}
                      <div className="filter-item">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="cat-4"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="cat-4"
                          >
                            Jackets
                          </label>
                        </div>
                        {/* End .custom-checkbox */}
                        <span className="item-count">2</span>
                      </div>
                      {/* End .filter-item */}
                      <div className="filter-item">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="cat-5"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="cat-5"
                          >
                            Shoes
                          </label>
                        </div>
                        {/* End .custom-checkbox */}
                        <span className="item-count">2</span>
                      </div>
                      {/* End .filter-item */}
                      <div className="filter-item">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="cat-6"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="cat-6"
                          >
                            Jumpers
                          </label>
                        </div>
                        {/* End .custom-checkbox */}
                        <span className="item-count">1</span>
                      </div>
                      {/* End .filter-item */}
                      <div className="filter-item">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="cat-7"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="cat-7"
                          >
                            Jeans
                          </label>
                        </div>
                        {/* End .custom-checkbox */}
                        <span className="item-count">1</span>
                      </div>
                      {/* End .filter-item */}
                      <div className="filter-item">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="cat-8"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="cat-8"
                          >
                            Sportwear
                          </label>
                        </div>
                        {/* End .custom-checkbox */}
                        <span className="item-count">0</span>
                      </div>
                      {/* End .filter-item */}
                    </div>
                    {/* End .filter-items */}
                  </div>
                  {/* End .widget-body */}
                </div>
                {/* End .collapse */}
              </div>
              {/*  Size */}
              {/*  Colour */}
              {/* Price */}
              <div className="widget widget-collapsible">
                <h3 className="widget-title">
                  <a
                    data-toggle="collapse"
                    href="#widget-5"
                    role="button"
                    aria-expanded="true"
                    aria-controls="widget-5"
                  >
                    Price
                  </a>
                </h3>
                {/* End .widget-title */}
                <div className="collapse show" id="widget-5">
                  <div className="widget-body">
                    <div className="filter-price">
                      <div className="filter-price-text">
                        Price Range:
                        <span id="filter-price-range" />
                      </div>
                      {/* End .filter-price-text */}
                      <div id="price-slider" ref={sliderRef}/>
                      {/* End #price-slider */}
                    </div>
                    {/* End .filter-price */}
                  </div>
                  {/* End .widget-body */}
                </div>
                {/* End .collapse */}
              </div>
              {/* End .widget */}
            </div>
            {/* End .sidebar sidebar-shop */}
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

export default ProductBrand;