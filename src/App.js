import './App.css';
import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { useState } from 'react';

function App() {

  const [interest,setInterest] = useState(0)
  const [principal, setPrincipal] = useState(0)
  const [rate, setRate] = useState(0)
  const [year, setYear] = useState(0)
  const [IsPrincipal, setIsPrincipal] = useState(true)
  const [IsRate, setIsRate] = useState(true)
  const [IsYear, setIsYear] = useState(true)


  const getValidate = (e) => {
    const{name,value}= e.target
    console.log(name,value)
    // To check the patterns we use regular expression in javascript
    value.match("/^[0-9]+$/")
    console.log( value.match(/^[0-9]+$/));
    console.log( !!value.match(/^[0-9]+$/)); //To convert the result to boolean

    if(!!value.match(/^[0-9]+$/)){
      //if(!!value.match(/^[0-9]*.?[0-9]+$/)){  -----> To accept decimal 

      if(name==="principal"){
        setPrincipal(value)
        setIsPrincipal(true)

      } else if(name==="rate"){
        setRate(value)
        setIsRate(true)
      } else if(name==="year"){
        setYear(value)
        setIsYear(true)
      }
      
    } else{
      if(name==="principal"){
      setPrincipal(value)
      setIsPrincipal(false)
      } else if(name==="rate"){
        setRate(value)
        setIsRate(false)
      } else if(name==="year"){
        setYear(value)
        setIsYear(false)
      }
    }

  }


  const handleCalculate = (e) => {
    e.preventDefault();
    if(!principal || !rate ||!year){
      alert("Please fill the form")
    } else{
      setInterest(principal*rate*year/100)
    }
  }

  const handleReset = (e) => {
    setInterest(0)
    setRate(0)
    setYear(0)
    setPrincipal(0)
    setIsPrincipal(true)
    setIsRate(true)
    setIsYear(true)
  }

  return (
    <div style={{height:"100vh"}} className="d-flex justify-content-center align-items-center w-800 bg-dark">
      <div className='bg-light p-5 rounded'>
        <h1>Simple Interest App</h1>
        <p>Calculate simple interest easily</p>

        <div className="d-flex justify-content-center align-items-center w-800 bg-warning p-3 rounded flex-column">
          <h1>₹ {''} {interest}</h1>
          <p>Total Simple Interest</p>
        </div>

        <form className='mt-5' onSubmit={handleCalculate}>
          <div className='mb-3'>
             <TextField name="principal" value={principal || ""} onChange={(e)=>getValidate(e)} className='w-100' id="outlined-basic" label="₹ Principal amount" variant="outlined" />
          </div>
          { !IsPrincipal &&
            <div>
            <p className='text-danger'>Invalid Input</p>
          </div>}


          <div className='mb-3'>
             <TextField name="rate" value={rate || ""} onChange={(e)=>getValidate(e)}  className='w-100' id="outlined-basic" label="Rate of interest %" variant="outlined" />
          </div>
          { !IsRate &&
            <div>
            <p className='text-danger'>Invalid Input</p>
          </div>}


          <div className='mb-3'>
             <TextField name="year" onChange={(e)=>getValidate(e)} value={year || ""} className='w-100' id="outlined-basic" label="Year" variant="outlined" />
          </div>
          { !IsYear &&
            <div>
            <p className='text-danger'>Invalid Input</p>
          </div>}
          <Stack className='mt-5' direction="row" spacing={2}>
            <Button type="submit" disabled={IsPrincipal && IsRate && IsYear?false:true} className='bg-success' style={{width:"200px", height:"50px"}} variant="contained">Calculate</Button>
            <Button onClick={handleReset}  style={{width:"200px", height:"50px"}} variant="outlined">Reset</Button>
          </Stack>
        </form>

      </div>
    </div>
  );
}

export default App;
