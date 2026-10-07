import axios from "axios"

let apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL

export let getProducts = () =>{
    return axios.get(`${apibaseurl}home/product`)
    .then((res)=>res.data)
}

export let getSlider = () =>{
    return axios.get(`${apibaseurl}home/slider`)
    .then((res)=>res.data)
}

export let getProductDetail = (pid) =>{
    return axios.get(`${apibaseurl}home/detail/${pid}`)
    .then((res)=>res.data)
}