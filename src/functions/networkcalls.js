import axios from 'axios';
import React from 'react';
const apikey = "3bf50282e6a09fb75967064014a5291c";
export const getSearch = async (keyword, pageNo) => {
    return new Promise((res, rej) => {

        console.log("/search/multi?api_key=3bf50282e6a09fb75967064014a5291c&query=" + keyword + "&page=" + pageNo);
        axios.get("/search/multi?api_key=3bf50282e6a09fb75967064014a5291c&query=" + keyword + "&page=" + pageNo).then(response => {
            console.log("got")

            console.log(response.data.results);
            res(response.data.results)
            //this.props.updateSearchData(res.data.results)
        }, error => {
            rej(error);
        })
    })
}

export const getEach = async (id, media) => {
    return new Promise((res, rej) => {

        console.log(+"/" + media + "/" + id + "?api_key=3bf50282e6a09fb75967064014a5291c&language=en-US");
        axios.get("/" + media + "/" + id + "?api_key=3bf50282e6a09fb75967064014a5291c&language=en-US").then(response => {
            console.log("got")

            console.log(response.data);
            res(response.data)
            //this.props.updateSearchData(res.data.results)
        }, error => {
            rej(error);
        })
    })
}

export const guest_id = async () => {
    return new Promise((res, rej) => {

        //console.log("movie/"+id+"?api_key=3bf50282e6a09fb75967064014a5291c&language=en-US");
        axios.get("authentication/guest_session/new?api_key=" + apikey).then(response => {
            console.log("got")

            console.log(response.data);
            res(response.data)
            //this.props.updateSearchData(res.data.results)
        }, error => {
            rej(error);
        })
    })
}
export const getRatedList = async (gi, media) => {
    return new Promise((res, rej) => {
        console.log(gi);
        console.log("/guest_session/" + gi + "/rated/" + media + "?api_key=" + apikey)
        //console.log("movie/"+id+"?api_key=3bf50282e6a09fb75967064014a5291c&language=en-US");
        axios.get("/guest_session/" + gi + "/rated/" + media + "?api_key=" + apikey).then(response => {
            console.log("got")

            console.log(response.data);
            res(response.data)
            //this.props.updateSearchData(res.data.results)
        }, error => {
            rej(error);
        })
    })
}

export const getTopList = async (gi, media) => {
    return new Promise((res, rej) => {
        console.log(gi);
        console.log("/trending/movie/week?api_key=" + apikey)
        //console.log("movie/"+id+"?api_key=3bf50282e6a09fb75967064014a5291c&language=en-US");
        axios.get("/trending/movie/week?api_key=" + apikey).then(response => {
            console.log("got")

            console.log(response.data);
            res(response.data)
            //this.props.updateSearchData(res.data.results)
        }, error => {
            rej(error);
        })
    })
}
export const postRating = async (gi, movie_id, val, media) => {
    return new Promise((res, rej) => {

        const instance = axios.create({
            baseURL: 'https://api.themoviedb.org/3',
            timeout: 1000,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        //console.log("movie/"+id+"?api_key=3bf50282e6a09fb75967064014a5291c&language=en-US");
        instance.post(
            "/" + media + "/" + movie_id + "/rating?api_key=" + apikey + "&guest_session_id=" + gi,
            {
                value: val
            }

        ).then(response => {
            console.log("got")

            console.log(response.data);
            res(response.data)
            //this.props.updateSearchData(res.data.results)
        }, error => {

            console.log(error);
            rej(error);
        })
    })
}