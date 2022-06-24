import React, { useContext , useEffect , useState  } from 'react'
import { useNavigate } from 'react-router-dom';
import Context from '../../context/Context';
import './customer.css'
const Customer = ({showAlert}) => {
    let navigate = useNavigate(); 

    const {users } = useContext(Context); 
    
    useEffect(()=>{
        let adminToken = localStorage.getItem('adminToken'); 
        if(!adminToken){
            navigate('/login'); 
        }
        showAlert('Here are our Customers :)','success'); 
    } ,[])
    const [search , setSearch] = useState(''); 
    return (
        <>
            <div style={{height:'60px'}}></div>
                
            <div className=" d-flex"style={{margin:'10px 0'}}>
                <div className="customer_head head">
                    <h4>Customers</h4>
                </div>
                <div className="customer_head col-md-2">
                    <input type="text" onChange={(e)=>setSearch(e.target.value)} value={search} className="form-control" id="price" placeholder='Type Name or Email' />
                </div>
            </div>
            <div className='' style={{ marginLeft: '20px',paddingBottom:'10%', marginRight: '20px' }}>
                <div className="customer_info">
                    <table>
                        <tbody>
                        <tr>
                            <th>SlNo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Subscribed</th>
                        </tr>

                        {
                            search ?

                            users.map((element,index)=>{
                                // if there is any search filter 
                                let s = search.toLocaleLowerCase();
                                if(element.email.includes(s) || element.name.includes(s)){
                                        return <tr >
                                        <td>{index+1}</td>
                                        <td>{element.name}</td>
                                        <td>{element.email}</td>
                                        <td>{element.phone}</td>
                                        <td>{element.subscribed ? 'Yes' : 'No'}</td>
                                        </tr>
                                }
                            })

                            :
                            users.map((element,index)=>{
                                        return <tr >
                                        <td>{index+1}</td>
                                        <td>{element.name}</td>
                                        <td>{element.email}</td>
                                        <td>{element.phone}</td>
                                        <td>{element.subscribed ? 'Yes' : 'No'}</td>
                                        </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Customer