import React, { useState } from 'react'
import { X } from 'lucide-react';

const App = () => {

  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')

  const [task, setTask] = useState([])

  const submitHandler = (e)=>{
    e.preventDefault()

    const copyTask = [...task]
    copyTask.push({title,details})
    setTask(copyTask)
    // console.log(copyTask); ek step piche chalega in console
    setTitle('')
    setDetails('')
  }

  const deleteNote = (idx)=>{
    const copyTask = [...task]
    copyTask.splice(idx,1)
    setTask(copyTask)
  }


  return (
    <div className='h-screen lg:flex bg-black text-white'>
      <form onSubmit={(e)=>{
        submitHandler(e)
      }} className='flex lg:w-1/2 flex-col items-start gap-4 p-10'>

          <h1 className='text-4xl font-bold'>Add Notes</h1>

          {/* PEHLA INPUT FOR HEADING  */}
          <input
          type="text" 
          placeholder='Enter Notes Heading'
          className='px-5 py-2 w-full border-2 font-medium outline-none rounded'
          value={title}
          onChange={(e)=>{
            setTitle(e.target.value)
          }}
          />

          {/* DETAILED INPUT */}
          <textarea
          type="text"
          placeholder='Enter Details here'
          className='px-5 h-32 w-full py-2 border-2 font-medium outline-none rounded'
          value={details}
          onChange={(e)=>{
            setDetails(e.target.value)
          }}
          />

          <button 
            className='bg-white cursor-pointer active:scale-95 text-black px-5 py-2 w-full outline-none font-medium rounded'
          >
            Add Note
          </button>

      </form>
      <div className='lg:border-l-2 lg:w-1/2 p-10'>
        <h1 className='text-4xl font-bold'>Recent Notes</h1>
        <div className='flex flex-wrap items-start justify-start gap-5 mt-5 h-[90%] overflow-auto'>
          {task.map(function(elem,idx){
            return <div key={idx} className="relative h-52 w-40 rounded-xl text-black px-4 py-9 bg-cover bg-[url('https://static.vecteezy.com/system/resources/previews/037/152/677/non_2x/sticky-note-paper-background-free-png.png')]">
              <h2 onClick={()=>{
                deleteNote(idx)
              }} className='absolute cursor-pointer active:scale-95 top-5 right-3 bg-red-500 p-1 text-xs rounded-full'><X size={12} strokeWidth={2.75} /></h2>
              <h3 className='leading-tight text-lg font-bold'>{elem.title}</h3>
              <p className='mt-3 leading-tight text-xs font-semibold text-gray-600'>{elem.details}</p>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}

export default App
