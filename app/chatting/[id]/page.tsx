"use client"
import { useSearchParams } from "next/navigation"
import { itemStore } from "@/store/itemstore";

import Chattingpage from "./page1";



export default function firstPage(){
  

    const params=useSearchParams();
    const userID=params.get('user') as string;
    const itemID=params.get('id') as string;




    return(
        <Chattingpage userID={userID}  itemID={itemID} />
    )


}