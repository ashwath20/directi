import React from 'react';
import { Card, Button, thead, tr, th, tbody, Navbar, Nav,Dropdown,Table, Image, Alert, Toast } from 'react-bootstrap'
import { guest_id } from '../functions/networkcalls';
import { getEach } from '../functions/networkcalls';
import { postRating } from '../functions/networkcalls';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Icon from '@material-ui/core/Icon';
import Rating from '@material-ui/lab/Rating';
import Modal from '@material-ui/core/Modal';
import cookie from 'react-cookies'
import NavBarComponent from '../Components/NavBarComponent'
let gui;
let message = "empty";
class Search extends React.Component {
    componentDidMount() {
        gui = cookie.load("guest");
        ;
        console.log(this.props.history.location.pathname);
        if (!gui) {
            ;
            guest_id().then(res => {
                cookie.save("guest", res, { path: "/" });
                gui = res;
            }, error => {;

                console.log(error);
            })
        }
        let path = this.props.location.pathname.split('/');
        
        console.log(path[path.length - 1]);
        getEach(path[path.length - 1], path[path.length - 2]).then(res => {
            console.log(res)
            this.props.updateCurrentMovie(res)
            console.log(path[path.length-2]);
            if(path[path.length-2]+""==="tv")
        {
            console.log("Calling get crt");
            console.log(this.props.currentMovie);
            this.getCreatorsdetail();
        }
        }, error => {
            console.log(error);
        });

    }
    render() {
        let rating = 0;
        return (

            <div style={{ width: '100%' }}>

                <NavBarComponent url={this.props.location.pathname} />
                {this.props.postUpdate ?
                    <Toast>
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                            <strong className="mr-auto" style={{ color: message === "Review Recorded" ? "#32CD32" : "#FF00" }}>Review</strong>
                            <small>just now</small>
                        </Toast.Header>
                        <Toast.Body>{message}</Toast.Body>
                    </Toast> : null
                }

                <div style={{
                    elevation: 10, backgroundColor: '#FFFFFF', shadowColor: '#001',
                    marginTop: 20,
                    marginBottom: 20,
                    marginLeft: 20,
                    marginRight: 20,
                    shadowOffset: {
                        width: 0,
                        height: 20
                    },

                    shadowRadius: 20,
                    shadowOpacity: 1.0
                }} >

                    {this.props.currentMovie === "nan" ? <p>loading....</p> :
                        <div>
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Card style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>

                                    <div style={{ width: 210, height: 210, backgroundColor: '#0001', elevation: 10, marginBottom: 20 }} >
                                        <Image rounded src={this.props.currentMovie.poster_path === null ? "https://picsum.photos/id/237/200/300" : "https://image.tmdb.org/t/p/w500/" + this.props.currentMovie.poster_path} style={{ width: 200, height: 200, alignContent: 'center', justifyContent: 'center', alignItems: 'center', elevation: 10, marginTop: 5, paddingLeft: 5, paddingBottom: 5, paddingRight: 5 }} />

                                    </div>

                                    <Card.Body>
                                        <Card.Title> {this.props.currentMovie.title}</Card.Title>
                                        <Card.Text>
                                            {this.props.currentMovie.overview}
                                        </Card.Text>
                                        <Button variant="primary" onClick={() => { this.props.togleShowRating(true) }}>Rate the Movie</Button>
                                        <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Dropdown Button
  </Dropdown.Toggle>

  <Dropdown.Menu>
      {this.props.creators.map(item=>  {
          console.log(item);
      return ( 
        <Link to={"/creator/"+item} >   {item}</Link>)})}
  
  </Dropdown.Menu>
</Dropdown>
                                    </Card.Body>

                                </Card>
                            </div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th colSpan="2">Name</th>
                                        <th>Info</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td colSpan="2">Movie name</td>
                                        <td>{this.props.currentMovie.title ? this.props.currentMovie.title : this.props.currentMovie.original_name}</td>

                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td colSpan="2">Type</td>
                                        <td>{this.props.currentMovie.genres.map(a => a.name + " , ")}</td>

                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td colSpan="2">release_date</td>
                                        <td>{this.props.currentMovie.release_date ? this.props.currentMovie.release_date : this.props.currentMovie.first_air_date}</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td colSpan="2">Vote average</td>
                                        <td>{this.props.currentMovie.vote_average}/10</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td colSpan="2">Total Vote</td>
                                        <td>{this.props.currentMovie.vote_count}</td>
                                    </tr>
                                </tbody>
                            </Table>

                        </div>
                    }
                    <div
                        aria-live="polite"
                        aria-atomic="true"
                        style={{
                            position: 'relative',
                            minHeight: '100px',
                        }}
                    >

                    </div>
                    <Modal
                        open={this.props.showModalRating}
                        onClose={() => { this.props.togleShowRating(false) }}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <div style={{

                            width: 450, height: 200, display: "flex",
                            justifyContent: "center",
                            backgroundColor: '#fff',
                            alignItems: "center",
                            marginTop: 100,
                            marginLeft: 450,
                            alignContent: 'center',
                            flexDirection: 'row',
                        }}>
                            <div style={{
                                paddingLeft: 10



                            }}>
                                <Rating
                                    name="half-rating"
                                    defaultValue={2.5}
                                    precision={0.5} max={10}
                                    onChange={(event, newValue) => {
                                        console.log(newValue)
                                        rating = newValue;
                                        console.log(rating);
                                    }}
                                    style={{ backgroundColor: '#fff' }} />
                                {}
                                {this.props.submitRating ?
                                    <CircularProgress color="secondary" />
                                    : null}
                                   
                                <Button variant="primary" style={{ alignContent: 'center', display: "flex", justifyContent: "center", alignItems: "center", width: 150, marginLeft: 35, marginTop: 10 }}
                                    onClick={() => {


                                        postRating(gui.guest_session_id, this.props.currentMovie.id, rating, this.props.history.location.pathname.split("/")[2]).then(res => {
                                            this.props.showSubmittedLoader(false);
                                            message = "Review Recorded"
                                            this.props.togleToast(true);
                                            setTimeout(() => { this.props.togleToast(false); }, 5000);
                                            this.props.togleShowRating(false)
                                            this.props.showSubmittedLoader(false);
                                            toast("Movie review updated", { type: toast.TYPE.SUCCESS, autoClose: 5000 })

                                        }, err => {
                                            console.log(err);
                                            message = "error has occured";
                                            this.props.togleToast(true);

                                            setTimeout(() => { this.props.togleToast(false); }, 5000);
                                            this.props.togleToast(true);
                                            this.props.togleShowRating(false);
                                            toast("somthing end wrong", { type: toast.TYPE.ERROR, autoClose: 5000 })
                                            this.props.showSubmittedLoader(false);


                                        })
                                    }}>
                                    Rate the Movie</Button>
                            </div>


                        </div>
                    </Modal>

                </div>
            </div>


        )

        
    }
    getCreatorsdetail=()=>{
        let c_id=[];
        for(let i=0;i<this.props.currentMovie.created_by.length;i++){
            if(this.props.currentMovie.created_by[i])
            c_id.push(this.props.currentMovie.created_by[i].id);
        }
        console.log(c_id);
        this.props.updateCreator(c_id);

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
        creators:state.creators

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
        updateCreator:(val)=>dispacher({ type: "creatorList", load: val }),


    }
}
//export default  App;
export default connect(mapStateToProps, mapDispatchToProps)(Search);

//<Card.Img variant="top" src={"https://picsum.photos/id/237/200/300":this.props.currentMovie.backdrop_path}/>
