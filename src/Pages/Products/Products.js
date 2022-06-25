import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Pagination from '../../components/Pagination'
import Context from '../../context/Context'
import { GetAllProducts , ProductDeleteUrl ,UndoDeleteProductUrl, EditProductUrl} from '../../urls'
import './product.css'

const Products = (props) => {
    const navigate = useNavigate(); 

    const { showAlert } = props
    const ref = useRef(null)
    const refClose = useRef(null)

    const {getAllProducts} = useContext(Context); 

    useEffect(()=>{
        let adminToken = localStorage.getItem('adminToken'); 
        if(!adminToken){
            navigate('/login'); 
        }
        getAllProducts(); 
        
    },[])

    // context 
    const {products , setproducts}  = useContext(Context); 


    // pagination related codes 
    const [currentpage , setcurrentpage] = useState(1); 
    const [perPage , setPerPage] = useState(5); 
    
    const indexOfLast  = currentpage * perPage ; 
    const indexOfFirst = indexOfLast - perPage ;
    // const pageproducts = products.slice(indexOfFirst,indexOfLast); 
    // const [pageproducts , setpageproducts] = useState();
    // setpageproducts(products.slice(indexOfFirst,indexOfLast)); 
    
    // store id 
    const [id , setId] = useState('');
    
    // function to delete the product 
    const DeleteProduct = ()=>{
        console.log('deleting'); 
        if(!id){
            showAlert("Cannot Delete",'danger');
            return ;
        }
        console.log('hello'); 
        // deleting the blog 
        let adminToken = localStorage.getItem('adminToken'); 
        if(!adminToken){
            navigate('/login'); 
        }
        fetch(ProductDeleteUrl , {
            method:"PUT",
            headers: {
                'Content-Type':'application/json',
                'adminToken':adminToken 
            },
            body : JSON.stringify({
                id : id 
            })

        })
        .then((res)=> res.json())
        .then((data)=>{
            console.log(data); 
            if(data.success === true){
                // delete in the frontend
                let newProducts = products.filter((element)=>{
                    if(element._id !== id){
                        return element  
                    }
                    else{
                        element.isDeleted = true ; 
                        return element 
                    }
                })
                setproducts(newProducts); 
                setId(''); 
                showAlert("Deleted Successfully",'success'); 
            }
            else{
                showAlert(data.msg,'danger'); 
            }
        })
        .catch(err=>{
            console.log(err.message); 
        })
    }

    // handling edit 
    const [input , setInput] = useState({}); 
    const handleChange = (e)=>{
        setInput({...input , [e.target.name]:e.target.value}); 
    }
    const handleEdit = (id)=>{
        console.log('Handle Edit');
        let product = products.filter(element => element._id === id); 
        setInput({
            modelname:product[0].details.modelname,
            description:product[0].description,
            name:product[0].name ,
            price:product[0].price,
            category:product[0].category
        })
        setId(id); 
    }

    // edit product 
    const EditProduct = ()=>{
        if(!id){
            showAlert("Cannot Delete",'danger'); 
            return ;
        }
        // deleting the blog 
        let adminToken = localStorage.getItem('adminToken');
        console.log(adminToken) ; 
        if(!adminToken){
            navigate('/login'); 
        }

        console.log("edit 1"); 
        fetch(EditProductUrl , {
            method:"PUT",
            headers: {
                'Content-Type':'application/json',
                'adminToken':adminToken 
            },
            body : JSON.stringify({
                id : id,
                name:input.name,
                description:input.description,
                modelname:input.modelname,
                price:input.price ,
                category:input.category
            })
            
        })
        .then((res)=> res.json())
        .then((data)=>{
            if(data.success === true){
                // edit in the frontend
                let newProducts = products.filter((element)=>{
                    if(element._id === id){
                        let {product} = data ; 
                        console.log(product); 
                        if(product.category === 'automobile'){
                            element.name=product.name 
                            element.category=product.category
                            element.description=product.description
                            element.subCategory=product.subCategory 
                            element.details={
                                brand:product.details.brand,
                                modelname:product.details.modelname,
                                fuelType:product.details.fuelType
                            }
                            element.price= product.price
                            element.img = product.img 
                        }
                        else{
                            element.name=product.name 
                            element.category=product.category
                            element.description=product.description
                            element.subCategory=product.subCategory 
                            element.details={
                                brand: product.details.brand,
                                modelname:product.details.modelname,
                                metalType:product.details.metalType,     
                            }
                            element.price= product.price
                            element.img = product.img 
                        }
                        console.log('After Edited : ',element); 
                        return element 
                    }
                    return element
                })
                setproducts(newProducts)
                setId(''); 
                showAlert("Edited Successfully",'success'); 
            }
            else{
                showAlert(data.msg,'danger'); 
            }
        })
    }
    

    const UndoDelete = ()=>{
        if(!id){
            showAlert("Cannot Delete",'danger');
            return ;
        }
        
        // deleting the blog 
        let adminToken = localStorage.getItem('adminToken'); 
        if(!adminToken){
            navigate('/login'); 
        }
        fetch(UndoDeleteProductUrl , {
            method:"PUT",
            headers: {
                'Content-Type':'application/json',
                'adminToken':adminToken 
            },
            body : JSON.stringify({
                id : id 
            })

        })
        .then((res)=> res.json())
        .then((data)=>{
            if(data.success === true){
                // undo delete in the frontend
                let newProducts = products.filter((element)=>{
                    if(element._id !== id){
                        return element  
                    }
                    else{
                        element.isDeleted = false ; 
                        return element 
                    }
                })
                setproducts(newProducts); 
                setId(''); 
                showAlert("Undo Delete Successfully",'success'); 
            }
            else{
                showAlert(data.msg,'danger'); 
            }
        })
    }

    // search state
    const [search , setSearch] = useState('');

    if(!products){
        return <>
        <h1>Loading...</h1>
        </>
    }

    return (

        <>
            {/* Model For Editing */}
            {/* <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button> */}

             <div className="modal fade" id="modelforedit" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="row g-3">
                                <div className="col-md-6">
                                    <label htmlFor="name" className="form-label">Name of the Product</label>
                                    <input type="text" name='name' onChange={(e)=>handleChange(e)} value={input.name || ''} className="form-control" id="name" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="name" className="form-label">Description of the Product</label>
                                    <input type="text" name='description' onChange={(e)=>handleChange(e)} value={input.description || ''} className="form-control" id="name" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="modelName" className="form-label">Model Name</label>
                                    <input type="text" name='modelname' onChange={(e)=>handleChange(e)} value={input.modelname || ''} className="form-control" id="modelName" />
                                </div>
                                
                                <div className="col-md-2">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input type="text" name='price' onChange={(e)=>handleChange(e)} value={input.price || ''} className="form-control" id="price" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={EditProduct} className="btn btn-primary" data-bs-dismiss="modal">Update Product</button>
                        </div>
                    </div>
                </div>
            </div> 

            {/* <!-- Modal for deletion--> */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Deleting Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure ? Move to Trash!!!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={DeleteProduct} data-bs-dismiss="modal">Delete Product</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Modal for Undo --> */}
            <div className="modal fade" id="modelforundo" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Deleting Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure ? Move to Trash!!!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={UndoDelete} data-bs-dismiss="modal">Delete Product</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div style={{height:'60px'}}></div> */}
            <div className="customer d-flex"style={{margin:'60px 0 0 0'}}>
                <div className="customer_head head">
                    <h4>Products</h4>
                </div>
                <div className="customer_head col-md-2">
                    <input type="text" onChange={(e)=>{ setSearch(e.target.value)}}  className="form-control" id="price" placeholder='Seach With Product Name or Description' />
                </div>
            </div>
            <div className="product">
                <Link to="/newProduct">
                    <button type="button" className="btn btn-primary newBtn">Add New Product</button>
                </Link>
                <div className="product_head">
                    <h4 style={{ marginLeft: '20px' }}>All Product</h4>
                </div>
                <hr />
                <div className="product_info">
                    <table>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>SubCategories</th>
                            <th>Description</th>
                            <th>Modal Name</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>State</th>
                            <th>Upadte Product</th>
                        </tr>
                        {
                            // search filter 
                            search ? 
                            // with search filter 
                            products.map((element,index)=>{
                                let s = search.toLocaleLowerCase();
                                if(element.name.includes(s) || element.description.includes(s) || element.category.includes(s) || element.subCategory.includes(s)){
                                return <tbody key={index}>

                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{element.name}</td>
                                    <td>{element.category}</td>
                                    <td>{element.subCategory.map((s)=> {return s })}</td>
                                    <td>{element.description}</td>
                                    <td>{element.details.modelname || ''}</td>
                                    <td>{element.details.brand}</td>
                                    <td>{element.price}</td>
                                    <td>{element.isDeleted ? "Out of Stock" : "In Stock"}</td>
                                    <td>
                                        <i className="fa-solid fa-trash mx-2" role='button' data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=>setId(element._id)}>D</i> 
                                        <i className="fa-solid fa-file-pen mx-2" role='button' data-bs-toggle="modal" data-bs-target="#modelforedit" onClick={()=>handleEdit(element._id)}>E</i> 
                                        {
                                            element.isDeleted && 
                                            <i className="fa-solid fa-file-pen mx-2" role='button' data-bs-toggle="modal" data-bs-target="#modelforundo" onClick={()=>setId(element._id)}>U</i> 
                                        }
                                    </td>
                                </tr>
                                </tbody>
                                }
                            })
                            : // without any search filter 
                            products.map((element,index)=>{
                                if(index >= indexOfFirst && index<indexOfLast){
                                return <tbody key={index}>
                                <tr key={index}>
                                <td>{index+1}</td>
                                <td>{element.name}</td>
                                <td>{element.category}</td>
                                <td>{element.subCategory}</td>
                                <td>{element.description}</td>
                                <td>{element.details.modelname ? element.details.modelname : ''}</td>
                                <td>{element.details.brand}</td>
                                <td>{element.price}</td>
                                <td>{element.isDeleted ? "Out of Stock" : "In Stock"}</td>
                                <td>
                                    <i className="fa-solid fa-trash mx-2" role='button' data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=>setId(element._id)}>D</i> 
                                    <i className="fa-solid fa-file-pen mx-2" role='button' data-bs-toggle="modal" data-bs-target="#modelforedit" onClick={()=>handleEdit(element._id)}>E</i> 
                                </td>
                                {
                                    element.isDeleted && 
                                    <i className="fa-solid fa-file-pen mx-2" role='button' data-bs-toggle="modal" data-bs-target="#modelforundo" onClick={()=>setId(element._id)}>U</i> 
                                }
                            </tr>
                                </tbody>
                                }

                            })
                        }
                    </table>
                </div>
            </div>
            <Pagination currentproducts={products.length/perPage} currentpage={currentpage} setcurrentpage={setcurrentpage}   /> 
        </>
    )
}

export default Products