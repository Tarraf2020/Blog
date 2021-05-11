import { Component } from "react";
import NavBar from "../Nav/Navbar";
import pic1 from "./tv.jpg";
import "./Blog.css";


export default class Try extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-lg-8 mt-5">
              <h1 className="h1">
                Feel ‘Addicted’ to TV? Here’s What to Look For (and What to Do)
              </h1>
            </div>
            <div className="col-md-12 col-lg-3 mt-5">
              <div class="user_info">Written by: Crystal Raypole on January 29, 2020</div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 col-lg-8">
              <img className="img-fluid mt-3" src={pic1}></img>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-8 mt-3">
              <p className="Blog_text">
                According to 2019 research from the United States Bureau of
                Labor Statistics, Americans spend, on average, a little more
                than half of their leisure time watching TV. This is partly
                because TV’s gotten a lot better in recent years. Fancy cable
                isn’t as prohibitively expensive as it once was, and you can
                find just about anything you want on streaming sites. Plus, you
                aren’t just limited to your TV set anymore. Laptops, phones, and
                tablets can all get the job done, too. The evolution of TV has
                come with some unintended consequences, though. The Diagnostic
                and Statistical Manual of Mental Disorders (DSM) didn’t include
                TV addiction in its fifth edition. However, 2013 researchTrusted
                Source suggests excessive TV viewing shares considerable
                similarities with DSM-5 criteria for substance use disorder.
                Here’s a look at when your TV intake might warrant a closer look
                and what to do if it feels like too much
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
