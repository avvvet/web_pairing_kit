import { useState } from 'react'
import React from 'react'
import '../components/search.css';

/*
* here we accept two props, result and onSearch method
* so, every time result state is changed this component will re render again 
* and search result box will show as per the search query.
*/
const Search = ({ result , onSearch}) => {
    const [searchText, setSearchText] = useState('')   // we define this state to help us control the state of the input text.

    /*
    * and this method will update the searchText state (defined up) to hold the text currently typed in the search box
    * it will be called by the onChange event of the search input text 
    */

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
                               <div>{item.isSpecialOffer == true ? 'SPECIAL OFFER' : ''}</div>
                               <div>{item.rating} (rating)</div>
                           </div>
                       ))
                   }
             </div>
        </div>
    )
}

export default Search
