import React,{useState} from "react";
import { View,TouchableOpacity,Text,StyleSheet,ScrollView } from "react-native";

const ButtonGroup = ({buttons,pressed}) => {

    const [clickId,setClickId]=useState(-1)

    const handleClick=(item,id,buttons,title)=>{
        setClickId(id)
        pressed(id)
    }

    return (
        
        <View style={{flex:1,flexDirection:"row"}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {buttons.map((buttonLabel,index)=>{
            return(
                <TouchableOpacity
                onPress={(id)=>handleClick(id,index)}
                key={index} 
                style={[index===clickId ? style.buttonActive:style.button]}>
                <Text style={[index===clickId?style.textActive:style.text]}
                >{buttonLabel}</Text>
            </TouchableOpacity>
            )
        })}
           
        </ScrollView>
        </View>
      
    );
};
const style=StyleSheet.create({
    button:{
        backgroundColor:"#FFF",
        height:40,
        width:90,
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center",
        margin:10
    },
    text:{
        fontWeight:"900",
        color:"#000"
    },
    buttonActive:{
        height:40,
        width:90,
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center",
        margin:10,
        backgroundColor:"rgb(139, 0, 0)"
    },
    textActive:{
        fontWeight:"900",
        color:"#FFF"
    }
})

export default ButtonGroup;
