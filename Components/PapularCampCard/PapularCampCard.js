import React from "react";
import { View,StyleSheet,Text,Image,TouchableOpacity,ActivityIndicator } from "react-native";

import { Progress } from "native-base";

const PapularCampCard = (props,loading) => {
    return (
        <View style={style.container}>
        
           {loading===true? <View style={{justifyContent:"center",alignItems:"center"}}><ActivityIndicator /></View>: 
       
        <TouchableOpacity onPress={props.onPress}>
        <Image source={props.image} style={style.image} />
            <Text style={style.title}>{props.title}</Text>
            <View style={ style.progressStyle}>
            <Progress   value={props.progress}
            
            _filledTrack={{bg:"#000341"}}
            style={{backgroundColor:"#d3d3d3",borderRadius:4}}

            />
            </View>
            <View style={style.goalContainer}>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <Text style={style.goalText}>Raised</Text>
            <Text style={style.goalText}>Goal</Text>
            
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <Text style={style.goalText}>£ {props.raised}</Text>
            <Text style={style.goalText}>£ {props.goal}</Text>
            </View>
            </View>
            </TouchableOpacity>
        }
        </View>
    );
};

const style=StyleSheet.create({
    container:{
       
        backgroundColor:"#FFF",
        height:340,
        width:195,
        margin:10,
        borderRadius:10,
        hadowColor: "#000",
        shadowOffset: {
	        width: 2,
	        height: 2,
            },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image:{
        height:236,
        borderRadius:10,
       
       
    },
    title:{
        fontSize:13,
        fontWeight:"900",
        color:"#666666",
        margin:5
    },
    progressStyle:{
        paddingLeft:3,
        paddingRight:3
    },
    goalContainer:{
        
        
        padding:3
    },
    goalText:{
        fontSize:12
    },
    
})

export default PapularCampCard;
