import React from 'react';
import logo from './logo.svg';
import './App.css';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Nav from 'react-bootstrap/Nav'
import axios from 'axios';
import Successtab from './screens/Search'
import Search from './screens/Search';
import { Navbar, Container, Button, Image, Form, FormControl, Modal, Card, Badge } from 'react-bootstrap';
import { connect } from 'react-redux';
import request from "superagent";
import debounce from "lodash.debounce";
import { Link } from 'react-router-dom';
import NavBarComponent from './Components/NavBarComponent';
import { getTopList } from '../src/functions/networkcalls';
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
  constructor(props) {
    super(props);
    this.handleLink = this.handleLink.bind(this);

  }



  componentDidMount() {
    if(this.props.searchData.length==0){
    getTopList().then(resp => {
      this.props.updateSearchData(resp.results);
    }, error => {
      console.log(error);
    })
  }

  }
  handleLink(path) {
    return (<Link to={path}></Link>)
  }
  render() {
    return (
      <div style={{ backgroundColor: '#F5F5F5' }}>

        <NavBarComponent url={this.props.location.pathname} />
        <Jumbotron style={{ backgroundColor: "#444444", marginTop: '60' }}  >
          <Container >
            <h1 style={{ color: '#fff' }}>Upfloat</h1>
            <p style={{ color: '#fff' }}>
              Upfloat is the most trusted measurement of quality for Movies & TV. The definitive site for Reviews and Ratings
             
    </p>
          </Container>
        </Jumbotron>
        <div style={{ marginRight: 10, marginTop: 15, marginLeft: 10, }} >


          <Card style={{ width: '100%', height: '100%', backgroundColor: '#FFFFFF' }}>

            <Card.Body>

              <Search />:

  </Card.Body>
          </Card>

        </div>
      </div>
    );

  }
}
function mapStateToProps(state) {
  console.log("state");
  console.log(state);
  //console.log(state.dataNews.length);
  return {

    searchData: state.searchData,


  }
}

function mapDispatchToProps(dispacher) {
  console.log("dispacterr ");

  return {
    updateSearchData: (searchData) => dispacher({ type: "searchData", load: searchData })

  }
}
//export default  App;
export default connect(mapStateToProps, mapDispatchToProps)(App);


