import React,{useState,useEffect,useCallback} from "react";
import { View,Text,Image, TouchableOpacity,ScrollView,BackHandler } from "react-native";
import style from "../../Styles/DetailStyle"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Button} from "react-native-paper";
import ReadMore from "react-native-read-more-text";
import { Progress } from "native-base";


const Tab=createMaterialTopTabNavigator()

const DetailScreen = ({route,navigation},props) => {
    const {title,image,desc,goal,raised,progress}=route.params
    const backActionDetal = () => {
    navigation.goBack()
      return true;
    }
useEffect(()=>{
 

  const backHandlerDetail = BackHandler.addEventListener(
    "hardwareBackPress",
    backActionDetal
  );

  return () => backHandlerDetail.remove();
},[])



    _renderTruncatedFooter = (handlePress) => {
        return (
          <Text style={{color: "#1e90ff", marginTop: 5}} onPress={handlePress}>
            Read more
          </Text>
        );
      }
     
      _renderRevealedFooter = (handlePress) => {
        return (
          <Text style={{color: "#1e90ff", marginTop: 5}} onPress={handlePress}>
            Show less
          </Text>
        );
      }

   
    return (



        <View style={{flex:1,backgroundColor:"#FFF"}}>
        <ScrollView>
        <Image source={{uri:image}} style={style.image} />
        <View style={style.titleContainer}>
          <Text style={style.title}>{title}</Text>
        </View>
        <View style={style.descContainer}>
            <ReadMore style={style.desc} numberOfLines={3} renderTruncatedFooter={_renderTruncatedFooter} renderRevealedFooter={_renderRevealedFooter} onReady={()=>{<Text>Ready</Text>}}><Text style={{color:"#000"}}>{desc}</Text></ReadMore>
        </View>
        <View style={style.ProgressContainer}>
        <Progress style={style.ProgressBar} value={progress} _filledTrack={{bg:"#000341"}}  />
        <View style={style.price}>
                <Text style={style.donation}>Raised</Text>
                <Text style={style.donation}>Goal</Text>
            </View>
            <View style={style.price}>
                <Text style={style.number}>£ {raised}</Text>
                <Text  style={style.number}>£ {goal}</Text>
            </View>
            <View style={style.buttonContainer}>
                <Button mode="contained" buttonColor="#9d0917" labelStyle={style.buttonText} onPress={()=>{navigation.navigate("Donate",{title:title})}}>Donate Now</Button>
            </View>
        </View>
        </ScrollView>
        </View>
       
    );
};

export default DetailScreen;
