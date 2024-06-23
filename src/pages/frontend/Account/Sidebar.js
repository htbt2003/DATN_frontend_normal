import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserServices from '../../../services/UserServices';
import { useDispatch } from "react-redux";
import { clearAuth } from "../../../redux/authSlice";
import swal from "sweetalert";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const logoutSubmit = async (e) => {
    try {
      const result = await UserServices.logout();
      dispatch(clearAuth());
      swal("Success", result.message, "success");
      navigator("/", { replace: true })
    }
    catch (error) {
      console.log(error)
    }
  }
    return (
        <aside className="col-md-4 col-lg-2">
        <ul
          className="nav nav-dashboard flex-column mb-3 mb-md-0"
          role="tablist"
        >
          <li className="nav-item">
            <Link
              className="nav-link"
              id="tab-orders-link"
              data-toggle="tab"
              href="#tab-orders"
              role="tab"
              aria-controls="tab-orders"
              aria-selected="false"
              to={"/tai-khoan/don-hang-cua-toi"}
            >
              Đơn hàng của tôi
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              id="tab-address-link"
              data-toggle="tab"
              href="#tab-address"
              role="tab"
              aria-controls="tab-address"
              aria-selected="false"
              to={'/tai-khoan/so-dia-chi'}
            >
              Sổ địa chỉ
            </Link>
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
              to={'/tai-khoan/thong-tin-ca-nhan'}
            >
              Thông tin tài khoản
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" onClick={()=>logoutSubmit()}>
              Đăng xuất
            </Link>
          </li>
        </ul>
      </aside>


    );
}
  
export default Sidebar;

