import React, { useState , useEffect, useContext} from 'react'
import './addblog.css'
import {AddBlogUrl , BlogCategories} from '../../urls'; 
import { useNavigate } from 'react-router-dom'

import Context from "../../context/Context"
import TagsInput from '../../components/TagsInput';

const AddBlog = (props) => {
    const navigate = useNavigate(); 

    const {showAlert} = props ; 

    const {blogs, setblogs} = useContext(Context)

    
    
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
    
    const [selected , setselected ] = useState([]);  // categories 

    const handleSubmit = () => {

        console.log(typeof(new Array(selected))); 
        console.log(selected); 

        // return ; 


        let formdata = new FormData();
         
        formdata.append('title',blog.title)
        formdata.append('description',blog.description); 
        formdata.append('image',selectedImage); 
        selected.forEach(element => {
            formdata.append('category',element); 
        })

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
                setblogs(blogs.concat(data.blog));
                showAlert("Blog Added Successfully ","success"); 
                navigate('/blog'); 
                setblog({title:'',description:'',img:''}); 
                
            }
            else{
                showAlert(data.msg , "danger"); 
            }
        })
    }

    // pull the categories 

    const [categories , setCategories ] = useState([]); 

    

    useEffect(()=>{
        showAlert('Fetching Categories','success');
        fetch(BlogCategories , {
            method:"GET",
            headers: {
                'Content-Type':'application/json',
            }
        })
        .then((res)=> res.json())
        .then((data)=>{
            if(data.success === true){
                let cats = data.data ; 
                setCategories(cats)
                console.log(categories); 
                showAlert('Fetching Compleated','success');
            }
            else{
                showAlert(data.msg,'danger'); 
            }
        })
    },[])

    const addToSelected = (index)=>{
        let s = [...selected]; 
        s.push(categories[index]); 
        setselected(s); 
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
                    <label htmlFor="exampleFormControlInput1" className="form-label">All Available Tags</label>
                    <div className="tags_container" style={{display:'flex',gap:'10px'}}>
                        {
                            categories.map((element,index)=>{
                                return <p key={index} onClick={()=>addToSelected(index)} className="tag">{element}</p>
                            })
                        }
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Add Tags</label>
                    <div className="tags_container" style={{display:'flex',gap:'10px'}}>
                       <TagsInput selected={selected} setselected={setselected} />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Description</label>
                    <textarea className="form-control textarea" onChange={(e)=>handleInput(e)} name="description"  id="exampleFormControlTextarea1" rows="6" placeholder='Blog Description'></textarea>
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
