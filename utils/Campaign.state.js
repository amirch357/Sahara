import React,{useState,useEffect} from "react"
import axios from "axios";
import { APPEALS_URL } from "./Link";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
const useCampaignState=()=>{
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(true)
    const [networkError,setNetworkError]=useState("") 
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setLoading(true)
        wait(2000).then(()=>setRefreshing(false),setLoading(false))
      }, []);

    
    const fetchData= async ()=>{
        try{
            
                await axios.get(APPEALS_URL).then((response)=>{
                    console.log(response.data)
                   
                        setData(response.data.data)
                        setRefreshing(false)
                        setLoading(false)
                    
                     
                    
                    
                    
                       
                    
                    
                })  .catch(function(error){
                    console.log("Error",error)
                    setNetworkError(error)
                })
           
             
       
        
          
          
            
           
           
        }catch(error){
            console.log(error)
        }

}



useEffect(()=>{
  
    fetchData() 
    
 },[])
 return({data,loading,networkError,refreshing,onRefresh})
}




export default useCampaignState

