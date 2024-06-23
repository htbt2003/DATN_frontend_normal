import { memo, useEffect, useState } from 'react';
import { urlImage } from '../../../config';
import BannerServices from '../../../services/BannerServices';
import { Link } from 'react-router-dom';

function Slider({ data }) {
  const sliders = data
    // const [sliders, setSliders] = useState([]);
    // useEffect(()=>{
    //   const fetchAPI = async ()=>{
    //     try{
    //       const result = await BannerServices.getByPosition("slidershow")
    //       setSliders(result.banners) 
    //     }
    //     catch(error){
    //       console.log('wait...')
    //     }
    //   }
    //   fetchAPI();
    // },[])
  return (
<div
  id="carousel1_indicator"
  className="slider-home-banner carousel slide"
  data-ride="carousel"
>
  <ol className="carousel-indicators">
  {sliders && sliders.map(function (slider, index) {
            if (index === 0) {
              return (
                <li
                data-target="#carousel1_indicator"
                data-slide-to={index}
                className="active"
              />
              );
            }
            else {
              return (
                <li
                data-target="#carousel1_indicator"
                data-slide-to={index}
              />
              );
            }
          })}
  </ol>
  <div className="carousel-inner">
  {sliders && sliders.map(function (slider, index) {
            if (index === 0) {
              return (
                <div className="carousel-item active">
                  <img src={urlImage + "banner/" + slider.image} alt="First slide" style={{width:"100%", height:"100%"}}/>
                </div>
              );
            }
            else {
              return (
                <div className="carousel-item">
                  <img src={urlImage + "banner/" + slider.image} alt="First slide"style={{width:"100%", height:"100%"}} />
                </div>
              );
            }
          })}
  </div>
  <a
    className="carousel-control-prev"
    href="#carousel1_indicator"
    role="button"
    data-slide="prev"
  >
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="sr-only">Previous</span>
  </a>
  <a
    className="carousel-control-next"
    href="#carousel1_indicator"
    role="button"
    data-slide="next"
  >
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="sr-only">Next</span>
  </a>
</div>
);
}

export default memo(Slider);