import React,{useState,useEffect} from "react"
import axios from "axios";
import { APPEALS_URL } from "./Link";
const useCampaignState=()=>{
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(true)


    const fetchData= async ()=>{
        try{
            await axios.get(APPEALS_URL).then((response)=>{
                console.log(response.data.data)
                
                setData(response.data.data)
                setLoading(false)
            }).catch(function(error){
                console.log(error)
            })
            
           
           
        }catch(error){
            console.log(error)
        }

}
useEffect(()=>{
    fetchData()
    
 },[])
 return({data,loading})
}




export default useCampaignState

