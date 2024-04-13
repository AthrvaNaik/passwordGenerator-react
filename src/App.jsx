import { useState,useCallback,useEffect,useRef } from "react"

function App() {
  const [length,setLength] = useState(8)
  const [numAllowed, setNumAllowed]= useState(false)
  const [charAllowed, setCharAllowed] = useState(true)
  const [password,setPassword] = useState("")

  //useRef
  const passwordRef= useRef(null)


  const passwordGenerator= useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*()_+-=~[]{}:<>?/,."

    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random()*str.length + 1);
      pass += str.charAt(char)      
    }

    setPassword(pass)

  },[length,numAllowed,charAllowed,setPassword])

  const copyPasswordToClibboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numAllowed,charAllowed,passwordGenerator])

  return (
    <div >
      <h1 className='text-4xl text-center text-white'>Password Generator</h1>
      <div className='w-full max-w-md mx-auto shadow-md rounded-xl px-4 my-8 text-orange-500 bg-gray-800 p-5'>
       <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly  ref={passwordRef}/>
          <button onClick={copyPasswordToClibboard} className="outline-none bg-blue-600 p-1 shrink-0">Copy</button>
       </div>
       <div className="flex text-sm gap-x-3">
          <div className="flex items-center gap-x-1">
            <input type="range" min={6} max={20} value={length} className="cursor-pointer" 
              onChange={(e)=>{
                setLength(e.target.value)
              }}
            />
            <label>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" 
            defaultChecked={numAllowed}
            id="numberInput"
            onChange={()=>{
              setNumAllowed((prev)=>!prev)
            }} 
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" 
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={()=>{
              setCharAllowed((prev)=>!prev)
            }} 
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
       </div>
      </div>
    </div>
  )
}

export default App
