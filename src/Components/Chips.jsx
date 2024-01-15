import React from 'react'
import { RxCross2 } from "react-icons/rx";
function Chips({item,removeChip}) {
  return (
    <>
    {item.isAdded && 
    <span onClick={()=>{removeChip(item)}} className="inline-flex  mt-2  justify-between items-center px-4
     py-2 rounded-full text-sm font-medium bg-purple-300 text-purple-800 mr-2">
      {item.item}   
        <RxCross2 size={17}  className="ml-1.5 bg-black rounded-full p-0.5 -mr-0.5   text-white"/>
      </span>
    }
    </>
  )
}

export default Chips