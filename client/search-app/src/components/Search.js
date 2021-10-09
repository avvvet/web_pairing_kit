import { useState } from 'react'
import React from 'react'
import '../components/search.css';

const Search = ({ result , onSearch}) => {
    const [searchText, setSearchText] = useState('')

    const onSearchChange = (e) => {
        setSearchText(e.target.value)
    }

    return (
        <div>
            <div className='search_box'>
               <div className='searchTitle'>Search Tours</div>
               <div>
                  <input type="text" className='txtSearch' value={searchText} onChange={(e) => onSearchChange(e)}/>
                   <input type='button' className='btnSearch' value='search' onClick={() => onSearch(searchText)}/>
               </div> 
            </div>
             
             <div className='result'>
                   {
                       result.map((item) => (
                           <div className='row'>
                               <div>{item.id}</div>
                               <div>{item.title}</div>
                               <div>{item.currency}{item.price}</div>
                               <div></div>
                               <div>{item.rating}</div>
                           </div>
                       ))
                   }
             </div>
        </div>
    )
}

export default Search
