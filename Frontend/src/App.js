import { Component } from 'react';
import './App.css';
// import Timer from './components/Timer/Timer';


class App extends Component {

  state = {
    posts: [],
    post: {}
  }

 
  async componentDidMount(){
    
    await this.getposts();
    await this.getpostsID(5);
    // await this.acceptPost(6);
    // await this.deletepost();

  }

  getposts = async () => {

    try{
      const response = await fetch('//localhost:8000/')
      const answer = await response.json()
      if(answer.success){
        const posts = answer.result
        this.setState({posts})
      }else{
        const error_message = answer.message 
        this.setState({error_message})
      }
    }catch(err){
      this.setState({error_message:err.message})
    }
  }

  getpostsID = async id => {

    try{
      const response = await fetch(`//localhost:8000/posts/${id}`)
      const answer = await response.json()
      if(answer.success){
        const post = answer.result
        this.setState({post})
      }else{
        const error = answer.message 
        this.setState({error})
      }
    }catch(err){
      this.setState({error_message: err})
    }
  }

  deletepost = async id => {
    try {

      const response = await fetch(`//localhost:8000/dashboard/delete/${id}`);
      const result = await response.json();

      if (result.success) { 

        let statePots = [...this.state.posts].filter(post => post.id !== id);
        this.setState({ posts: statePots });

      } else this.setState({ error: result.message });

    } catch (err) {
      this.setState({ error_message: err })
    }
  }

  acceptPost = async (id) => {
    let url = `//localhost:8000/dashboard/accept/${id}`;
    try {
      const response = await fetch(url);
      const result = await response.json();

      if (result.success) { 

        let statePots = [...this.state.posts].filter(post => post.id !== id);
        this.setState({ posts: statePots });

      } else this.setState({ error: result.message });

    } catch (err) {
      this.setState({ error_message: err })
    }
  }

  render() {
    let { posts, post,  error } = this.state;
    return error ? ( <p>error</p>) : (
  <div className="App">
    <div>{post.name}</div>
    
    <hr />
    {/* <Timer timer1="111" timer2="222"/> */}
    {posts.map((post) =>(
      <div key={post.id}>
        <p>{post.name}</p>
      </div>
    ))}
  </div>
)
  } 

}

export default App;