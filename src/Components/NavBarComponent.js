import React from 'react';
import { Navbar, Button, Nav, Image, Form, FormControl, Modal, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getSearch } from '../functions/networkcalls';
class NavBarComponent extends React.Component {
    constructor(p) {
        super(p);
        this.handleSearch = this.handleSearch.bind(this);
    }
    render() {
        console.log(this.props.url);
        return (
            <div style={{ backgroundColor: '#F5F5F5' }}>
                <Navbar bg="dark" expand="lg">
                  
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <div >
                                <Link to="" style={{ fontSize: 19, marginRight: 10, color: '#fff' }}>Home</Link>
                            </div>
                            <div>
                                <Link to="/profile" style={{ fontSize: 19, marginRight: 10, color: '#fff' }}>Profile</Link>
                            </div>
                        </Nav>
                        {this.props.url === "/" ?
                            <Form inline>
                                <FormControl ref="search" type="text" placeholder="Search and rate movies ,Tv shows" className="mr-sm-2" />
                                <Button variant="outline-success" onClick={() => { this.handleSearch() }}>Search</Button>
                               
                            </Form> : null
                        }
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )

    }

    handleSearch() {
        console.log("press");
        this.props.setHeading("Search Result");
        console.log(this.refs.search.value);
        if (this.props.searchKey !== this.refs.search.value) {
            this.props.updateSearchKey(this.refs.search.value);
            this.props.updateSearchData([]);
        }

        getSearch(this.refs.search.value, this.props.pageNo).then(res => {
            this.props.updateSearchData([...this.props.searchData, ...res])
            this.props.updatePageNo(this.props.pageNo + 1);
        }, error => {
            console.log(error);
        })

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

    }
}

function mapDispatchToProps(dispacher) {
    console.log("dispacterr ");

    return {
        updateSearchData: (searchData) => dispacher({ type: "searchData", load: searchData }),
        updateSearchKey: (searchKey) => dispacher({ type: "searchKey", load: searchKey }),
        updatePageNo: (page) => dispacher({ type: "pageNo", load: page }),
        updateHasMore: (val) => dispacher({ type: "hasMore", load: val }),
        setHeading: (val) => dispacher({ type: "header", load: val })

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBarComponent);
///