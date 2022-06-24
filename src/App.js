import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import GlobalState from "./context/GlobalState"
import Home from './Pages/Home/Home';
import Navbar from './components/Navbar';
import Products from './Pages/Products/Products';
import Newproduct from './Pages/Products/Newproduct';
import Order from './Pages/Order/Order';
import Newsletter from './Pages/Newsletter';
import Review from './Pages/Review';
import Customer from './Pages/Customers/Customer';
import Subscriber from './Pages/Customers/Subscriber'; 
import Brand from './Pages/Brand'
import { useEffect, useState } from 'react';
import { Alert } from './components/Alert';
import Signin from './Pages/Auth/Signin';
import Blogs from './Pages/Blogs/Blogs';
import AddBlog from './Pages/Blogs/AddBlog';
import Sell from './Pages/Sell/Sell';
import Scrap from './Pages/Scrap/Scrap';

function App() {
  // const navigate = useNavigate(); 
  const [alert, setAlert] = useState();

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 4000);
  }
 
 
  return (
    <>
      <GlobalState>

          <Router>
            <Navbar />
            <Alert alert={alert}/>
            <Routes>
              <Route exact path='/' element={<Home showAlert={showAlert}/>}/>
              <Route exact path='/product' element={<Products showAlert={showAlert}/>}/>
              <Route exact path='/newProduct' element={<Newproduct showAlert={showAlert} />}/>
              <Route exact path='/order' element={<Order showAlert={showAlert}/>}/>
              <Route exact path='/newsletter' element={<Newsletter showAlert={showAlert}/>}/>
              <Route exact path='/review' element={<Review/>}/>
              <Route exact path='/customer' element={<Customer  showAlert={showAlert}/>}/>
              <Route exact path='/subscriber' element={<Subscriber />}/>
              <Route exact path='/sell' element={<Sell showAlert={showAlert}/>}/>
              <Route exact path='/scrap' element={<Scrap showAlert={showAlert}/>}/>
              <Route exact path='/brand' element={<Brand showAlert={showAlert}/>}/>
              <Route exact path='/login' element={<Signin showAlert={showAlert}/>}/>
              <Route exact path='/blog' element={<Blogs showAlert={showAlert}/>}/>
              <Route exact path='/addblog' element={<AddBlog showAlert={showAlert}/>}/>
            </Routes>

          </Router>
      </GlobalState>

    </>
  );
}

export default App;
