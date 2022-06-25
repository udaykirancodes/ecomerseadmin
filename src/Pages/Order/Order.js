import "./order.css";
import Pagination from '../../components/Pagination'; 
import {useContext, useState , useEffect} from "react"
import { useNavigate } from "react-router-dom";
import Context from "../../context/Context";

import {AcceptOrderUrl} from '../../urls'; 

const Order = ({showAlert}) => {
  const navigate = useNavigate(); 

  const [search , setsearch] = useState(''); 

  // pagination related code 
  const [currentpage , setcurrentpage] = useState(1); 
  const [perPage , setPerPage] = useState(5); 
  
  const indexOfLast  = currentpage * perPage ; 
  const indexOfFirst = indexOfLast - perPage ;

  const {orders , setorders } = useContext(Context); 
  // console.log(orders); 
  useEffect(() => {
      let adminToken = localStorage.getItem('adminToken'); 
      if(!adminToken){
          navigate('/login'); 
      }
      showAlert('Hey, You got these many !','success'); 
  }, [])

  // accept an order 
  const UpdateOrder = (id,status)=>{
    let token =  localStorage.getItem('adminToken'); 
    if(!token){
      navigate('/login'); 
    }
    fetch( AcceptOrderUrl , {
        method:"PUT",
        headers:{
            'Content-Type':'application/json' ,
            'adminToken':token                
        },
        body : JSON.stringify({
           orderid : id, 
           status:status
        })
    })
    .then((res)=>res.json())
    .then(data => {
        if(data.success){
              showAlert('Order Status Updated','success'); 
              // update in the frontend 
              let newOrders = orders.filter((ord)=>{
                  if(ord._id === id){
                    ord.status=status
                  }
                  return ord 
              })
              setorders(newOrders); 
        }
        else{
            showAlert(data.msg,'danger');             
        }
    })
  }
  
  // price an order 
  const [price , setprice] = useState(null); 
  
  const AddPrice = (id,status,price)=>{
    let token =  localStorage.getItem('adminToken'); 
    if(!token){
      navigate('/login'); 
    }
    fetch( AcceptOrderUrl , {
        method:"PUT",
        headers:{
            'Content-Type':'application/json' ,
            'adminToken':token                
        },
        body : JSON.stringify({
           orderid : id, 
           status:status,
           price:price 
        })
    })
    .then((res)=>res.json())
    .then(data => {
        if(data.success){
              showAlert('Order Confirmed','success'); 
              // update in the frontend 
              let newOrders = orders.filter((ord)=>{
                  if(ord._id === id){
                    ord.status=status
                    ord.price=price 
                  }
                  return ord 
              })
              setorders(newOrders); 
        }
        else{
            showAlert(data.msg,'danger');             
        }
    })
  }


  // filters code 
  const [filter , setfilter] = useState(''); 


  return (
    <>
      <div style={{ height: "60px" }}></div>
      <div className="order d-flex" style={{ marginBottom: "20px" }}>
        <div
          className="order_head head"
          style={{ marginRight: "44%", marginLeft: "20px" }}
        >
          <h4>Orders</h4>
        </div>
        
        <div className="order_head col-md-2">
            <select id="brand" className="form-select" onChange={(e)=>{ setfilter(e.target.value)}}>
              <option value={''}>Filter By Status</option>
              <option value={'pending'}>Pending</option>
              <option value={'confirmed'}>Confirmed</option>
              <option value={'rejected'}>Rejected</option>
            </select>
        </div>
        <div className="order_head col-md-2">
          <input
            type="text"
            className="form-control"
            id="price"
            onChange={(e)=>setsearch(e.target.value)}
            value={search}
            placeholder="Type Order Code"
          />
        </div>
      </div>
      <div style={{ marginLeft: "20px", marginRight: "20px" }}>
        <div className="order_info" id="first">
          <table>
            <tbody >
            <tr className="first">
                  <th>SlNo</th>
                  <th>Order Id </th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Delivery Status</th>
                  <th>Accept/Reject</th>
            </tr>
              {
                search || filter ?
                // search with order id 
                  orders.map((order,index)=>{
                    let s = search.toLowerCase(); 
                    if(order._id.includes(s) || order.name.includes(s) || order.email.includes(s)  ){
                      if(order.status.toLowerCase()===filter){

                        return  <tr key={index} className="first">
                                <th>{index+1}</th>
                                <th className="verysmall">{order._id}</th>
                                <th>{order.name} <br/> {order.email} <br/> {order.phone }</th>
                                <th>{order.phone}</th>
                                <th>{order.productname}</th>
                                <th>{order.price}</th>
                                <th style={{textAlign:'center'}}>{order.status}</th>
                                <th>
                                {
                                  order.price ? <>
                                        {
                                          order.status != 'confirmed' &&  
                                          <button type="button" className="btn btn-success" style={{width:'60px',padding:'3px',fontSize:'14px',marginRight:'5px'}}
                                          onClick={()=>UpdateOrder(order._id,'confirmed')}
                                          >Accept</button>
                                        }
                                        <button type="button" className="btn btn-danger"  style={{width:'50px',fontSize:'14px',padding:'3px'}}
                                            onClick={()=>UpdateOrder(order._id,'rejected')}
                                            >X</button>
                                      </>
                                   : <>
                                   <input onChange={(e)=>setprice(e.target.value)} style={{width:'80px',marginBottom:'10px'}} type="text" className="form-control" placeholder="price"/>
                                   <button  type="button" onClick={()=>AddPrice(order._id,'confirmed',price)} className="btn btn-warning">Add Price</button>
                                   </>
                                 } 
                                
                                  
                                </th>
                              </tr>
                        }
                    }})
                    :
                // without search filter 
                  orders.map((order,index)=>{
                    if((index >= indexOfFirst && index<indexOfLast)){
                      return  <tr key={index} className="first">
                                <th>{index+1}</th>
                                <th className="verysmall">{order._id}</th>
                                <th>{order.name} <br/> {order.email} <br/> {order.phone }</th>
                                <th>{order.phone}</th>
                                <th>{order.productname}</th>
                                <th>{order.price}</th>
                                <th style={{textAlign:'center'}}>{order.status}</th>
                                <th>
                                 {
                                   order.price ? <>
                                        {
                                          order.status != 'confirmed' &&  
                                          <button type="button" className="btn btn-success" style={{width:'60px',padding:'3px',fontSize:'14px',marginRight:'5px'}}
                                              onClick={()=>UpdateOrder(order._id,'confirmed')}
                                              >Accept</button>
                                        }
                                        <button type="button" className="btn btn-danger"  style={{width:'50px',fontSize:'14px',padding:'3px'}}
                                            onClick={()=>UpdateOrder(order._id,'rejected')}
                                            >X</button>
                                      </>
                                   : <>
                                   <input onChange={(e)=>setprice(e.target.value)} style={{width:'80px',marginBottom:'10px'}} type="text" className="form-control" placeholder="price"/>
                                   <button  type="button" onClick={()=>AddPrice(order._id,'confirmed',price)} className="btn btn-warning">Add Price</button>
                                   </>
                                 } 
                                 
                                  
                                </th>
                              </tr>
                    }
                  }
                )
              }
            </tbody>
           
          </table>
        </div>

        <Pagination currentproducts={orders.length/perPage} currentpage={currentpage} setcurrentpage={setcurrentpage}   />
    
      </div>
    </>
  );
};

export default Order;
