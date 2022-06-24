import React, { useContext, useEffect, useState  } from 'react'
import { useNavigate } from 'react-router-dom';
import Context from '../../context/Context';
import {AdminLogin} from '../../urls'; 
import './signin.css'
const Signin = ({showAlert}) => {
    const navigate = useNavigate(); 
    const [input , setInput] = useState({
        email : '',
        password : ''
    })

    const {adminToken,setadminToken} = useContext(Context); 

    const handleInput = (e)=>{
        setInput({...input , [e.target.name ] : e.target.value})
    }
    useEffect(()=>{
        showAlert('Hey! Welcome. Login with your Email & Password :)','success'); 
    },[])
    
    const handleSubmit = (e)=> {
        e.preventDefault(); 
        fetch(AdminLogin , {
            method:"POST",
            headers: {
                'Content-Type':'application/json'
            },
            body : JSON.stringify(input)
        })
        .then((res)=> res.json())
        .then((data)=>{
            if(data.success === true){
                let adminToken = data.adminToken; 
                localStorage.setItem('adminToken',adminToken); 
                setadminToken(data.adminToken); 
                navigate('/')
            }
            else{
                showAlert(data.msg,'danger'); 
            }
        })
    }
    return (
        <>
        
        <div className='signin mx-auto  my-auto' >

            <div className='my-5'>
            </div>
            <form style={{marginTop:'80px'}} className='auth-inner'>
                <h3>Sign In</h3>
                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        name='email'
                        onChange={handleInput}
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        name='password'
                        onChange={handleInput}
                    />
                </div>
                <div className="mb-3">
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck1"
                        />
                        <label className="custom-control-label" onClick={()=>{localStorage.setItem('metaladmin',input.email)}} htmlFor="customCheck1">
                            Remember me
                        </label>
                    </div>
                </div>
                <div className="d-grid">
                    <button type="submit" onClick={(e)=>handleSubmit(e)} className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>

        </>

    )
}

export default Signin