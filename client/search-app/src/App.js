import { useState, useEffect } from 'react'
import './App.css';
import Search from './components/Search';

function App() {
  
  const [data, setActivity] = useState([])
  const [result, setResult] = useState([])

  useEffect(() => {
  
    getData()
     
  }, [])


  const getData = async () => {
    
    try {
      const json_data =  await fetch('http://127.0.0.1:3005/')
      const data = await json_data.json()
      console.log(data)
      setResult(data.tours)
    } catch (er) {
        console.log(er)
    }
  }
  
  const onSearch = async (search) => {
    const res = await fetch('http://127.0.0.1:3005/search?' + new URLSearchParams({
      search: search
    }))

    const result = await res.json()
    if(result) return setResult(result)
    setResult('Search not found ...')
   
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
