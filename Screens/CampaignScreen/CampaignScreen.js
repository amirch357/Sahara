import React,{useState,useEffect} from "react";
import { View,ScrollView,ActivityIndicator,Text } from "react-native";
import CampaignCard from "../../Components/CampaignCard/CampaignCard";
import useCampaignState from "../../utils/Campaign.state";
import style from "../../Styles/CardStyle"
import ButtonGroup from "../../Components/ButtonGroup/ButtonGroup";
import { IMAGE_URL } from "../../utils/Link";
const CampaignScreen = ({navigation}) => {
const {data,loading}= useCampaignState()
   
const [filters,setFilters]=useState([])


  const pressed=(item)=>{
  if(item===0){
    return setFilters(data)
  }else if(item===1){
    return setFilters(Madical)
  }else if(item===2){
    return setFilters(Disaster)
  }else if(item===3){
    return setFilters(Education)
  }
  }

  useEffect(()=>{
    
    setFilters(pressed())
   
   
  
  },[])
  
  
  

  const Education=data.filter(function(item){
      return item.DESCRIPTION?.includes("(v.03)")===true
  })
  const Madical=data.filter(function(item){
      return item.DESCRIPTION?.includes("(v.01)")===true
      
  })
  const Disaster=data.filter(function(item){
      return item.DESCRIPTION?.includes("(v.02)")===true
  })
  


 

    return (
        <ScrollView>
        <View style={{flex:1}}>
        <Text style={style.header}>Make the world better</Text>
        <View style={style.filterButton}>
        <ButtonGroup buttons={["Global","Medical","Disaster","Education"]}  pressed={pressed}   />
        </View>
        {loading==true?<View style={{justifyContent:"center",marginTop:300}}>
        <ActivityIndicator size={40} color="red" />
       </View>:
       
       filters?filters.map((item)=>(
        <View key={item.ID}>
        <CampaignCard
       
        title={item.TITLE}
        image={`${IMAGE_URL}/${item.IMAGE}`} 
        currency="£" 
        goal={item.GOAL} 
        raised={item.RAISED}
        progress={item.GOAL_AVERAGE} 
        onPress={()=>navigation.navigate("Detail",{
            title:item.TITLE,
            image:`${IMAGE_URL}/${item.IMAGE}`,
            desc:item.DESCRIPTION,
            goal:item.GOAL,
            raised:item.RAISED,
            progress:item.GOAL_AVERAGE
        })}

        />
        </View>

       )):
        data.map((item)=>(
        <View key={item.ID}>
        <CampaignCard
        title={item.TITLE}
        image={`${IMAGE_URL}/${item.IMAGE}`} 
        currency="£" 
        goal={item.GOAL} 
        raised={item.RAISED}
        progress={item.GOAL_AVERAGE} 
        onPress={()=>navigation.navigate("Detail",{
            title:item.TITLE,
            image:`${IMAGE_URL}/${item.IMAGE}`, 
            desc:item.DESCRIPTION,
            goal:item.GOAL,
            raised:item.RAISED,
            progress:item.GOAL_AVERAGE
        })}

        />
        </View>
     ))}
       
     </View>
        
           

      
       
            
        
        </ScrollView>
    );
};

export default CampaignScreen;
