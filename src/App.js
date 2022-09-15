import './App.css';
import React, { Component} from 'react'
import Navbar from './Components/Navbar';
import Newscomp  from './Components/Newscomp';
import LoadingBar from 'react-top-loading-bar'
import { 
  BrowserRouter as Router, 
  Routes,
  Route, 
} from "react-router-dom";

export default class App extends Component {

  // constructor(props) {
  //   super(props);
  //   this.ref = React.createRef(null);
  // }

  pSize = 8;
  apiKey = process.env.React_App_NEWS_API;
  state = {
    progress:0
  }
  setProgress = (progress)=>{
    this.setState({
      progress:progress
    })
  }
  render() {
    console.log("ren")
    return (
      <div>
        <Router>
          <Navbar/>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          {/* <LoadingBar color='#f11946' ref={this.ref} /> */}
          
          <Routes>
            <Route exact path="/"element={<Newscomp setProgress = {this.setProgress} apiKey ={this.apiKey}   key="gen" pSize={this.pSize} country="in" category="general"/>}/>
            <Route exact path="/business"element={<Newscomp setProgress = {this.setProgress} apiKey ={this.apiKey}   key="busi" pSize={this.pSize} country="in" category="business"/>}/> 
            <Route exact path="/health"element={<Newscomp setProgress = {this.setProgress} apiKey ={this.apiKey}   key="hea" pSize={this.pSize} country="in" category="health"/>}/>
            <Route exact path="/science"element={<Newscomp setProgress = {this.setProgress} apiKey ={this.apiKey}   key="sci" pSize={this.pSize} country="in" category="science"/>}/>
            <Route exact path="/sports"element={<Newscomp setProgress = {this.setProgress} apiKey ={this.apiKey}   key="spo" pSize={this.pSize} country="in" category="sports"/>}/>
            <Route exact path="/technology"element={<Newscomp setProgress = {this.setProgress} apiKey ={this.apiKey}   key="tec" pSize={this.pSize} country="in" category="technology"/>}/>
            <Route exact path="/entertainment"element={<Newscomp setProgress = {this.setProgress} apiKey ={this.apiKey}   key="ent" pSize={this.pSize} country="in" category="entertainment"/>}/>
            <Route exact path="/general"element={<Newscomp setProgress = {this.setProgress} apiKey ={this.apiKey}   key="gen" pSize={this.pSize} country="in" category="general"/>}/>
          </Routes>
        </Router>
      </div>
    )
  }
}
