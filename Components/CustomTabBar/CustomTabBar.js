import React,{useState} from "react";
import { View,StyleSheet,Text,TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"

const CustomTabBar = ({  navigation }) => {

    
const [focused,setFocused]=useState("Home")




    return (
        <View style={{ flexDirection: 'row',backgroundColor:"#000341",height:50,justifyContent:"space-evenly",alignItems:"center",borderTopLeftRadius:20,borderTopRightRadius:20 }}>
        <TouchableWithoutFeedback onPress={()=>{navigation.navigate("HOME") ,setFocused("Home") }}>
        <View style={{alignItems:"center"}}>
        <Icon name={focused=="Home"?"home":"home-outline"} color="#ffb636" size={24}  />
        <Text style={style.title}>
            HOME
        </Text>
        </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>{navigation.navigate("MEDIA"),setFocused("images")}}>
        <View style={{alignItems:"center"}}>
        <Icon name={ focused=="images"? "images":"images-outline"} color="#ffb636" size={24} />
        <Text style={style.title}>
        
            MEDIA
        </Text>
        </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>{navigation.navigate("APPEAL"),setFocused("heart")}}>
        <View style={{justifyContent:"center",alignItems:"center"}}>
        <Icon name={focused=="heart"?"heart":"heart-outline"} color="#ffb636" size={24}  />
        <Text style={style.title}>
        APPEAL
        </Text>
        </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>{navigation.toggleDrawer(),setFocused("menu")}}>
        <View style={{justifyContent:"center",alignItems:"center"}}>
        <Icon name={focused=="menu"?"ios-menu":"ios-menu-outline"} color="#ffb636" size={24}  />
        <Text style={style.title}>
        MENU
        </Text>
        </View>
        </TouchableWithoutFeedback>
      
     
    </View>
    );
};
const style=StyleSheet.create({
    container:{
        backgroundColor:"green"
    },
    title:{
        color:"#FFF",
        fontWeight:"900",
        fontSize:10,
        paddingTop:2
    }
})
export default CustomTabBar;
