// import { useEffect, useState } from "react";
// import TopicServices from "../../services/TopicServices"
// import { Link } from "react-router-dom";

// function TopicList() {
//     const [listTopic, setListTopic] = useState([]);
//     useEffect(function () {
//         (async function () {
//             const result = await TopicServices.getTopicByParentId(0)
//             setListTopic(result.data.topics)
//         })();
//     }, []);
//     return (
//         <div className="group_sidebar">
//             <div className="list-group navbar-inner ">
//                 <div className="mega-left-title btn-navbar title-hidden-sm">
//                     <h3 className="sb-title">Chủ đề bài viết</h3>
//                 </div>
//                 <ul className="nav navs sidebar menu" id="cssmenu">
//                     {listTopic.map(function (topic, index) {
//                         return (
//                             <li className="item" key={index}>
//                                 <Link to = {"/chu-de-bai-viet/"+topic.slug}>
//                                     <span>{topic.name}</span>
//                                 </Link>
//                             </li>
//                         )
//                     })}

//                 </ul>
//             </div>
//         </div>
//     );
// }

// export default TopicList;