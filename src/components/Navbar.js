import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Context from '../context/Context';
const Navbar = () => {
    let location = useLocation();
    const navigate = useNavigate(); 
    const {setadminToken} = useContext(Context); 
    const Logout = ()=>{
        console.log('logging out')
        setadminToken(''); 
        localStorage.removeItem('adminToken'); 
        navigate('/login'); 
    }
    return (
        <div >
            <nav className="navbar navbar-dark bg-dark fixed-top mb-4" >
                <div className="container-fluid text-white">
                    <div className='d-flex cursor-pointer'>

                        <i className="fa-solid fa-user mx-2 my-auto" style={{cursor:'pointer'}} onClick={()=>{navigate('/')}}></i>
                        
                        <div className='d-flex mx-4 my-auto website' style={{ border: '1px solid grey', borderRadius: '4px' }} role="button">
                            <i className="fa-brands fa-chrome my-auto mx-1" style={{ fontSize: '14px' }}></i>
                            <a className='my-auto mx-1 navbar-brand' style={{ fontSize: '14px' }} href='https://frontendhtml.netlify.app/index.html' target='_blank'>Visit Website</a>
                        </div>
                        <div className='nav-item dropdown d-flex mx-2 my-auto' style={{ border: '1px solid grey', borderRadius: '4px' }} role="button">
                            <i className="fa-solid fa-plus my-auto mx-1" style={{ fontSize: '14px' }}></i>
                            <a className='nav-link dropdown-toggle my-auto navbar-brand' id="offcanvasNavbarDropdown" data-bs-toggle="dropdown" aria-expanded="false" style={{ fontSize: '14px' }}>Add New</a>
                            <ul className="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">
                                <li><Link className="dropdown-item" to="newProduct">Add New Product</Link></li>
                                <li><Link className="dropdown-item" to="/addblog">Add New Blog</Link></li>
                            </ul>
                        </div>

                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end bg-dark" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel ">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Admin</h5>
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item my-3">
                                    <i className="fa-solid fa-chart-line my-auto mx-2 d-inline"></i>
                                    <Link className={`nav-link ${location.pathname === '/' ? "active" : ""} my-auto d-inline`} aria-current="page" to="/" >Dashboard</Link>
                                </li>
                                <li className="nav-item my-3">
                                    <i className="fa-solid fa-list my-auto mx-2 d-inline"></i>
                                    <Link className={`nav-link ${location.pathname === '/order' ? "active" : ""} my-auto d-inline`} to="/order" >Order</Link>
                                </li>
                                <li className="nav-item my-3">
                                    <i className="fa-solid fa-list my-auto mx-2 d-inline"></i>
                                    <Link className={`nav-link ${location.pathname === '/product' ? "active" : ""} my-auto d-inline`} to="/product" >Products</Link>
                                </li>
                                <li className="nav-item my-3">
                                    <i className="fa-solid fa-list my-auto mx-2 d-inline"></i>
                                    <Link className={`nav-link ${location.pathname === '/sell' ? "active" : ""} my-auto d-inline`} to="/sell" >Sell</Link>
                                </li>
                                <li className="nav-item my-3">
                                    <i className="fa-solid fa-list my-auto mx-2 d-inline"></i>
                                    <Link className={`nav-link ${location.pathname === '/scrap' ? "active" : ""} my-auto d-inline`} to="/scrap" >Scrap</Link>
                                </li>
                                <li className="nav-item my-3">
                                    <i className="fa-solid fa-plus my-auto mx-2 d-inline"></i>
                                    <Link className={`nav-link ${location.pathname === '/newProduct' ? "active" : ""} my-auto d-inline`} to="/newProduct" >Add Product</Link>
                                </li>
                                <li className="nav-item my-3">
                                <i className="fa-solid fa-bullhorn my-auto mx-2 d-inline"></i>
                                    <Link className={`nav-link ${location.pathname === '/newsletter' ? "active" : ""} my-auto d-inline`} to="/newsletter" >Newsletters</Link>
                                </li>
                                <li className="nav-item my-3">
                                    <i className="fa-solid fa-people-group my-auto mx-2 d-inline"></i>
                                    <Link className={`nav-link ${location.pathname === '/customer' ? "active" : ""} my-auto d-inline`} to="/customer" >Customers</Link>
                                </li>
                                <li className="nav-item my-3">
                                    <i className="fa-solid fa-people-group my-auto mx-2 d-inline"></i>
                                    <Link className={`nav-link ${location.pathname === '/subscriber' ? "active" : ""} my-auto d-inline`} to="/subscriber" >Subscribers</Link>
                                </li>
                                
                                <li className="nav-item my-3">
                                    <i className="fa-solid fa-book my-auto mx-2 d-inline"></i>
                                    <Link className={`nav-link ${location.pathname === '/blog' ? "active" : ""} my-auto d-inline`} to="/blog" >Blogs</Link>
                                </li>
                                <li className="nav-item my-3">
                                    <i className="fa-solid fa-plus my-auto mx-2 d-inline"></i>
                                    <Link className={`nav-link ${location.pathname === '/addblog' ? "active" : ""} my-auto d-inline`} to="/addblog" >Publish Blog</Link>
                                </li>
                                <li className="nav-item my-3">
                                    <i className="fa-solid fa-right-from-bracket my-auto mx-2 d-inline"></i>
                                    <div style={{cursor:'pointer'}} className={`nav-link logout active my-auto d-inline`} onClick={Logout}>Log out</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
