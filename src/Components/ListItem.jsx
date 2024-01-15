import React from 'react'

export default function ListItem({item,className,index,addChip,sethighlightedItem}) {
  return (
    <div className={className}
    onClick={()=>{addChip(item)}}
    onMouseEnter={() => sethighlightedItem(index)}
     >{item.item}</div>
  )
}
