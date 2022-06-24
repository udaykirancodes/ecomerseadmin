import React, { useState , useEffect } from "react";

import Context from "./Context";

import { AllBlgos, GetAllProducts , AllSellUrl , AllUsers , AllOrdersUrl , AllScrapUrl} from "../urls";

const GlobalState = (props)=>{

    const [users , setusers] = useState([]);
    const [blogs , setblogs] = useState([]); 
    const [subscribers , setsubscribers] = useState([]); 
    const [products , setproducts ] = useState([]);  
    const [orders , setorders ] = useState([]); 
    const [sell , setsell ] = useState([])
    const [scrap , setscrap ] = useState([])

    const [adminToken , setadminToken] = useState(''); 


    // get all users list 
    const getAllUsers = async ()=>{
        fetch(AllUsers , {
            method:"GET",
            headers: {
                'Content-Type':'application/json',
                'adminToken':adminToken 
            }
        })
        .then((res)=> res.json())
        .then((data)=>{
            if(data.success === true){
                setusers(data.users);
                console.log('got users'); 
                let sub = data.users.filter((user)=>{if(user.emailVerified){return user}}) ; 
                setsubscribers(sub); 
            }
        })
    }
    // get all Orders list 
    const getAllOrders = async ()=>{
        fetch(AllOrdersUrl , {
            method:"GET",
            headers: {
                'Content-Type':'application/json',
                'adminToken':adminToken 
            }
        })
        .then((res)=> res.json())
        .then((data)=>{
            if(data.success === true){
                setorders(data.orders);
                console.log('got orders'); 
            }
        })
    }

    // get all blogs 
    const getAllBlogs = ()=>{
        fetch(AllBlgos , {
            method:"GET",
            headers: {
                'Content-Type':'application/json',
                'adminToken':adminToken 
            }
        })
        .then((res)=> res.json())
        .then((data)=>{
            if(data.success === true){
                setblogs(data.data); 
                console.log('Got Blogs'); 
                // showAlert("Fetched Successfully",'success'); 
            }
            else{
                // showAlert(data.msg,'danger'); 
            }
        })
    }

    // get all the products 
    const getAllProducts = ()=>{
        fetch( GetAllProducts , {
            method:"GET",
            headers:{
                'Content-Type':'application/json' ,
                'adminToken':adminToken                 
            }
        })
        .then((res)=>res.json())
        .then(data => {
            if(data.success){
                setproducts(data.pagination.results); 
                console.log('got products'); 
            }
            else{
                console.log('error in getting all products'); 
            }
        })
        
    }
    // get all the sells 
    const getAllSell = ()=>{
        fetch( AllSellUrl , {
            method:"GET",
            headers:{
                'Content-Type':'application/json' ,
                'adminToken':adminToken               
            }
        })
        .then((res)=>res.json())
        .then(data => {
            if(data.success){
                setsell(data.pagination.results); 
                console.log('got sell'); 
            }
            else{
                console.log('error in getting all products'); 
            }
        })
    }
    // get all the scrap  
    const getAllScrap = ()=>{
        fetch( AllScrapUrl , {
            method:"GET",
            headers:{
                'Content-Type':'application/json' ,
                'adminToken':adminToken               
            }
        })
        .then((res)=>res.json())
        .then(data => {
            if(data.success){
                setscrap(data.pagination.results); 
                console.log('got sell'); 
            }
            else{
                console.log('error in getting all products'); 
            }
        })
    }

    // on page load 
    useEffect(() =>  {
        let token =  localStorage.getItem('adminToken'); 
        if(token){
            setadminToken(token); 
        }
        getAllUsers(); 
        getAllBlogs(); 
        getAllProducts(); 
        getAllOrders(); 
        getAllSell(); 
        getAllScrap(); 
    }, [adminToken])
    

    return (
        <Context.Provider value={{users , setusers , blogs , setblogs , subscribers , setsubscribers , products , setproducts , getAllProducts , sell , scrap ,  orders, adminToken , setadminToken}}>
            {props.children}
        </Context.Provider>
    )
}

export default GlobalState ; 