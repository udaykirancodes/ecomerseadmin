import "./order.css";
import Pagination from '../../components/Pagination'; 
import {useContext, useState , useEffect} from "react"
import { useNavigate } from "react-router-dom";
import Context from "../../context/Context";



const Order = ({showAlert}) => {
  const navigate = useNavigate(); 

  // pagination related code 
  const [currentpage , setcurrentpage] = useState(1); 
  const [perPage , setPerPage] = useState(5); 
  
  const indexOfLast  = currentpage * perPage ; 
  const indexOfFirst = indexOfLast - perPage ;

  const {orders} = useContext(Context); 

    useEffect(() => {
        let adminToken = localStorage.getItem('adminToken'); 
        if(!adminToken){
            navigate('/login'); 
        }
        showAlert('Hey, You got these many !','success'); 
    }, [])
  return (
    <>
      <div style={{ height: "60px" }}></div>
      <div className="order d-flex" style={{ marginBottom: "20px" }}>
        <div
          className="order_head head"
          style={{ marginRight: "44%", marginLeft: "20px" }}
        >
          <h4>Order</h4>
        </div>
        <div className="order_head col-md-2">
          <select id="brand" className="form-select">
            <option selected>Filter By Payment Status</option>
            <option>Paid</option>
            <option>Unpaid</option>
          </select>
        </div>
        <div className="order_head col-md-2">
          <select id="brand" className="form-select">
            <option selected>Filter By Delivery Status</option>
            <option>Placed</option>
            <option>Cofirmed</option>
            <option>Processed</option>
            <option>Shipped</option>
          </select>
        </div>
        <div className="order_head col-md-2">
          <input
            type="text"
            className="form-control"
            id="price"
            placeholder="Type Order Code"
          />
        </div>
      </div>
      <div style={{ marginLeft: "20px", marginRight: "20px" }}>
        <div className="order_info" id="first">
          <table>
            <tbody >
            <tr className="first">
                  <th>Sl No : </th>
                  <th>Order Id </th>
                  <th>Num of product</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Delivery Status</th>
                  <th>Payment Status</th>
                </tr>
              {
                orders.map((order,index)=>{
                  if(index >= indexOfFirst && index<indexOfLast){
                  return  <tr key={index} className="first">
                  <th>{index+1}</th>
                  <th>{order._id}</th>
                  <th>Num of product</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Delivery Status</th>
                  <th>Payment Status</th>
                </tr>
                  }
                })
              }

            </tbody>
           
          </table>
        </div>

        <Pagination currentproducts={orders.length/perPage} setcurrentpage={setcurrentpage}   />
    
      </div>
    </>
  );
};

export default Order;
