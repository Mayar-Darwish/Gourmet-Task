import axios from "axios";

const apiUrl = 'http://localhost:8000/api';


export const fetchProducts = async( query='' , filters={} )=>{
    if(query){
        return await axios.get(`${apiUrl}/products/search/${query}`);
    }else{
        return await axios.get(`${apiUrl}/products` ,{ params: filters });
    }
}


export const fetchProductPrice = async(store , productId)=>{
    return await axios.get(`${apiUrl}/products/${store}/${productId}/price`);
}

export const addProduct = async(productInfo)=>{
    return await axios.post(`${apiUrl}/products` , productInfo);
}

export const fetchCategories = async()=>{
    return await axios.get(`${apiUrl}/categories`);
}