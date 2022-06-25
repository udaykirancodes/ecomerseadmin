import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Context from '../../context/Context';
import { AllBlgos } from '../../urls';
import './home.css'

const Home = ({showAlert}) => {
    const navigate = useNavigate(); 
    const [pending , setpending] = useState([]); 

    const {users , products , orders , blogs } = useContext(Context); 

    useEffect(()=>{
        let adminToken = localStorage.getItem('adminToken'); 
        if(!adminToken){
            navigate('/login'); 
        }
        showAlert('Hey! Welcome to METAL STATION','success'); 

        let len =  orders.filter((order)=>{
            if(order.status=='pending'){
                return order 
            }
        })
        setpending(len)

    },[])

    const center = {
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    }
    
       
    return (
        <>
            <div className='container'>
            <div className="home my-4" style={{paddingTop:'5%'}} >
                <div className="home_content" >
                    <div className="home_inside">
                        <h6 > Total Customer</h6>
                        <h2 >{users.length}</h2>
                    </div>
                </div>
                <div className="home_content" >
                    <div className="home_inside">
                        <h6>Total Products</h6>
                        <h2>{products.length}</h2>
                    </div>
                </div>
                <div className="home_content" >
                    <div className="home_inside">
                        <h6>Total Orders</h6>
                        <h2>{orders.length}</h2>
                    </div>
                </div>
                <div className="home_content" >
                    <div className="home_inside">
                        <h6>Pending Orders</h6>
                        <h2>{pending.length}</h2>
                    </div>
                </div>
                <div className="home_content" >
                    <div className="home_inside">
                        <h6>All Blogs</h6>
                        <h2>{blogs.length}</h2>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="Order">
                <div className="Order_Info my-4">
                    <div className="Order_inside">
                        <i className="fa-solid fa-book-bookmark my-auto mx-2 d-inline"></i>
                        <h4 className='d-inline my-auto mx-4'>Order Placed: 0</h4>
                    </div>
                </div>
                <div className="Order_Info my-4">
                    <div className="Order_inside">
                        <i className="fa-solid fa-circle-check my-auto mx-2 d-inline"></i>
                        <h4 className='d-inline my-auto mx-4'>Order Confirmed: 0</h4>
                    </div>
                </div>
                <div className="Order_Info my-4">
                    <div className="Order_inside">
                        <i className="fa-solid fa-box-archive my-auto mx-2 d-inline"></i>
                        <h4 className='d-inline my-auto mx-4'>Order Processed: 0</h4>
                    </div>
                </div>
                <div className="Order_Info my-4">
                    <div className="Order_inside">
                        <i className="fa-solid fa-truck my-auto mx-2 d-inline"></i>
                        <h4 className='d-inline my-auto mx-4'>Order Delivered: 0</h4>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default Home