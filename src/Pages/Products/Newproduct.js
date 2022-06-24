import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import './newProduct.css'

import { AddProductUrl } from '../../urls'; 
import { useNavigate } from 'react-router-dom';


const Newproduct = (props) => {
    const navigate = useNavigate(); 
    const { showAlert } = props;

    useEffect(()=>{
        showAlert('Yes, You can add products here :)','success'); 
    },[]); 


    // form fields 
    const formFields = {
        automobile:{
            brands : [
                {label:'Maruthi',value:'maruthi'},
                {label:'Hundai',value:'hundai'},
                {label:'Toyoto',value:'toyoto'},
                {label:'Nissan',value:'nissan'},
            ],
            type : [
                {label:'Petrol',value:'petrol'},
                {label:'Deisel',value:'deisel'},
                {label:'CNG',value:'cng'},
            ]
        },
        metal:{
            brands : [
                {label:'Radha Steel',value:'radhasteel'},
                {label:'BE Steel',value:'besteel'},
            ],
            type : [
                {label:'Aluminium',value:'aluminium'},
                {label:'Copper',value:'copper'},
                {label:'Iron',value:'iron'},
                {label:'Steel',value:'steel'},
            ]
        }
    }
    // subcategories
    const options = {
        automobile : [
            { value: 'car', label: 'Car' },
            { value: 'bike', label: 'Bike' },
            { value: 'jcb', label: 'JCB' },
            { value: 'lorry', label: 'Lorry' },
        ],
        metal : [
            { value: 'steel', label: 'Steel' },
            { value: 'steel', label: 'Steel' },
        ]
    }

    const [state, setState] = useState('')
    const [subcategories , setsubcategories] = useState([]); 

    const handleChange = selectedOption => {
        setState({ selectedOption });
        let subCategory = selectedOption.map(element => {
            return element.value 
        }) 
        setsubcategories(subCategory); 
    };
    const { selectedOption } = state;


    const [input , setInput] = useState({}); 
    const [images , setSelectedImages ] = useState(); 

    const handleInput = (e)=>{
        setInput({...input , [e.target.name]:e.target.value})
    }

    
    const AddProduct = ()=>{
        let form = new FormData(); 
        if(input.category==='automobile'){
            form.append('name',input.name);
            form.append('category',input.category);
            form.append('description',input.description);
            form.append('brand',input.brand);
            form.append('modelname',input.modelname);
            form.append('price',input.price);
            form.append('subCategory',subcategories);
            form.append('fuelType',input.type);
        }
        if(input.category === 'metal'){
            form.append('name',input.name);
            form.append('category',input.category);
            form.append('description',input.description);
            form.append('brand',input.brand);
            form.append('metalType',input.type);
            form.append('price',input.price);
            form.append('modelname',input.modelname);
            form.append('subCategory',subcategories);
        }
        // appending images 
        if(images){
            for (const file of images){
                form.append('images',file , file.name);
            }; 
        }
        let adminToken = localStorage.getItem('adminToken'); 
        if(!adminToken){
            navigate('/login'); 
        }
        fetch(AddProductUrl , {
            method:"POST",
            headers: {
                'adminToken':adminToken,
                'boundary':'MyBoundary'
            },
            body: form  
        })
        .then((res)=> res.json())
        .then((data)=>{
            if(data.success === true){
                console.log(data); 
                setInput({}); 
                navigate('/product'); 
                showAlert("Product Added Successfully ","success"); 
            }
            else{
                showAlert(data.msg , "danger"); 
            }
        })
    }
    return (
        <>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop"  data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Confirm Before adding New Product
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={AddProduct}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="newProduct container"  style={{paddingTop:'5%'}}>
                <form className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Name of the Product</label>
                        <input type="text" name='name'  onChange={(e)=>handleInput(e)} className="form-control" id="name" />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="subCategory" className="form-label">Category</label>
                        <select id="subCategory" className="form-select" name='category' onChange={(e)=>handleInput(e)}>
                            <option value="">Choose...</option>
                            <option value="automobile">Auto Mobile</option>
                            <option value="metal">Metal</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="brand" className="form-label">Brand</label>
                        <select id="brand" name='brand' onChange={(e)=>handleInput(e)} className="form-select">
                            <option defaultChecked>Choose...</option>
                            {
                                input.category && 
                                input.category==="automobile" ? 
                                formFields.automobile.brands.map((element , index)=>{
                                    return <option key={index} value={element.value}>{element.label}</option>
                                })
                                :
                                formFields.metal.brands.map((element , index)=>{
                                    return <option key={index} value={element.value}>{element.label}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Product Description</label>
                        <input type="textarea" name='description' onChange={(e)=>handleInput(e)} className="form-control" id="name" />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="type" className="form-label">Type</label>
                        <select id="type" name='type' onChange={(e)=>handleInput(e)}  className="form-select">
                            <option defaultChecked>Choose...</option>
                            {
                                input.category && 
                                input.category==="automobile" ? 
                                formFields.automobile.type.map((element , index)=>{
                                    return <option key={index} value={element.value}>{element.label}</option>
                                })
                                :
                                formFields.metal.type.map((element , index)=>{
                                    return <option key={index} value={element.value}>{element.label}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="category" className="form-label">Sub Category</label>
                        <Select isMulti={true}
                            value={selectedOption}
                            onChange={handleChange}
                            options={input.category === "automobile" ? options.automobile : options.metal } id="category" className="form-select">
                        </Select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="modelName" className="form-label">Model Name</label>
                        <input type="text" className="form-control"  name='modelname'  onChange={(e)=>{handleInput(e)}} id="modelName" />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input type="text" name='price' onChange={(e)=>handleInput(e)} className="form-control" id="price" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formFileMultiple" className="form-label">Product Image</label>
                        <input className="form-control"  type="file" id="formFileMultiple" onChange={(e)=>{setSelectedImages(e.target.files)}} multiple accept=".jpeg,.jpg,.png" />
                    </div>
                    
                    <button style={{width:"60px", marginBottom:"10%"}} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        Add
                    </button>
                </form>
            </div>
        </>
    )
}

export default Newproduct