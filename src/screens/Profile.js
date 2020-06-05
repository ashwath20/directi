import React from 'react';
import { Card, Button, thead, tr, th, tbody, Navbar, Nav, Modal,Table, Image, Alert, Toast } from 'react-bootstrap'

import stars from '../asset/profile.png';
import { connect } from 'react-redux';
import {getRatedList,guest_id} from '../functions/networkcalls'
import cookie from 'react-cookies'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import NavBarComponent from '../Components/NavBarComponent';

let gui;

class Profile extends React.Component {
    
   componentDidMount(){
    gui = cookie.load("guest");
    console.log(this.props.history.location.pathname);
            if (!gui) {
                guest_id().then(res => {
                    cookie.save("guest", res, { path: "/" });
                    gui = res;
                }, error => {
                    console.log(error);
                })
            }
            else{
getRatedList(gui.guest_session_id,"tv").then(resp=>{
this.props.updateRtv(resp);
console.log(resp)
},error=>{
    console.log(error);
});
getRatedList(gui.guest_session_id,"movies").then(resp=>{
    this.props.updateRmovies(resp);
    console.log(resp);
    },error=>{
        console.log(error)
    })
            }
 
   }
render(){
    let tempListData=[];
    return(
        <div>
          
          <NavBarComponent url={this.props.location.pathname}/>
          <div style={{    display: "flex",flexDirection:'row',
          justifyContent: "center",
          alignItems: "center"}}>
<Dialog onClose={()=>{this.props.togleProfile(false)}} aria-labelledby="simple-dialog-title" open={this.props.showProfile}>
      <DialogTitle id="simple-dialog-title">Review Summary</DialogTitle>
      <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th colSpan="3">Name</th>
                                        <th>Info</th>

                                    </tr>
                                </thead>
                                <tbody>
        {this.props.tempData.map((item) => (
         <tr>
         <td>{item.id}</td>
        <td colSpan="3">{item.title?item.title:item.original_name}</td>
         <td>{item.rating}</td>

     </tr>
        ))}
</tbody>
</Table>
      
    </Dialog>
<Card style={{ width: 200, marginRight:50, }}>
,
<Image rounded src= {stars} style={{ width: 80, height: 80,marginLeft:40, alignContent: 'center', justifyContent: 'center', alignItems: 'center', elevation: 10, marginTop: 5, paddingLeft: 5, paddingBottom: 5, paddingRight: 5 }} />

  
  <Card.Body>
    <Card.Title style={{marginLeft:30}}> Guest User</Card.Title>
    <Card.Text style={{marginLeft:30}}>
    Since you are a guest user your account will expire in 24 hr
     
    </Card.Text>
    
  
  </Card.Body>

</Card>
</div>  
<div style={{display:'flex',flexDirection:'row',marginLeft:350}}>
{this.props.profileData.map(obj=>{
    let j=this.props.Rmovies.results.length;
    if(obj.text==="Reviews")
    j=this.props.Rtv.results.length+this.props.Rmovies.results.length
    else if(obj.text==="TV Shows")
    j=this.props.Rtv.results.length
    return(<div onClick={()=>{this.props.togleProfile(true)}}>
        <Card style={{ width: 200,  marginRight:50,marginTop:50 }} onClick={()=>{
            if(obj.key==1)
        this.props.setTempData([...this.props.Rtv.results,...this.props.Rmovies.results]);
        else if(obj.key==2)
        this.props.setTempData(this.props.Rtv.results);
        else{
            this.props.setTempData( this.props.Rmovies.results)
        }
            this.props.togleProfile(true)}}>

<Image rounded src= {obj.path} style={{ width: 80, height: 80,marginLeft:40, alignContent: 'center', justifyContent: 'center', alignItems: 'center', elevation: 10, marginTop: 5, paddingLeft: 5, paddingBottom: 5, paddingRight: 5 }} />

  
  <Card.Body style={{marginLeft:30}}>
    <Card.Title>{obj.text}</Card.Title>
    
    <Button variant="primary">{j}</Button>
  
  </Card.Body>

</Card>

        </div>)
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
        profileData:state.profileData,
        Rtv:state.Rtv,
        Rmovies:state.Rmovies,
        showProfile:state.showProfile,
        tempData:state.tempData,

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
        updateRmovies:(val)=>dispacher({type:"Rmovies",load:val}),
        updateRtv:(val)=>dispacher({type:"Rtv",load:val}),
        togleProfile:(val)=>dispacher({type:"showProfile",load:val}),
        setTempData:(val)=>dispacher({type:"tempData",load:val})


    }
}
//export default  App;
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
//export default  Profile