import { useEffect, useState } from "react";
import CategoryServices from "../../services/CategoryServices"
import { Link } from "react-router-dom";
import React from 'react';

function CategoryList() {
  const [isStyled, setIsStyled] = useState(false);
  const myFunction = () => {
    const element = document.getElementById("myDIV");
    element.classList.toggle("mystyle");
    setIsStyled((prevIsStyled) => !prevIsStyled);
  };
  // const [listCategory, setListCategory] = useState([]);
  // useEffect(function () {
  //     (async function () {
  //         const result = await CategoryServices.getCategoryByParentId(0)
  //         setListCategory(result.data.categories)
  //     })();
  // }, []);
  return (
    <>
      {/*sidebar banner*/}
      <div className="sidebar_widget banner mb-35">
        <div className="banner_img mb-35">
          <Link href="#">
            <img src="assets\img\banner\banner5.jpg" alt="" />
          </Link>
        </div>
        <div className="banner_img">
          <Link href="#">
            <img src="assets\img\banner\banner6.jpg" alt="" />
          </Link>
        </div>
      </div>
      {/*sidebar banner end*/}

      {/*categorie menu start*/}
      <div className="sidebarrr_widget catrgorie mb-35">
        <h3>Categories</h3>
        <ul>
          <li className="has-sub sub" data-toggle="collapse" data-target="#collapseExample">
            <Link href="#">
              <i className="fa fa-caret-right" /> Men
            </Link>
            <ul className="categorie_sub collapse" id="collapseExample">
              <li>
                <Link href="#">
                  <i className="fa fa-caret-right" /> Accessories
                </Link>
                <ul className="categorie_sub">
                  <li>
                    <Link href="#">
                      <i className="fa fa-caret-right" /> Accessories
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="fa fa-caret-right" /> Dresses
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="fa fa-caret-right" /> Tops
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="fa fa-caret-right" /> HandBags
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="#">
                  <i className="fa fa-caret-right" /> Dresses
                </Link>
              </li>
              <li>
                <Link href="#">
                  <i className="fa fa-caret-right" /> Tops
                </Link>
              </li>
              <li>
                <Link href="#">
                  <i className="fa fa-caret-right" /> HandBags
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      {/*categorie menu end*/}
    </>

  );
}

export default CategoryList;