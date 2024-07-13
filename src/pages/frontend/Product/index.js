import { useEffect, useRef, useState } from 'react';
import ProductItem03 from '../../../components/ProductItem03.js';
import ProductServices from '../../../services/ProductServices';
import ReactPaginate from 'react-paginate';
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';

function Product() {
  const sliderRef = useRef(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sort, setSort] = useState(null);
  const [prices, setPrices] = useState([0, 0]);
  const [reload, setReload] = useState();
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [maxProductPrice, setMaxProductPrice] = useState(0);
  document.title = "Danh sách sản phẩm"

  const handleSortChange = (event) => {
    setSort(event.target.value);
    setReload(Date.now)
  };
  // useEffect(function () {
  //       window.scroll(0, 0);
  // }, []);

  const fetchAPI = async () => {
    var condition = {
      brands: selectedBrands,
      categories: selectedCategories,
      prices: {
        from: minPrice,
        to: maxPrice,
      },
      sort: sort,
    }
  
    try {
      const result = await ProductServices.getProductAll(page, condition);
      setMaxProductPrice(result.priceMax)
      setProducts(result.products.data);
      setTotal(result.total);
      setBrands(result.brands);
      setCategories(result.categories);
      setPrices([0, result.priceMax]);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(function () {
    fetchAPI();
  }, [reload, minPrice, maxPrice]);

  const numberPage = Math.ceil(total / 8);
  const handlePageChange = (event) => {
    setPage(event.selected + 1);
    setReload(Date.now)
  };
  //tạo price
  useEffect(() => {
    if (!sliderRef.current) return;
  
    const priceSlider = sliderRef.current;
  
    noUiSlider.create(priceSlider, {
      start: [0, maxProductPrice],
      connect: true,
      step: 50,
      margin: 200,
      range: {
        min: 0,
        max: maxProductPrice
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
      setMinPrice(parseInt(values[0].replace('$', ''), 10));
      setMaxPrice(parseInt(values[1].replace('$', ''), 10));
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
  }, [maxProductPrice]);
    const handleCheckboxCategory = (categoryId) => {
    const isSelected = selectedCategories.includes(categoryId);
    if (isSelected) {
      setSelectedCategories(prevSelected => prevSelected.filter(id => id !== categoryId));
    } else {
      setSelectedCategories(prevSelected => [...prevSelected, categoryId]);
    }
    setReload(Date.now)
  };

  const handleCheckboxBrand = (brandId) => {
    const isSelected = selectedBrands.includes(brandId);
    if (isSelected) {
      setSelectedBrands(prevSelected => prevSelected.filter(id => id !== brandId));
    } else {
      setSelectedBrands(prevSelected => [...prevSelected, brandId]);
    }
    setReload(Date.now)
  };

  return (
    <>
  <main className="main" style={{ backgroundColor: "#f9f9f9" }}>
    {/* <div
      className="page-header text-center"
      style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
    >
      <div className="container">
        <h1 className="page-title">
          Danh sách sản phẩm<span>Sản phẩm</span>
        </h1>
      </div>
    </div> */}
    <nav aria-label="breadcrumb" className="breadcrumb-nav mb-2 border border-5">
      <div className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="index.html">Trang chủ</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Sản phẩm</a>
          </li>
          {/* <li className="breadcrumb-item active" aria-current="page">
            Grid 4 Columns
          </li> */}
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
                  Hiển thị <span>9 đến 56</span> sản phẩm
                </div>
                {/* End .toolbox-info */}
              </div>
              {/* End .toolbox-left */}
              <div className="toolbox-right">
                <div className="toolbox-sort">
                  <label htmlFor="sortby">Sắp xếp:</label>
                  <div className="select-custom">
                    <select name="sortby" id="sortby" className="form-control" value={sort} onChange={handleSortChange}>
                      <option value={'ASC'}>Giá: Tăng dần</option>
                      <option value={'DESC'}>Giá: Giảm dần</option>
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
                {/* End .col-sm-6 col-lg-4 col-xl-3 */}
              </div>
              {/* End .row */}
            </div>
            {/* End .products */}
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
                <label>Lọc:</label>
                {/* <a href="#" className="sidebar-filter-clear">
                  Clean All
                </a> */}
              </div>
              {/* Category */}
              <div className="widget widget-collapsible">
                <h3 className="widget-title">
                  <a
                    data-toggle="collapse"
                    href="#widget-1"
                    role="button"
                    aria-expanded="true"
                    aria-controls="widget-1"
                  >
                    Danh mục
                  </a>
                </h3>
                {/* End .widget-title */}
                <div className="collapse show" id="widget-1">
                  <div className="widget-body">
                    <div className="filter-items filter-items-count">
                    {categories && categories.length > 0 && categories.map(function (category, index) {
                        return (
                          <div className="filter-item" key={index}>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input bg-white"
                              id={"category"+category.id}
                              onChange={() => handleCheckboxCategory(category.id)}
                              checked={selectedCategories.includes(category.id)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={"category"+category.id}
                            >
                              {category.name}
                            </label>
                          </div>
                          {/* End .custom-checkbox */}
                          <span className="item-count">3</span>
                        </div>
                        );
                    })}
                      {/* End .filter-item */}
                    </div>
                    {/* End .filter-items */}
                  </div>
                  {/* End .widget-body */}
                </div>
                {/* End .collapse */}
              </div>
              {/* Size */}
              {/* Colour */}
              {/* Brand*/}
              <div className="widget widget-collapsible">
                <h3 className="widget-title">
                  <a
                    data-toggle="collapse"
                    href="#widget-4"
                    role="button"
                    aria-expanded="true"
                    aria-controls="widget-4"
                  >
                    Thương hiệu
                  </a>
                </h3>
                {/* End .widget-title */}
                <div className="collapse show" id="widget-4">
                  <div className="widget-body">
                    <div className="filter-items">
                      {brands && brands.length > 0 && brands.map(function (brand, index) {
                          return (
                            <div className="filter-item" key={index}>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input  bg-white"
                                onChange={() => handleCheckboxBrand(brand.id)}
                                  checked={selectedBrands.includes(brand.id)}
                                  id={"brand"+brand.id}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor={"brand"+brand.id}
                              >
                                {brand.name}
                              </label>
                            </div>
                            {/* End .custom-checkbox */}
                          </div>
                          );
                      })}
                      {/* End .filter-item */}
                    </div>
                    {/* End .filter-items */}
                  </div>
                  {/* End .widget-body */}
                </div>
                {/* End .collapse */}
              </div>
              {/*  Price */}
              <div className="widget widget-collapsible">
                <h3 className="widget-title">
                  <a
                    data-toggle="collapse"
                    href="#widget-5"
                    role="button"
                    aria-expanded="true"
                    aria-controls="widget-5"
                  >
                    Giá
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

export default Product;
