import React, { useState } from 'react';
import { calculateCall } from '../../api/calculate'
import './style.css'

const Calculator = () => {
  const [ result, setResult ] = useState('0');

  const reset = () => setResult('0');

  const backspace = () => setResult(result.slice(0, -1) || '0');
  
  const calculate = async () => {
    try {
      const calculatedResult = await calculateCall(result)
      setResult(calculatedResult);
    } catch (e) {
      alert('Please enter correct characters')
    }
  }

  const clickHandle = ({ target }) => {
    const value = target?.name;
    if (value === "=") {
      calculate()
    } else if (value === "C") {
      reset()
    } else if (value === "CE") {
      backspace()
    }
    else {
      setResult(result === '0' ? value : result + value)
    }
  }
  const calcData = ['1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9', '*', '.', '0', '=', '/', ]
  

  return (
    <div className="wrapper">
      <div className="result">
        <p data-testid="result">{result}</p>
      </div>
      <div className="calcButtons">
        <button className="removeBtn" name="CE" onClick={clickHandle}>CE</button>
        <button className="removeBtn" name="C" onClick={clickHandle}>C</button><br/>
        {calcData.map(el => <button name={el} key={el} onClick={clickHandle}>{el}</button>)}
      </div>
    </div>
  )
}

export default Calculator