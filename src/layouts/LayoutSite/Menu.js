import { Link } from "react-router-dom";
import MenuItem from "./MenuItem";
import MenuServices from '../../services/MenuServices';
import { useEffect, useState } from "react";
import TopicServices from "../../services/TopicServices"

function Menu() {
  const [menus, setMenus] = useState([]);
  const [topics, setTopics] = useState([]);
  const fetchApi = async ()=>{
    try {
      const [menusResult, topicsResult] = await Promise.all([
        MenuServices.getByParentId("mainmenu"),
        TopicServices.getAll(),
      ]);
      setMenus(menusResult.menus);
      setTopics(topicsResult.topicsAll);
    }
    catch {
      console.log("wait..")
    }
  }
  console.log(menus)
  useEffect(function () {
    fetchApi();
  }, [])
  return (
    <div className="">
    <nav className="main-nav">
      <ul className="menu sf-arrows">
        <li className="megamenu-container">
          <Link  to={"/"}>
            Trang chủ
          </Link>
        </li>
        <li>
          <Link to={"/san-pham"}>
            Sản phẩm
          </Link>
        </li>
        {menus && menus.map(function (menu, index) {
                    return <MenuItem key={index} menu={menu} />
                  })}
        {/* <li>
          <a href="#" className="sf-with-ul">
            Pages
          </a>
          <ul>
            <li>
              <a href="about.html" className="sf-with-ul">
                About
              </a>
              <ul>
                <li>
                  <a href="about.html">About 01</a>
                </li>
                <li>
                  <a href="about-2.html">About 02</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="contact.html" className="sf-with-ul">
                Contact
              </a>
              <ul>
                <li>
                  <a href="contact.html">Contact 01</a>
                </li>
                <li>
                  <a href="contact-2.html">Contact 02</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="login.html">Login</a>
            </li>
            <li>
              <a href="faq.html">FAQs</a>
            </li>
            <li>
              <a href="404.html">Error 404</a>
            </li>
            <li>
              <a href="coming-soon.html">Coming Soon</a>
            </li>
          </ul>
        </li> */}
        <li>
          <Link to='lien-he'>Liên hệ</Link>
        </li>
        <li>
          <Link to={"/bai-viet"} className="sf-with-ul">
            Bài viết
          </Link>
          <ul>
              {topics.map(function (topic) {
                  return (
                    <li>
                      <Link to={'/chu-de-bai-viet/' + topic.slug} >{topic.name}</Link>
                    </li>
                  );
                })}
          </ul>
        </li>
      </ul>
      {/* End .menu */}
    </nav>
    {/* End .main-nav */}
  </div>
);
}

export default Menu;