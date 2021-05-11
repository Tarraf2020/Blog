import { Component } from 'react';
import './App.css';
import Timer from './components/Timer/Timer';


class App extends Component {

  async componentDidMount(){
   const response = await  fetch('http://localhost:8000/posts');
   const text = await response.text();
   console.log("we got a response!!",text);
   
  }

  render() {
return(
  <div className="App">
    <Timer timer1="111" timer2="222"/>
  </div>
)
  }

}

export default App;