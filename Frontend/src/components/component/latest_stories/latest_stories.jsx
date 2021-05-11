import { Component } from "react";
import React from 'react';
import "./latest_stories.css";
import pic1 from  "./no.jpg";
import pic2 from "./no1.jpg";
import pic3 from "./sauce.jpg";
import pic4 from "./vac.jpg";
import { Link } from "react-router-dom";




export default class latest_stories extends Component{
    render(){
        return(
<div className="container">
<h2 className="row titles">Latest Stories</h2>
<div class="row ">
<div class="col-lg-3">
    <img src={pic1} class="img-fluid mt-3"></img>
    </div>
    <div class="col-lg-3 mb-5 ">
    <h3 class="mt-3">
    <Link className="links" to="/blog">Amazing Knafee!! So It's Tripoli</Link>
    </h3>   
    <p className="desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
    </div>
    <div class=" col-lg-3  ">
    <img src={pic2} class="img-fluid mt-3"></img>
    </div>
    <div class="col-lg-3  ">
    <h3 class="mt-3">
    <a href="#" className="links">Why Do Stars All Look Almost the Same Size?</a>   
    </h3>
    <p className="desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
    </div>
</div>

<div class="row ">
<div class="col-lg-3">
    <img src={pic3} class="img-fluid mt-3"></img>
    </div>
    <div class="col-lg-3 mb-5 ">
    <h3 class="mt-3">
    <a href="#" className="links">35 Best Salsa Recipes for every Celebration!</a>
    </h3>
    <p className="desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
    </div>
    <div class="col-lg-3  ">
    <img src={pic4} class="img-fluid mt-3"></img>
    </div>
    <div class="col-lg-3  ">
    <h3 class="mt-3">
    <a href="#" className="links">When Are We Supposed to Be Wearing Masks if We're Fully Vaccinated?</a>   
    </h3>
    <p className="desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
    </div>
</div>

   
</div>
        );
    }
}