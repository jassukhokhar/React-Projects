import React from 'react'
import RightCard from './RightCard'

const RightContent = (props) => {
  return (
    <div id = 'right' className='h-full p-6 w-2/3 flex flex-nowrap rounded-4xl gap-10 overflow-x-auto'>
        {props.users.map(function(elem,idx){
            return <RightCard key = {idx} id = {idx} img ={elem.img} color={elem.color} tag = {elem.tag}/>
        })}
    </div>
  )
}

export default RightContent
