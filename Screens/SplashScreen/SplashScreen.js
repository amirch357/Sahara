import React,{useEffect} from "react";
import { View,Animated } from "react-native";
import style from "../../Styles/SplashStyle"
const SplashScreen = ({navigation}) => {

const width=new Animated.Value(100)
const height = new Animated.Value(200);


useEffect(()=>{
    Animated.timing(
        width, // The animated value to drive
        {
          toValue: 180, // Animate to opacity: 1 (opaque)
          duration: 100, // Make it take a while
          useNativeDriver: false,
        },
      ).start(); // Starts the animation
      Animated.timing(
        height, // The animated value to drive
        {
          toValue: 250, // Animate to opacity: 1 (opaque)
          duration: 10000, // Make it take a while
          useNativeDriver: false,
        },
      ).start(); // Starts the animation
},[])

    setTimeout(()=>{
        navigation.navigate("HOME")
    },3000)
    return (
        <View style={style.container}>
           <Animated.Image source={require("../../assets/images/SFLT_logo.png")} style={{width:width,height:height}} />
           
            
        </View>
    );
};

export default SplashScreen;
