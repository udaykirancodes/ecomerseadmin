import React, { useContext, useEffect, useState } from 'react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../../context/Context';
import { AllBlgos,UndoDeleteBlogUrl ,  backendurl , EditBlogUrl, DeleteBlogUrl } from '../../urls'; 
import './blog.css'
const Blogs = (props) => {
    const { showAlert } = props
    const ref = useRef(null)
    const refClose = useRef(null)

    // context api 
    const {blogs , setblogs} = useContext(Context); 

    const navigate = useNavigate(); 
    // const [blogs , setblogs ] = useState([]); 
    const [id , setId] = useState(''); 
    const [title , setTitle] = useState('')
    const [description , setDescriptioin] = useState('')
    const [search , setSearch ] = useState(''); 

    // fetch blogs & show the blogs 
    useEffect(()=>{
        let adminToken = localStorage.getItem('adminToken'); 
        if(!adminToken){
            navigate('/login'); 
        }
        showAlert('Please Wait while the blogs getting loaded...','success'); 
    } ,[])

    // function to delt a blog 
    const DeleteBlog = ()=>{
        if(!id){
            showAlert("Cannot Delete",'danger');
            return ;
        }
        
        // deleting the blog 
        let adminToken = localStorage.getItem('adminToken'); 
        if(!adminToken){
            navigate('/login'); 
        }
        fetch(DeleteBlogUrl , {
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
                // delete in the frontend
                let newBlogs = blogs.filter((element)=>{
                    if(element._id !== id){
                        return element  
                    }
                    else{
                        element.isDeleted = true ; 
                        return element 
                    }
                })
                setblogs(newBlogs); 
                setId(''); 
                showAlert("Deleted Successfully",'success'); 
            }
            else{
                showAlert(data.msg,'danger'); 
            }
        })
    }
    // function to delt a blog 
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
        fetch(UndoDeleteBlogUrl , {
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
                console.log(data); 
                // undo delete in the frontend
                let newBlogs = blogs.filter((element)=>{
                    if(element._id !== id){
                        return element  
                    }
                    else{
                        element.isDeleted = false ; 
                        return element 
                    }
                })
                setblogs(newBlogs); 
                setId(''); 
                showAlert("Undo eleted Successfully",'success'); 
            }
            else{
                showAlert(data.msg,'danger'); 
            }
        })
    }
  

    // for editing 
    const EditBlog = () => {
        if (!id) {
            showAlert("Cannot Delete", 'danger');
            return;
        }
        // deleting the blog 
        let adminToken = localStorage.getItem('adminToken');
        if (!adminToken) {
            navigate('/login');
        }
        fetch(EditBlogUrl, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'adminToken': adminToken
            },
            body : JSON.stringify({
                id : id,
                title:title,
                description:description 
            })

        })
        .then((res)=> res.json())
        .then((data)=>{
            if(data.success === true){
                // delete in the frontend
                let newBlogs = blogs.filter((element)=>{
                    if(element._id === id){
                        element.title=title 
                        element.description=description 
                    }
                    return element
                })
                setblogs(newBlogs); 
                setId(''); 
                showAlert("Edited Successfully",'success'); 
            }
            else{
                showAlert(data.msg,'danger'); 
            }
        })
    }
    const handleEidt = (id)=>{
        setId(id); 
        let blog = blogs.filter(element => element._id === id)
        setTitle(blog[0].title)
        setDescriptioin(blog[0].description)
    }
    return (
        <>
            {/* Modal For Edit */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Blog</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="row g-3">
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                                    <input type="text" name='title' className="form-control" onChange={(e)=>setTitle(e.target.value)} value={title || ''} id="exampleFormControlInput1" placeholder="Title Of Blog" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Description</label>
                                    <textarea className="form-control" name='description' onChange={(e)=>setDescriptioin(e.target.value)} value={description || ''} id="exampleFormControlTextarea1" rows="6" placeholder='Blog Description'></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={EditBlog}>Update Blog</button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Blog Delete Model */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Deleting Blog</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Confirm Before Deleting Blog
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={DeleteBlog} >Delete Blog</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Blog Undo Delete Model */}
            <div className="modal fade" id="modelforundo" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Undo Deleting Blog</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Confirm Before Undo The Blog
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={UndoDelete} >Undo Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Blogs Display  */}
            <div style={{height:'60px'}}></div>
            <div className="blog">
                <div className="blog_table mx-auto">
                    <div className="col-md-10 d-flex">
                        <div className="blog_head" style={{ marginRight: '44%', marginLeft: '20px' }}>
                            <h4>Blog</h4>
                        </div>
                        <div className="blog_head_search col-md-2">
                            <input type="text" className="form-control" id="price" onChange={(e)=>setSearch(e.target.value)} placeholder='Search By Title' />
                        </div>
                    </div>
                    <div style={{ marginLeft: '20px', marginRight: '20px' }}>
                        <div className="blog_info">
                            <table>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th className='description'>Description</th>
                                    <th className='image'>Image</th>
                                    <th>Status</th>
                                    <th>Option</th>
                                </tr>
                                {
                                    search ? blogs.map((element,index)=>{
                                        // if there is any search filter 
                                        element.title = element.title.toLowerCase()
                                        if (element.title.includes(search.toLocaleLowerCase())) {
                                            return <tbody key={index}>
                                                    <tr>
                                                        <td>{index+1}</td>
                                                        <td>{element.title}</td>
                                                        <td className='description'>{element.description}</td>
                                                        <td className='image'> <img style={{height:'80px',width:'150px',borderRadius:'10px'}} src={backendurl+element.img} alt="Blog Image" ></img> </td>
                                                        <td>{element.isDeleted ? "Deleted" : "Active"}</td>
                                                        <td>
                                                            <i className="fa-solid fa-trash mx-2" role='button' onClick={()=>{setId(element._id)}} data-bs-toggle="modal" data-bs-target="#staticBackdrop">D</i> 
                                                            <i className="fa-solid fa-file-pen mx-2" role='button' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{ setId(element._id)}}>E</i>
                                                            {
                                                                element.isDeleted && 
                                                                <i className="fa-solid fa-file-pen mx-2" role='button' data-bs-toggle="modal" data-bs-target="#modelforundo" onClick={()=>{ setId(element._id)}}>U</i>
                                                            }
                                                        </td>
                                                        </tr>
                                                </tbody>
                                        }
                                    })
                                    :
                                    // for no search filter 

                                        blogs.map((element , index)=>{
                                            return <tbody key={index}>
                                            <tr>
                                                <td>{index+1}</td>
                                                <td>{element.title}</td>
                                                <td className='description'>{element.description}</td>
                                                <td className='image'> <img style={{height:'80px',width:'150px',borderRadius:'10px'}} src={backendurl+element.img} alt="Blog Image" ></img> </td>
                                                <td>{element.isDeleted ? "Deleted" : "Active"}</td>
                                                <td>
                                                    <i className="fa-solid fa-trash mx-2" role='button' onClick={()=>{setId(element._id)}} data-bs-toggle="modal" data-bs-target="#staticBackdrop">D</i> 
                                                    <i className="fa-solid fa-file-pen mx-2" role='button' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{ setId(element._id)}}>E</i>
                                                    {
                                                        element.isDeleted && 
                                                        <i className="fa-solid fa-file-pen mx-2" role='button' data-bs-toggle="modal" data-bs-target="#modelforundo" onClick={()=>{ setId(element._id)}}>U</i>
                                                    }
                                                </td>
                                                </tr>
                                        </tbody>
                                        }
                                    )
                                }
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blogs