import React from "react";
import { View,Image,Text } from "react-native";
import style from "../../Styles/CardStyle"
import {Button } from "react-native-paper";
import { Progress } from "native-base";

const CampaignCard = (props) => {
    return (
        <View style={style.container}>
           <Image source={{uri:props.image}} style={style.image} />
           <View style={style.titleStyle}>
           <Text style={style.title}>{props.title}</Text>
           </View>
           <View style={style.progress}>
            <Progress  value={props.progress}  _filledTrack={{bg:"#000341"}}   style={{height:6,backgroundColor:"#d3d3d3",borderRadius:10}}  />
            <View style={style.price}>
                <Text style={style.donation}>Raised</Text>
                <Text style={style.donation}>Goal</Text>
            </View>
            <View style={style.price}>
                <Text style={style.number}>{props.currency}{props.raised}</Text>
                <Text  style={style.number}>{props.currency}{props.goal}</Text>
            </View>

           </View>
           <View style={style.buttonContainer}>
            <Button mode="contained" buttonColor="#9d0917"   style={style.button} labelStyle={style.buttonText} onPress={props.onPress}>DONATE NOW</Button>
           </View>
        </View>
    );
};

export default CampaignCard;
