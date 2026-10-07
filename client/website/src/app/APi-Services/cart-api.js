import axios from "axios";

let apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL;

export let addToCartApi = (payload, token) => {
  return axios
    .post(`${apibaseurl}cart/add-to-cart`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
};