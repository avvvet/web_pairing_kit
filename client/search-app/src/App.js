import { useState, useEffect } from 'react'
import './App.css';
import Search from './components/Search';

function App() {
  // we use this state to hold the result that comes after user clicked the onSearch method
  // beacuse it is passed as props every time it is updated , the child component Search will be  re rendered with out refresh
  const [result, setResult] = useState([])

  
  /*
  * this will react hook will allow us to call getData() function before page load.
  * we remove this hook. but the intial data loading functionality will not be there.
  */
  useEffect(() => {
  
    getData()
     
  }, [])

  //this is our method that called for the before the search page render
  const getData = async () => {
    
    try {
      const json_data =  await fetch('http://127.0.0.1:3005/')
      const data = await json_data.json()
  
      setResult(data.tours)
    } catch (er) {
        console.log(er)
    }
  }
  
  
  /*
  * this method is diffined here in the app component but it will be fired from search component
  * so it will be passed as props for the search component.
  */
  const onSearch = async (search) => {
    const res = await fetch('http://127.0.0.1:3005/search?' + new URLSearchParams({
      search: search
    }))

    const result = await res.json()
    if(result) return setResult(result)
    setResult([])
   
  }
  
  return (
    <div className="main">
      <div className='container'>
        <Search result={result} onSearch={ onSearch }/>  
      </div>
    </div>
  );
}

export default App;
