import React, { useState , useEffect} from 'react'
import './addblog.css'
import {AddBlogUrl} from '../../urls'; 
import { useNavigate } from 'react-router-dom'
const AddBlog = (props) => {
    const navigate = useNavigate(); 

    const {showAlert} = props ; 

    useEffect(()=>{
        showAlert('Write a crazy Blog that will blow the customer\'s mind','success');
    },[])

    const [blog , setblog ] = useState({
        title:'',
        description : '',
        img : ''
    }) 

    const handleInput = (e)=>{
        setblog({...blog , [e.target.name]:e.target.value});
    }
    // add a blog 

    const [selectedImage , setSelectedImage] = useState('') ; 

    const handleSubmit = () => {


        let formdata = new FormData();
         
        formdata.append('title',blog.title)
        formdata.append('description',blog.description); 
        formdata.append('image',selectedImage); 
        let adminToken = localStorage.getItem('adminToken'); 
        if(!adminToken){
            navigate('/login'); 
        }
        fetch(AddBlogUrl , {
            method:"POST",
            headers: {
                'adminToken':adminToken,
                'boundary':'MyBoundary'
            },
            body: formdata 
        })
        .then((res)=> res.json())
        .then((data)=>{
            console.log(data); 
            if(data.success === true){
                setblog(null); 
                showAlert("Blog Added Successfully ","success"); 
            }
            else{
                showAlert(data.msg , "danger"); 
            }
        })
    }

    
    

    return (

        <div >
            {
                <div style={{height:'60px'}}></div>
            }
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Adding New Blog</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Confirm Before Publishing New Blog
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>Add Blog</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="add_Blog col-md-10 mx-auto">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                    <input type="text" name='title' onChange={(e)=>handleInput(e)} className="form-control" id="exampleFormControlInput1" placeholder="Title Of Blog" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Description</label>
                    <textarea className="form-control" onChange={(e)=>handleInput(e)} name="description"  id="exampleFormControlTextarea1" rows="6" placeholder='Blog Description'></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="formFile" className="form-label"><span>Image</span></label>
                    <input className="form-control" onChange={(e)=>setSelectedImage(e.target.files[0])} type="file" id="formFile" accept=".jpeg,.jpg,.png" />
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Publish Blog</button>
                </div>
            </div>
        </div>
    )
}

export default AddBlog
