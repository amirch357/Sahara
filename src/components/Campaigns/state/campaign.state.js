import React,{useState} from "react"
import axios from "axios"

const CampaignState=()=>{

const createppeals= async ()=>{
await axios.post("https://sflt.herokuapp.com/api/createappeals")
.then((responce)=>{
    console.log(responce.status)
    
})
}



return {createppeals}
}


export default CampaignState