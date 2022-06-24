import React, { useContext, useEffect, useState } from 'react'
import { MultiSelect } from "react-multi-select-component";
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import { AllUsers, SendEmailUrl } from '../urls';

import './newsletter.css'

const Newsletter = (props) => {
    const { showAlert } = props;
    const navigate = useNavigate(); 
    const [input , setInput]  = useState({
        subject:'',
        text:''
    })
    const {subscribers  } = useContext(Context); 

    const [options , setOptions ] = useState([
        
    ]);
    

   const handleChange = (e)=>{
        setInput({...input , [e.target.name]:e.target.value})
   }

    // selected emails 
    const [selected, setSelected] = useState([]);


    useEffect(()=>{
        showAlert('Hey! Start Emailing People :)','success'); 
        let sub = {}; 
        sub = subscribers.map((user)=>{
            return {label:user.email , value:user.email}
        })
        setOptions(sub); 
    },[]); 

    const sendEmails = () => {
        // console.log(input ,subscribers); 
        let adminToken = localStorage.getItem('adminToken'); 
        if(!adminToken){
            navigate('/'); 
        }
        console.log('Sending Email'); 
        fetch(SendEmailUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                adminToken:adminToken
            },
            body: JSON.stringify({
                emailids: selected.map((data)=>{return data.value}),
                subject: input.subject,
                text: input.text
            }),
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (data.success === true) {
                setInput({}); 
                navigate('/'); 
            }
            else {
                console.log(data.msg); 
                showAlert(data.msg, 'danger')
            }
        })
    };
    return (
        <div className='cotainer mx-4 ' style={{ marginTop: '10%' }}>
            <form className='mx-4 newsletter'>
                
                <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Select Emails : </label>
                    <div className="col-sm-10">
                        {
                            options.length > 0 && 
                            <MultiSelect
                                options={options}
                                value={selected}
                                onChange={setSelected}
                                labelledBy="Select"
                            /> 
                        }
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputSubject" className="col-sm-2 col-form-label">Subject of the Email : </label>
                    <div className="col-sm-10">
                        <input type="text" name='subject' onChange={(e)=>handleChange(e)} className="form-control dropdown" id="inputSubject" placeholder='Subject of Newsletter' />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputContent" className="col-sm-2 col-form-label">Body of the Email : </label>
                    <div className="col-sm-10">
                        <textarea className="form-control" name='text' onChange={(e)=>handleChange(e)} id="exampleFormControlTextarea1" rows="3" placeholder='Newsletter content'></textarea>
                    </div>
                </div>
                <button type="button" onClick={sendEmails} className="btn btn-primary">Send</button>
            </form>
        </div>
    )
}

export default Newsletter