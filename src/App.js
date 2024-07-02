import { Routes, Route, useNavigate } from "react-router-dom";
import LayoutSite from './layouts/LayoutSite';
import RouterApp from './router';
import React, { useEffect } from 'react';
import { clearAuth } from './redux/authSlice';
import {jwtDecode} from 'jwt-decode';
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import UserServices from './services/UserServices';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const checkTokenExpiration = async () => {
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const timeToken = decodedToken.exp * 1000;
          const currentTime = Date.now();

          if (timeToken && currentTime > timeToken - 30000) {
            await UserServices.logout();
            dispatch(clearAuth());
            swal("Cảnh báo", "Phiên của bạn đã hết hạn. Xin vui lòng đăng nhập lại.", "warning");
            navigate("/", { replace: true });
          }
        } catch (error) {
          console.error("Token decoding failed or other error occurred:", error);
        }
      }
    };

    const interval = setInterval(checkTokenExpiration, 1000); // Check every second
    return () => clearInterval(interval); // Cleanup
  }, [token, dispatch, navigate]);

  return (
    <Routes>
      <Route path='/' element={<LayoutSite />}>
        {RouterApp.RouterPublic.map((router, index) => {
          const Page = router.component;
          return <Route key={index} path={router.path} element={<Page />} />;
        })}
      </Route>
    </Routes>
  );
};

export default App;
