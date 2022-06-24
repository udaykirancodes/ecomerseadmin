// import "./order.css";
import Pagination from '../../components/Pagination'; 
import {useContext, useState , useEffect} from "react"
import { useNavigate } from "react-router-dom";
import Context from "../../context/Context";



const Sell = ({showAlert}) => {
  const navigate = useNavigate(); 

  const {scrap} = useContext(Context); 

  // pagination related code 
  const [currentpage , setcurrentpage] = useState(1); 
  const [perPage , setPerPage] = useState(5); 
  
  const indexOfLast  = currentpage * perPage ; 
  const indexOfFirst = indexOfLast - perPage ;

  const {sell} = useContext(Context); 

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
          <h4>Scrap </h4>
        </div>
      </div>
      <div style={{ marginLeft: "20px", marginRight: "20px" }}>
        <div className="order_info" id="first">
          <table>
            <tbody >
            <tr className="first">
                  <th>Sl No : </th>
                  <th>Id </th>
                  <th>Email </th>
                  <th>Full Name</th>
                  <th>Phone</th>
                  <th>Type</th>
                  <th>Details</th>
                  <th></th>
                </tr>
              {
                scrap.map((element,index)=>{
                  if(index >= indexOfFirst && index<indexOfLast){
                  return  <tr key={index} className="first">
                  <th>{index+1}</th>
                  <th>{element._id}</th>
                  <th>{element.email}</th>
                  <th>{element.fullName}</th>
                  <th>{element.phone}</th>
                  <th>{element.type}</th>
                  <th>{element.type ==='automobile' ? element.details.vechileNumber : 'Weight :'+ element.details.weight }</th>
                  <th>{element.type ==='automobile' ? element.details.vechileName : 'Metal :'+ element.details.metalType }</th>
                </tr>
                  }
                })
              }

            </tbody>
           
          </table>
        </div>

        <Pagination currentproducts={scrap.length/perPage} setcurrentpage={setcurrentpage}   />
    
      </div>
    </>
  );
};

export default Sell;
