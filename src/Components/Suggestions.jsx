import React from "react";
import ListItem from "./ListItem";

function Suggestions({
  searchData,
  highlightedItem,
  addChip,
  sethighlightedItem,
}) {
  return (
    <>
      <div className="flex flex-col h-full  text-white bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-t-0 bs border-gray-100">
        {searchData.length > 0 &&
          searchData.map((item, index) => {
            return (
              <ListItem
                key={index}
                addChip={addChip}
                sethighlightedItem={sethighlightedItem}
                index={index}
                className={`py-2  px-16  
            ${index != searchData.length - 1 && "border-b-2"} 
             ${
                highlightedItem === index &&
               "bg-black/40 text-purple-300 transition-all ease-in dealy-100"
             } w-full`}
                item={item}
                isActive={item.isAdded}
              />
            );
          })}
      </div>
    </>
  );
}

export default Suggestions;
