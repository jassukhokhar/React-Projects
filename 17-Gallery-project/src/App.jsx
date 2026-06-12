import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from './components/Card'

const App = () => {

  //data on internet mostly comes in json format javascript object notation
  const [userData, setUserData] = useState([])

  const [index, setIndex] = useState(1)

  const getData = async ()=>{
    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=30`)
    setUserData(response.data)
    console.log(response.data);
  }

  useEffect(function(){
    getData()
  },[index])

  let printUserData = <h3 className='text-gray-300 text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold'>Loading...</h3>

  if(userData.length > 0){
    printUserData = userData.map(function(elem,idx){
      return <div key={idx}>
        <Card elem ={elem}/>
      </div>
    })
  }

  return (
    <div className='bg-black h-screen p-4 text-white overflow-auto'>
      {/* <h1 className='fixed bg-red-500 text-6xl'>{index}</h1> */}
      <div className='flex flex-wrap justify-center gap-4 p-2'>
        {printUserData}
      </div>

      <div className='flex items-center justify-center gap-6'>
        <button
         style={{opacity : index ==1 ? 0.5 : 1}}
         onClick={()=>{
          if(index>1){
            setIndex(index-1)
            setUserData([])
          }
         }}
         className='bg-amber-400 cursor-pointer active:scale-95 text-sm text-black rounded px-4 py-2 font-semibold'>
         Prev
        </button>
        <h4>Page {index}</h4>
        <button 
         onClick={()=>{
          setIndex(index+1)
          setUserData([])
         }}
         className='bg-amber-400 cursor-pointer active:scale-95 text-sm text-black rounded px-4 py-2 font-semibold'>
         Next
        </button>
      </div>
    </div>
  )
}

export default App
