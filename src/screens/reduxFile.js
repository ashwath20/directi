import { createStore } from 'redux';

import React from 'react';
import ReactDOM from 'react-dom';
import tv from '../asset/tv.png'
import movie from '../asset/movie.png';
import star from '../asset/icons8.png';

var intial = {
    searchData: [],
    searchKey:"Top",
    pageNo:1,
    hasMore:false,
    currentMovie:"nan",
    showModalRating:false,
    submitRating:false,
    postUpdate:false,
    profileData:[{text:"Reviews",path:star,key:1},{text:"TV Shows",path:tv,key:2},{text:"Movies",path:movie,key:3}],
    Rmovies:{results:[]},
    Rtv:{results:[]},
    showProfile:false,
    tempData:[],
    topList:[],
    creators:[],
    
    header:"Weekly Top"
}
const reducer = function (state = intial, action) {

    console.log("modalSetting" + state.isModalVisible);
    switch (action.type) {

        case "searchData":
            console.log("data")
            console.log(action.load)
            return { ...state, searchData: action.load }

        case "searchKey":return {...state,searchKey:action.load}
        case "pageNo":return {...state,pageNo:action.load}
        case "hasMore":return {...state,hasMore:action.load}
        case "currentMovie":return {...state,currentMovie:action.load}
        case "rating":return {...state,showModalRating:action.load}
        case "submitRating":return {...state,submitRating:action.load}
        case  "toast":return {...state,postUpdate:action.load}
        case "Rmovies":return{...state,Rmovies:action.load}
        case  "Rtv":return {...state,Rtv:action.load}
        case "showProfile":return {...state,showProfile:action.load}
        case "tempData":return {...state,tempData:action.load}
        case "topList":return{...state,topList:action.load}
        case "header":return {...state,header:action.load}
        case "creatorList":return {...state,creators:action.load}
    }
    
    return state;


}

const store = createStore(reducer, intial);
export default store