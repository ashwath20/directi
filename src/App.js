import React from 'react';
import logo from './logo.svg';
import './App.css';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Nav from 'react-bootstrap/Nav'
import axios from 'axios';
import {Link} from 'react-router-dom';
import Successtab from './screens/Search'
import Search from './screens/Search';
import { Navbar, Button, Image, Form, FormControl, Modal, Card, Badge } from 'react-bootstrap';
import {connect} from 'react-redux';
import request from "superagent";
import debounce from "lodash.debounce";



window.onscroll = debounce(() => {
  if (
    window.innerHeight + document.documentElement.scrollTop
    === document.documentElement.offsetHeight
  ) {
    console.log("call again");
    // Do awesome stuff like loading more content!
  }
}, 100);
class App extends React.Component {
  constructor(props){
    super(props);
    
  }
  

  
  componentDidMount(){
    
  }
  render(){
  return (
    <div style={{backgroundColor:'#F5F5F5'}}>
      <Navbar bg="dark" expand="lg">
  <Navbar.Brand href="/"style={{color:'#fff'}} >Home</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Link to="/" style={{color:'#fff'}}>Search</Link>
      <Link to="/profile" style={{color:'#fff'}}>Profile</Link>
      
    </Nav>
    
  </Navbar.Collapse>
</Navbar>
    <div style={{marginRight:10,marginTop:15,marginLeft:10, }} >

     
    <Card style={{ width: '100%',height:'100%',backgroundColor:'#FFFFFF' }}>
  
  <Card.Body>
   
  <Search/>:
  
  </Card.Body>
</Card>
      
    </div>
    </div>
  );

}
}
function mapStateToProps (state){
  console.log("state");
  console.log(state);
  //console.log(state.dataNews.length);
  return {
    
    searchData:state.searchData,
  
  
  }
  }
  
  function mapDispatchToProps (dispacher){
    console.log("dispacterr ");
   
    return{
      updateSearchData:(searchData)=>dispacher({type:"searchData",load:searchData})
     
    }
  }
  //export default  App;
  export default  connect(mapStateToProps,mapDispatchToProps)(App);
  

