import React from "react";

class Car extends React.Component {
    constructor(props) {
        super(props);
        // Don't do this!
        const state={ data : "Hello World" }
       }
    
    render() {
      return(
      <div>
          <h2>I am a {this.props.color}!</h2>
      </div> 
      
      ); 
    }
  }
  function hi(props){
      console.log(this.props.color)
  }
  
  class Garage extends React.Component {
    render() {
        
      return (
          
        <div>
        <h1>Who lives in my garage?</h1>
        <Car color={this.state.data} />
        </div>
      );
    }
  }
  
export default Garage;