import React from 'react'

function Pagination({ currentproducts , currentpage , setcurrentpage}) {

  const data = []; 

  for(let i=0 ; i<=currentproducts ; i++){
    data.push(i); 
  }

  return (
    <>
        <div className="container mt-4">
          <ul className="pagination justify-content-center">
              {
                data.map((page,index)=>{

                  return <li className="page-item" key={page} onClick={()=>setcurrentpage(page+1)} >
                    <a className="page-link" style={{backgroundColor:currentpage-1===index? 'dodgerblue' : '',color:currentpage-1===index?'white':''}}  >
                       {page+1}
                    </a>
                  </li>
                
                })
              }
          </ul>
        </div>

    </>
  )
}

export default Pagination