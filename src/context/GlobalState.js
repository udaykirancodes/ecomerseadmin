import React, { useState , useMemo , useEffect } from "react";

import Context from "./Context";

import { AllBlgos, GetAllProducts , AllSellUrl , AllUsers , AllOrdersUrl , AllScrapUrl } from "../urls";

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
        let token =  localStorage.getItem('adminToken'); 
        fetch(AllUsers , {
            method:"GET",
            headers: {
                'Content-Type':'application/json',
                'adminToken':token 
            }
        })
        .then((res)=> res.json())
        .then((data)=>{
            if(data.success === true){
                setusers(data.users);
                console.log('got users'); 
                
                // extract subcribers from users 
                let sub = data.users.filter((user)=>{if(user.emailVerified){return user}}) ; 
                setsubscribers(sub); 
            }
        })
    }
    // get all Orders list 
    const getAllOrders = async ()=>{
        let token =  localStorage.getItem('adminToken'); 
        fetch(AllOrdersUrl , {
            method:"GET",
            headers: {
                'Content-Type':'application/json',
                'adminToken':token 
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
        let token = localStorage.getItem('adminToken'); 
        fetch(AllBlgos , {
            method:"GET",
            headers: {
                'Content-Type':'application/json',
                'adminToken':token  
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
        let token =  localStorage.getItem('adminToken'); 
        fetch( GetAllProducts , {
            method:"GET",
            headers:{
                'Content-Type':'application/json' ,
                'adminToken':token                 
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
        let token =  localStorage.getItem('adminToken'); 
        fetch( AllSellUrl , {
            method:"GET",
            headers:{
                'Content-Type':'application/json' ,
                'adminToken':token                
            }
        })
        .then((res)=>res.json())
        .then(data => {
            if(data.success){
                setsell(data.pagination.results); 
                console.log('got sell'); 
            }
            else{
                console.log('error in getting sell'); 
            }
        })
    }
    // get all the scrap  
    const getAllScrap = ()=>{
        let token =  localStorage.getItem('adminToken'); 
        fetch( AllScrapUrl , {
            method:"GET",
            headers:{
                'Content-Type':'application/json' ,
                'adminToken':token                
            }
        })
        .then((res)=>res.json())
        .then(data => {
            if(data.success){
                setscrap(data.pagination.results); 
                console.log('got scrap'); 
            }
            else{
                console.log('error to get scrap'); 
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
        getAllOrders(); 
    }, [])
    

    return (
        <Context.Provider value={{users , setusers , blogs , setblogs , subscribers , setsubscribers  , setorders , products , setproducts , getAllProducts , sell , scrap ,  orders, adminToken , setadminToken}}>
            {props.children}
        </Context.Provider>
    )
}

export default GlobalState ; 