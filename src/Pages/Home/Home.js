import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Context from '../../context/Context';
import './home.css'

const Home = ({showAlert}) => {
    const navigate = useNavigate(); 

    const {users , products} = useContext(Context); 

    useEffect(()=>{
        let adminToken = localStorage.getItem('adminToken'); 
        if(!adminToken){
            navigate('/login'); 
        }
        showAlert('Hey! Welcome to METAL STATION','success')
      },[])
      const center = {
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
      }
       
    return (
        <>
            {/* <div className='container'> */}
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
                        <h2>0</h2>
                    </div>
                </div>
                <div className="home_content" >
                    <div className="home_inside">
                        <h6>Pending Orders</h6>
                        <h2>0</h2>
                    </div>
                </div>
                <div className="home_content" >
                    <div className="home_inside">
                        <h6>Order Status</h6>
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
            <h2 style={{ marginTop: '20px', marginLeft: '20px' }}>Other Information</h2>
            <hr />

            {/* </div> */}
        </>
    )
}

export default Home