import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Account = () => {
    return (
<>
  <main className="main">
    <div
      className="page-header text-center"
      style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
    >
      <div className="container">
        <h1 className="page-title">
          My Account<span>Shop</span>
        </h1>
      </div>
      {/* End .container */}
    </div>
    {/* End .page-header */}
    <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
      <div className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="index.html">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Shop</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            My Account
          </li>
        </ol>
      </div>
      {/* End .container */}
    </nav>
    {/* End .breadcrumb-nav */}
    <div className="page-content">
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <aside className="col-md-4 col-lg-3">
              <ul
                className="nav nav-dashboard flex-column mb-3 mb-md-0"
                role="tablist"
              >
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="tab-dashboard-link"
                    data-toggle="tab"
                    href="#tab-dashboard"
                    role="tab"
                    aria-controls="tab-dashboard"
                    aria-selected="true"
                  >
                    Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="tab-orders-link"
                    data-toggle="tab"
                    href="#tab-orders"
                    role="tab"
                    aria-controls="tab-orders"
                    aria-selected="false"
                  >
                    Orders
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="tab-downloads-link"
                    data-toggle="tab"
                    href="#tab-downloads"
                    role="tab"
                    aria-controls="tab-downloads"
                    aria-selected="false"
                  >
                    Downloads
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="tab-address-link"
                    data-toggle="tab"
                    href="#tab-address"
                    role="tab"
                    aria-controls="tab-address"
                    aria-selected="false"
                  >
                    Adresses
                  </a>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    id="tab-account-link"
                    data-toggle="tab"
                    href="#tab-account"
                    role="tab"
                    aria-controls="tab-account"
                    aria-selected="false"
                    to={'/tai-khoan/thong-tin'}
                  >
                    Thông tin tài khoản
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/tai-khoan/thong-tin'}>
                    Sign Out
                  </Link>
                </li>
              </ul>
            </aside>
            {/* End .col-lg-3 */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </div>
      {/* End .dashboard */}
    </div>
    {/* End .page-content */}
  </main>
  {/* End .main */}
</>


    );
}
  
export default Account;

