import React from 'react';
import { Navbar, Button, Nav, Image, Form, FormControl, Modal, Card, Badge } from 'react-bootstrap';
import TitlebarGridList from '../Components/CustomeGrid';
import { connect } from 'react-redux';

import InfiniteScroll from 'react-infinite-scroller';
import { getSearch } from '../functions/networkcalls';
import { CardBody } from 'react-bootstrap/Card';
class Search extends React.Component {

    state =
        {
            message: "Loading...", showimgmodal: false, popup: null, json: [{ query: [] }],
            isLoading: false, ondate: null, fromdate: null, todate: null, desc: "", tags: "",

        }
        constructor(p){
            super(p);
            this.cbHandleMovieClick=this.cbHandleMovieClick.bind(this);
        }
    render() {
        return (<div style={{
            alignContent: 'center',
            backgroundColor: '#fff',
            height: '100%',
            shadowColor: '#001',
            shadowOffset: {
                width: 0,
                height: 10
            },
            shadowRadius: 10,
            shadowOpacity: 1.0
        }}>


            {this.props.searchData.length < 1 ?
                <div style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>  <p >Search Movie... </p>
                </div>
                :
                <InfiniteScroll
                    pageStart={0}
                    loadMore={() => {
                        if (this.props.searchData.length > 0) {
                            getSearch(this.props.searchKey, this.props.pageNo).then(res => {
                                this.props.updateSearchData([...this.props.searchData, ...res])
                                this.props.updatePageNo(this.props.pageNo + 1);
                                this.props.updateHasMore(false);

                            }, error => {
                                console.log(error);
                            })
                                ;
                        }
                    }}
                    hasMore={this.props.hasMore}
                    threshold={0}

                >
                    <Card>
                        <Card.Header><h2>{this.props.header}</h2></Card.Header>
                        <Card.Body>
                            <TitlebarGridList  cbHandleMovieClick={this.cbHandleMovieClick}images={this.props.searchData} callback={this.callback} style={{ width: '100%', height: 500 }} />
                        </Card.Body>
                    </Card>
                </InfiniteScroll>
            }
        </div>)
    }
    cbHandleMovieClick() {
        try {
            //this.props.updateCurrentMovie(object);
 this.props.updateHasMore(true)
         } catch (e) {

        }
    }



} function mapStateToProps(state) {
    console.log("search");
    console.log(state);
    return {

        searchData: state.searchData,
        searchKey: state.searchKey,
        pageNo: state.pageNo,
        hasMore: state.hasMore,
        header: state.header,

    }
}

function mapDispatchToProps(dispacher) {
    console.log("dispacterr ");

    return {
        updateSearchData: (searchData) => dispacher({ type: "searchData", load: searchData }),
        updateSearchKey: (searchKey) => dispacher({ type: "searchKey", load: searchKey }),
        updatePageNo: (page) => dispacher({ type: "pageNo", load: page }),
        updateHasMore: (val) => dispacher({ type: "hasMore", load: val })
    }
}
//export default  App;
export default connect(mapStateToProps, mapDispatchToProps)(Search);

