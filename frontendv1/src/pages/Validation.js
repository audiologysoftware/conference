import React, { useState } from 'react'

export default function Validation() {
    const [name, setName] = useState("Prashanth")

    const handleValidate = (e) =>{
        e.preventDefault();
        if(!name.includes(1))                
            alert(name)
        else
            alert("1 is present")
    }   

  return (
    <div>
      <input type='text' name='name' value={name} onChange={e=>setName(e.target.value)} />
      <button onClick={handleValidate}>Validate</button>
    </div>
  )
}

