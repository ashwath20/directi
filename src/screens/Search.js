import React from 'react';
import { Navbar, Button, Nav, Image, Form, FormControl, Modal, Card, Badge } from 'react-bootstrap';
import TitlebarGridList from '../Components/CustomeGrid';
import { connect } from 'react-redux';
import request from "superagent";
import debounce from "lodash.debounce";
import InfiniteScroll from 'react-infinite-scroller';
import { getSearch } from '../functions/networkcalls';
class Search extends React.Component {

    state =
        {
            message: "Loading...", showimgmodal: false, popup: null, json: [{ query: [] }],
            isLoading: false, ondate: null, fromdate: null, todate: null, desc: "", tags: "",

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

            <Form inline style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', paddingTop: 20, paddingBottom: 20 }}>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" ref="search" style={{ marginLeft: 300 }} />
                <Button style={{ marginRight: 200 }} variant="outline-success" onClick={() => {
                    console.log("press");
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
                    
                }}>Search</Button>
                <Button onClick={()=>{this.props.updateHasMore(true)}} variant={this.props.searchData.length > 0 ? "info" : "diabled"}>{this.props.searchData.length > 0 ? "LoadMore" : ""}</Button>{' '}
            </Form>
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
                    <TitlebarGridList images={this.props.searchData} callback={this.callback} style={{ width: '100%', height: 500 }} />
                </InfiniteScroll>
            }
        </div>)
    }
    cbHandleMovieClick(objec){
try{
//this.props.updateCurrentMovie(object);

}catch(e){

}
    }
} function mapStateToProps(state) {
    console.log("search");
    console.log(state);
    return {

        searchData: state.searchData,
        searchKey: state.searchKey,
        pageNo: state.pageNo,
        hasMore:state.hasMore,

    }
}

function mapDispatchToProps(dispacher) {
    console.log("dispacterr ");

    return {
        updateSearchData: (searchData) => dispacher({ type: "searchData", load: searchData }),
        updateSearchKey: (searchKey) => dispacher({ type: "searchKey", load: searchKey }),
        updatePageNo: (page) => dispacher({ type: "pageNo", load: page }),
        updateHasMore: (val) => dispacher({  type: "hasMore", load: val })
    }
}
//export default  App;
export default connect(mapStateToProps, mapDispatchToProps)(Search);

