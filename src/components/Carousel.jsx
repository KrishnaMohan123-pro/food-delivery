import React from 'react'
import Search from './Search'

export default function Carousel(props) {
  return (
    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit: 'contain'}}>
  <div className="carousel-inner">
  <div className='carousel-caption' style={{zIndex: '10'}}>
    <Search handleSearch={props.handleSearch}/>
  </div>
    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/900X700/?burger" className="d-block w-100" style={{height: '500px', width: '100%', filter:'brightness(30%)'}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900X700/?pizza" className="d-block  w-100" style={{height: '500px', width: '100%', filter:'brightness(30%)'}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900X700/?dosa" className="d-block  w-100" style={{height: '500px', width: '100%', filter:'brightness(30%)'}} alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
  )
}
