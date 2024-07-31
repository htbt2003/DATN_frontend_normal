import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuServices from '../../services/MenuServices';

function MenuItem(props) {
    const rowmenu = props.menu
    const [menuchilds] = useState(props.menu.children);
    // menuchilds.lenght
  if(!props.menu.children){
    return(
        <li>
            <Link to={rowmenu.link}>{rowmenu.name}</Link>
        </li>
    )
  }
  else{
    return (
      <li>
      <Link to={rowmenu.link} className="sf-with-ul">
        {rowmenu.name}
      </Link>
      <ul>
        {props.menu.children && props.menu.children.map(function(menu, index){
            return (
                <li>
                    <Link to={menu.link} key={index}>{menu.name}</Link>
                </li>
            );
        })}
      </ul>
    </li>

    );
  }
}

export default MenuItem;