//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity } from 'react-native';

// create a component
const Avatar = ({source,onPress}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
            <Image source={source} style={styles.image} />
            
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
       borderRadius:80,
       height:40,
       width:40,
       backgroundColor:"#ccc",
       justifyContent:"center",
       
       marginRight:10
    },
    image:{
        
        height:40,
        borderRadius:80
        
      
      
    }
});

//make this component available to the app
export default Avatar;
