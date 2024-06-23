import { Link } from "react-router-dom";
import MenuServices from '../../services/MenuServices';
import { useEffect, useState } from "react";
import PostServices from '../../services/PostServices';

function Copyright() {
    // const [menus, setMenus] = useState([]);
    // const [posts, setPosts] = useState([]);
    // useEffect(function(){
    //     (async function(){
    //         try{
    //             const result = await MenuServices.getByParentId("footermenu", 0)
    //             setMenus(result.data.menus)    
    //         }
    //         catch(error){
    //             console.log(error)
    //         }
    //     })();
    // },[])
    // useEffect(function(){
    //     (async function(){
    //         try{
    //             const result = await PostServices.getByType(8, "page")
    //             setPosts(result.data.posts)    
    //         }
    //          catch(error){
    //             console.log(error)
    //         }
    //     })();
    // },[])
    return (
        <div className="footer_area">
  <div className="footer_top">
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="footer_widget">
            <h3>About us</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="footer_widget_contect">
              <p>
                <i className="fa fa-map-marker" aria-hidden="true" /> 19
                Interpro Road Madison, AL 35758, USA
              </p>
              <p>
                <i className="fa fa-mobile" aria-hidden="true" /> (012) 234 432
                3568
              </p>
              <Link href="#">
                <i className="fa fa-envelope-o" aria-hidden="true" />{" "}
                Contact@plazathemes.com{" "}
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="footer_widget">
            <h3>My Account</h3>
            <ul>
              <li>
                <Link href="#">Your Account</Link>
              </li>
              <li>
                <Link href="#">My orders</Link>
              </li>
              <li>
                <Link href="#">My credit slips</Link>
              </li>
              <li>
                <Link href="#">My addresses</Link>
              </li>
              <li>
                <Link href="#">Login</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="footer_widget">
            <h3>Informations</h3>
            <ul>
              <li>
                <Link href="#">Specials</Link>
              </li>
              <li>
                <Link href="#">Our store(s)!</Link>
              </li>
              <li>
                <Link href="#">My credit slips</Link>
              </li>
              <li>
                <Link href="#">Terms and conditions</Link>
              </li>
              <li>
                <Link href="#">About us</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="footer_widget">
            <h3>extras</h3>
            <ul>
              <li>
                <Link href="#"> Brands</Link>
              </li>
              <li>
                <Link href="#"> Gift Vouchers </Link>
              </li>
              <li>
                <Link href="#"> Affiliates </Link>
              </li>
              <li>
                <Link href="#"> Specials </Link>
              </li>
              <li>
                <Link href="#"> Privacy policy </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="footer_bottom">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6 col-md-6">
          <div className="copyright_area">
            <ul>
              <li>
                <Link href="#"> about us </Link>
              </li>
              <li>
                <Link href="#"> Customer Service</Link>
              </li>
              <li>
                <Link href="#"> Privacy Policy</Link>
              </li>
            </ul>
            <p>
              Copyright © 2018 <Link href="#">Pos Coron</Link>. All rights reserved.{" "}
            </p>
          </div>
        </div>
        <div className="col-lg-6 col-md-6">
          <div className="footer_social text-right">
            <ul>
              <li>
                <Link href="#">
                  <i className="fa fa-facebook" />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <i className="fa fa-twitter" />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <i className="fa fa-google-plus" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link className="pinterest" href="#">
                  <i className="fa fa-pinterest-p" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <i className="fa fa-wifi" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    );
}

export default Copyright;