import React from 'react';
import { Card, Button, thead, tr, th, tbody, Navbar, Nav, Table, Image, Alert, Toast } from 'react-bootstrap'
import { guest_id } from '../functions/networkcalls';
import { getEach } from '../functions/networkcalls';
import { getCreator } from '../functions/networkcalls';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';

import { connect } from 'react-redux';
import Icon from '@material-ui/core/Icon';
import Rating from '@material-ui/lab/Rating';
import Modal from '@material-ui/core/Modal';
import cookie from 'react-cookies'
import NavBarComponent from '../Components/NavBarComponent'
let gui;
let message = "empty";
class Creator extends React.Component {
    state={data:[]}
    componentDidMount(){
        let temp=this.props.location.pathname.split('/')
        getCreator( temp[temp.length-1]).then(resp=>{
console.log(resp)
this.setState({data:resp});

        },error=>{

        })
    }
render(){
    return (<div>
        <p> {this.state.data.name}</p>
        <p> {this.state.data.biography}</p>
        <p> {this.state.data.birthday}</p>
        <p> {this.state.data.birthday}</p>
        <p> {this.state.data.imdb_id}</p>
       
    </div>)
}
}
export default Creator;