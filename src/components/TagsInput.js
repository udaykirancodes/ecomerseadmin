import React from 'react'
import { useEffect } from 'react';

export default function TagsInput({selected , setselected}) {

    

    const removeTags = (indexToRemove) => {
        console.log('Index '+ indexToRemove); 
        let tg = [...selected]; 
        tg.splice(indexToRemove , 1); 
        console.log(tg); 
        setselected(tg); 
    }

    const addTags = (e)=>{
        if(e.target.value !== ''){
            let value = e.target.value ; 
            setselected([...selected , value.slice(0,-1)]); 
            e.target.value =''; 
        }
    }

    return (
        <div className='tags-input mb-3 col-md-10'>
            <ul className='mb-3'>
                {
                    selected.map((tag,index)=>{
                        return <li key={index} className='button button-info' onClick = {()=>removeTags(index)}>
                            <span>{tag+'  '}</span>
                            <b className="icon">X</b>
                            
                        </li>
                    })
                }
            </ul>
            <input 
            type="text"
            className='form-control'
            placeholder='Enter comma seperated values'
            onKeyUp={e=>(e.key===','?addTags(e) : null)}
            />
        </div>
    )
}
