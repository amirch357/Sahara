import React,{useState,useEffect} from "react";
import { View,Text,TouchableOpacity,ScrollView,ActivityIndicator,Image,BackHandler,Alert, RefreshControl,FlatList } from "react-native";
import { Button } from "react-native-paper";
import style from "../../Styles/HomeStyle"
import ButtonGroup from "../../Components/ButtonGroup/ButtonGroup";
import PapularCampCard from "../../Components/PapularCampCard/PapularCampCard";

import useCampaignState from "../../utils/Campaign.state";
import { IMAGE_URL } from "../../utils/Link";





const HomeScreen = ({navigation}) => {
    const {data,loading,networkError,refreshing,onRefresh}= useCampaignState()

const [filters,setFilters]=useState([])


  const pressed=(item)=>{
  if(item===0){
    return setFilters(Madical)
  }else if(item===1){
    return setFilters(Disaster)
  }else if(item===2){
    return setFilters(Education)
  }
  }


  const backActionHome = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

useEffect(()=>{
  setFilters(pressed())
  

   BackHandler.addEventListener(
    "hardwareBackPress",
    backActionHome
  );

  return () => BackHandler.removeEventListener("hardwareBackPress", backActionHome);
    
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
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={style.container}>
        <View style={style.button}>
        <Button mode="contained" buttonColor="#8b0000" textColor="#FFFF" onPress={()=>navigation.navigate("APPEAL")}>Donate Now</Button>
        </View>
        <View style={style.catcontainer}>
        <Text style={style.cattext}>Category</Text>
       
        </View>
        <View style={style.catButtonContainer}>
        <ButtonGroup buttons={["Medical","Disaster","Education"]}  pressed={pressed}   />
            </View>
            <View style={style.campaignContainer}>
                <Text style={style.cattext} >Papular</Text>
                <TouchableOpacity onPress={()=>{navigation.navigate("APPEAL")}}>
                <Text style={style.seeMoreText} >See More</Text>
                </TouchableOpacity>

            </View>
           
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
           
            {networkError?<Text style={{marginLeft:10,fontSize:20}}>No Internet Connection</Text>:
              loading || refreshing ?<View style={{justifyContent:"center",alignItems:"center",paddingLeft:50,paddingTop:40}}><ActivityIndicator size="large" color="red" /></View>:
            filters?
                filters.map((item)=>(
                  <View key={item.ID}>
            <PapularCampCard  progress={item.GOAL_AVERAGE} image={{uri:`${IMAGE_URL}/${item.IMAGE}`}}  title={item.TITLE} goal={item.GOAL} raised={item.RAISED}   onPress={()=>{navigation.navigate("Detail",{title:item.TITLE,dESC:item.DESCRIPTION,goal:item.GOAL,raised:item.RAISED,progress:item.GOAL_AVERAGE,image:`${IMAGE_URL}/${item.IMAGE}`})}} loading={loading} />
            </View>
           ))
            :
          
           data.slice(0,3). map((i)=>(
            <View key={i.ID}>
                <PapularCampCard  goal={i.GOAL} image={{uri:`${IMAGE_URL}/${i.IMAGE}`}}  progress={i.GOAL_AVERAGE} raised={i.RAISED} title={i.TITLE} onPress={()=>{navigation.navigate("Detail",{title:i.TITLE,desc:i.DESCRIPTION,goal:i.GOAL,raised:i.RAISED,progress:i.GOAL_AVERAGE,image:`${IMAGE_URL}/${i.IMAGE}`})}} loading={loading} />
                </View>
                ))
           
        }
       
                
                </ScrollView>
            </View>
           
           
        </View>
        </ScrollView>
    );
};

export default HomeScreen;
