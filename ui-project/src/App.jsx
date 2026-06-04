import React from 'react'
import Section1 from './components/Section1/Section1'
import Section2 from './components/Section2/Section2'

const App = () => {

  const users = [
    {
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya2luZyUyMHByb2Zlc3Npb25hbHxlbnwwfHwwfHx8MA%3D%3D',
      intro: '',
      color: 'royalblue',
      tag: 'Satisfied'
    },
    {
      img: 'https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHdvcmtpbmd8ZW58MHx8MHx8fDA%3D',
      intro: '',
      color: 'lightseagreen',
      tag: 'Underserved'  
    },
    {
      img: 'https://images.unsplash.com/flagged/photo-1575227057258-50cb9bffb1af?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fHdvcmtpbmd8ZW58MHx8MHx8fDA%3D',
      intro: '',
      color: 'orange',
      tag: 'Underbanked'
    },
    {
      img: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fHdvcmtpbmd8ZW58MHx8MHx8fDA%3D',
      intro: '',
      color: 'pink',
      tag: 'Understate'
    },
    {
      img: 'https://images.unsplash.com/photo-1488751045188-3c55bbf9a3fa?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODh8fHdvcmtpbmd8ZW58MHx8MHx8fDA%3D',
      intro: '',
      color: 'blue',
      tag: 'Oversurved'
    }
  ]
  return (
    <div>
      <Section1 users = {users}/>
      <Section2/>
    </div>
  )
}

export default App
