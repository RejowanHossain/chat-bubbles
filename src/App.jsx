import { useState, useEffect } from 'react'
import useOnKeyPress from './useOnKeyPress'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [list, setList] = useState([])


  useEffect(() => {
    if (list.length > 0) {
      const timer = setTimeout(() => {
        const updatedList = [...list];
        updatedList.shift(); // Remove the first element
        setList(updatedList);
      }, 10000); // Remove after 5 seconds (5000 milliseconds)

      return () => clearTimeout(timer); // Cleanup the timer on component unmount or list update
    }
  }, [list]);



  const handleSubmit = () =>{
    if (input.trim() !== '') {
      setList([...list, input ])
      setInput('')
    }
  }

  useOnKeyPress(handleSubmit, 'Enter')

  return (
    <>
      { input && <div className='bubble'>{input}</div>}
      <div className='formContainer'>
        <input type="text" value={input} onChange={(event) => setInput(event.target.value)} />
        <button onClick={handleSubmit}>submit</button>
      </div>

      <div className='container'>
        {list.map((item, index) => (<div key={index} className='chats'>{item}</div>))}
      </div>
    </>
  )
}

export default App
