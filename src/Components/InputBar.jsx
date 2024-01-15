import React, { useEffect, useState } from "react";
import Suggestions from "./Suggestions";
import Data from "../utils/API";
import Chips from "./Chips";

function InputBar() {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const handleEvent=(e)=>{
    setSearch(e.target.value)
  }
 const [data,setData]=useState(Data);
  const [highlightedItem, sethighlightedItem] = useState(-1)

  const handleKeyDown=(e)=>{
    if(e.key==="ArrowUp" && highlightedItem>0){
        sethighlightedItem(prev=>prev-1)
    }
    if(e.key==="ArrowDown" && highlightedItem<searchData.length-1){
        sethighlightedItem(prev=>prev+1)
    }else if(e.key==="Enter" && highlightedItem>=0 && searchData.length>0){
        addChip(searchData[highlightedItem])
    }
  }
  const [chipCount,setChipCount]=useState(0)
 const addChip=(item)=>{   
    if(item.item && chipCount<3){
        setData((prevData) => { 
            return prevData.map((dataItem) =>
                dataItem.item === item.item
                  ? { ...dataItem, isAdded: true }
                  : dataItem
              );
            });  
            setChipCount(prev=>prev+1)
    }
    if(chipCount>=3){
        alert("You can select only 3 items");
    }
  }
  useEffect(() => {
    if(search!==""){
      const filterData=data.filter((item)=>{
            if(item.isAdded===false)
            return item.item.toLowerCase().includes(search.toLowerCase())
        })
        setSearchData(filterData)
    }else{
        setSearchData([])
        sethighlightedItem(-1)
    }
  }, [search,data]);
  const removeChip=(item)=>{  
    console.log("removeChip",item.item);
    setData((prevData) => { 
        return prevData.map((dataItem) =>
            dataItem.item === item.item
              ? { ...dataItem, isAdded:false }
              : dataItem
          );
        });  
        setChipCount(prev=>prev-1)

    }

  return (
    <fieldset className="min-w-44 flex flex-col items-center justify-center w-full mb-12 space-y-1 text-gray-700 dark:text-gray-100">
    <h1>You can also utlize the arrow keys to search up!</h1>
      <div className="relative min-w-32   px-2 text-sm
      flex md:flex-row flex-col items-center justify-center  z-10 
          rounded-md border-r-2 sm:w-auto transition-all
           delay-100 ease-in dark:bg-gray-800 dark:text-gray-100
            focus:dark:bg-gray-900 focus:border-violet-400 bg-white">
        <div className="grid grid-cols-3 gap-2">
        {data.map((item, index) => {   
                return <Chips removeChip={removeChip} key={index} item={item} />; 
         })}
        </div>
        <input
          type="search"
          name="Search"
          onChange={handleEvent}
          value={search}
          placeholder="Search..."
          className=" pr-10 pl-2 my-4 focus:outline-none"
            onKeyDown={handleKeyDown}
        />
         <span className="absolute bottom-3  right-0 flex items-center pl-2">
          <button
            type="button"
            title="search"
            className="p-1 focus:outline-none focus:ring"
          >
            <svg
              fill="currentColor"
              viewBox="0 0 512 512"
              className="w-4 h-4 text-gray-700 dark:text-gray-100"
            >
              <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
            </svg>
          </button>
        </span>
      </div>
            {
                searchData.length>0 && <Suggestions sethighlightedItem={sethighlightedItem} addChip={addChip} searchData={searchData} highlightedItem={highlightedItem}/>   
            }
    </fieldset>
  );
}

export default InputBar;
