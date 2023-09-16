// import React from 'react'`

import { useCallback, useState, useEffect, useRef } from "react"

const App = () => {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null) // useRef hook is used here for UI enhancements

  // UseCallback hook Generates the Password  via function and caches the function
  const passwordGenerator = useCallback(()=>{
    let pass=''
    let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if(numberAllowed) str+= '0123456789'
    if(charAllowed) str+= '!@#$%^&*()_+:;~'

    for (let i = 1; i <= length; i++) {
      let char = Math.floor( Math.random() * str.length +1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])


  // useEffect Hook Will Generate Password when window loads
  useEffect(()=>{
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  
  const copyToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,10)  //Selection Ranges
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <main className="bg-slate-700 h-[100vh]">
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg bg-slate-900 text-white text-center text-3xl py-10 px-10">
      Password Generator
      <div className="flex shadow rounded-lg overflow-hidden mt-3 mb-3">
        <input 
        type="text"
        value={password}
        className="outline-none w-full py-1 px-3 text-slate-950 text-xl"
        placeholder="Password"
        readOnly
        ref={passwordRef}
        />
        <button 
        onClick={copyToClipboard}
        className="outline-none bg-blue-900 px-3 py-0.5 shrink-0">Copy</button>

      </div>
      <div className="flex text-sm gap-x-2">
      <div className="flex items-center gap-x-1">

        <input type="range"
          min={6}
          max={100}
          value={length}
          className="cursor-pointer"
          onChange={(e)=>{ setLength(e.target.value) }}
        />
        <label>Length: {length}</label>
     </div>
      </div>

      <div className="mt-5 flex items-center
      gap-x-1">
      <input type="checkbox"
      defaultChecked= {numberAllowed}
      id="numberInput"
      onChange={() => {
        setNumberAllowed((prev)=> !prev)
      }}
      />
      <label>Numbers</label>
     </div>

     <div className="
     flex items-center gap-x-1">
      <input type="checkbox"
      defaultChecked= {charAllowed}
      id="charInput"
      onChange={() => {
        setCharAllowed((prev)=> !prev)
      }}
      />
      <label>Characters</label>
     </div>
      </div>
    
    </main>
  )
}

export default App
