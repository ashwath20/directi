import React from 'react';
import logo from './logo.svg';
import './App.css';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Nav from 'react-bootstrap/Nav'
import axios from 'axios';
import Successtab from './screens/Search'
import Search from './screens/Search';
import { Navbar, Button, Image, Form, FormControl, Modal, Card, Badge } from 'react-bootstrap';
import {connect} from 'react-redux';
import request from "superagent";
import debounce from "lodash.debounce";
import {getTopList} from './'



class Home extends React.Component {
  constructor(props){
    super(props);
    
  }
  componentDidMount(){
   getTopList().then(resp=>{
       this.props.setTopList(resp);
   })
  }
  render(){
      return(
          <div>
              <Jumbotron>
  <h1>Hello, world!</h1>
  <p>
    This is a simple hero unit, a simple jumbotron-style component for calling
    extra attention to featured content or information.
  </p>
  <p>
    <Button variant="primary">Learn more</Button>
  </p>
</Jumbotron>
<div style={{display:'flex',flexDirection:"row"}}>
{this.props.topList.map(item=>{
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src="holder.js/100px180" />
    <Card.Body>
      <Card.Title>Card Title</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk of
        the card's content.
      </Card.Text>
      <Button variant="primary">Go somewhere</Button>
    </Card.Body>
  </Card>
})}
</div>
          </div>
      )
  }
}
function mapStateToProps(state) {
    console.log("search");
    console.log(state);
    return {

        searchData: state.searchData,
        searchKey: state.searchKey,
        pageNo: state.pageNo,
        hasMore: state.hasMore,
        currentMovie: state.currentMovie,
        showModalRating: state.showModalRating,
        submitRating: state.submitRating,
        postUpdate: state.postUpdate,
        topList:state.topList

    }
}

function mapDispatchToProps(dispacher) {
    console.log("dispacterr ");

    return {
        updateSearchData: (searchData) => dispacher({ type: "searchData", load: searchData }),
        updateSearchKey: (searchKey) => dispacher({ type: "searchKey", load: searchKey }),
        updatePageNo: (page) => dispacher({ type: "pageNo", load: page }),
        updateHasMore: (val) => dispacher({ type: "hasMore", load: val }),
        updateCurrentMovie: (obj) => dispacher({ type: "currentMovie", load: obj }),
        togleShowRating: (val) => dispacher({ type: "rating", load: val }),
        showSubmittedLoader: (val) => dispacher({ type: "submitRating", load: val }),
        togleToast: (val) => dispacher({ type: "toast", load: val }),
        setTopList:(val)=>dispacher({type:"topList",load:val})


    }
}
//export default  App;
export default connect(mapStateToProps, mapDispatchToProps)(Home);
