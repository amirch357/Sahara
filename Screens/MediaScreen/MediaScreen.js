import React,{useEffect,useState} from "react";
import { View,Text,Image,StyleSheet,ScrollView,FlatList,ActivityIndicator } from "react-native";
import axios from "axios";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MEDIA_URL,MEDIA_IMAGE_URL } from "../../utils/Link";
import ImageView from "react-native-image-viewing"








const MediaScreen = () => {

       const [images,setImages]=useState()
    const [loading,setLoding]=useState(true)
    const [model,setModel]=useState(false)
    const getImage= async ()=>{
        await axios.get(MEDIA_URL).then((responce)=>{
            setImages(responce?.data?.data)
            console.log(responce.data.data)
            setLoding(false)
        })
    }
    useEffect(()=>{
        getImage()
    })
return(
    <View style={{justifyContent:"center"}}>
         {loading?<ActivityIndicator size="large" color="red" />:
        <FlatList data={images} 
        numColumns={2}
        renderItem={({item})=>{
            return(
                
 <View style={style.imageContainer}>
   
 <Image source={{uri:`${MEDIA_IMAGE_URL}/${item.IMAGES}`}}  style={style.image}/>

 </View>
 
       ) }} />
           
       
            }
    </View>
)
};

const style=StyleSheet.create({
    imageContainer:{
        flex:1,
        height:120,
        width:100,
        backgroundColor:"#FFF",
        margin:10,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:5
    },
    image:{
        height:"100%",
        width:"100%",
        borderRadius:5
    }
})


export default MediaScreen;
