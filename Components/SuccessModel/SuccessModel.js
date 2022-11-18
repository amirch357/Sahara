//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import { Modal,Portal } from 'react-native-paper';

// create a component
const SuccessModel = ({visibale,onDismiss}) => {
    return (
        <View style={styles.container}>
           <Portal>
            <Modal visible={visibale} contentContainerStyle={styles.model} onDismiss={onDismiss}>
             
                <Image source={require("../../assets/images/success-icon.gif")} style={styles.image} />
                <Text style={styles.titleText}>THANK YOU</Text>
                
            
            </Modal>
           </Portal>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex:1,
      height:500
        },
    image:{
        height:100,
        width:100,
      
    },
    model:{
        width:"95%",
        height:300,
        alignItems:"center",
        borderRadius:20,
        backgroundColor:"#FFF",
        marginLeft:10,
       
    },
    titleText:{
        fontSize:25,
        fontFamily:"RobotoBoldItalic",
        marginTop:30,
        color:"#000000"
    }
   
});

//make this component available to the app
export default SuccessModel;
