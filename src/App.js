import logo from './logo.svg';
import './App.css';
import { useRef, useState } from 'react';

function App() {
  // useState triggers rerenders
  const[randomInput,setRandomInput]=useState("");
  const[seconds,setSeconds]=useState(1);
  
  // useRef doesn't trigger a rerender
  const renders=useRef(0);
  const inputRef=useRef();
  const timerId=useRef();




  const handleChange=(e)=>{
    setRandomInput(e.target.value)
    // .current property is to get the value of the ref
    // to count each time a function is called ,each time a state renders
    // its just one of the capabilities of useRef 
    renders.current++;
  }

  // useRef also used to focus on an element in JSX
   const focusOnInput =()=>{
          inputRef.current.focus();
  }

  const startTimer=()=>{
    timerId.current=setInterval(()=>{
      renders.current++;
      setSeconds(prev=>prev+1);
    },1000)
  }

  const stopTimer=()=>{
    clearInterval(timerId.current)
    timerId.current=0;
  }

  const resetTimer=()=>{
    // call stopTimer into action once we click to 
    stopTimer()
    if(seconds){
      renders.current++;
      setSeconds(0);
    }

  }
  return (
    <div className="App">
      <input value={randomInput}
      type="text"
      onChange={handleChange} 
      placeholder=" Random Input"
      ref={inputRef}/>
      <p>Renders:{renders.current}</p>
      <br/>
      <p>{randomInput}</p>
      <br/>
      <button onClick={focusOnInput}>Focus</button>
      <section>
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </section>
      <p>Seconds:{seconds}</p>
    </div>
  );
}

export default App;
