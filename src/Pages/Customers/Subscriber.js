import React, { useContext, useEffect, useState } from 'react'
import './subscriber.css'
import { useNavigate } from 'react-router-dom';
import Context from '../../context/Context';
const Subscriber = () => {
    const navigate = useNavigate()
    // const [subscribers , setsubscribers ] = useState([]); 
    const {subscribers } = useContext(Context); 

    useEffect(()=>{
        let adminToken = localStorage.getItem('adminToken'); 
        if(!adminToken){
            navigate('/login'); 
        }
    },[])

    const [search , setSearch] = useState(''); 
     return (
        <>
        <div style={{height:'20px'}}></div>
            
            <div className="container customer d-flex"style={{margin:'60px 0 0 0'}}>
                <div className="customer_head head">
                    <h4>All Subscribers</h4>
                </div>
                <div className="customer_head col-md-2">
                    <input type="text" onChange={(e)=>setSearch(e.target.value)} value={search} className="form-control" id="price" placeholder='Type Name or Email' />
                </div>
            </div>
            
            <div className='container' style={{ marginLeft: '20px', marginRight: '20px' }}>
                <div className="subscriber_info">
                    <table>
                        <tr>
                            <th>Sl No</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Phone</th>
                        </tr>
                        {
                            search ? 
                            // with search filter
                            subscribers.map((element,index)=>{
                                let s = search.toLocaleLowerCase();
                                if(element.email.includes(s) || element.name.includes(s)) {
                                    if(element.subscribed){
                                        return <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{element.email}</td>
                                                <td>{element.name}</td>
                                                <td>{element.phone}</td>
                                            </tr>
                                    }
                                }
                            })

                            :
                            // with no search filter 
                            subscribers.map((element,index)=>{
                                if(element.subscribed){
                                    return <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{element.email}</td>
                                            <td>{element.name}</td>
                                            <td>{element.phone}</td>
                                        </tr>
                                }
                            })
                        }
                        
                    </table>
                </div>
            </div>
        </>
    )
}

export default Subscriber