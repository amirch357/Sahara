//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { Input } from 'native-base';
import { CountryPicker } from 'react-native-country-codes-picker';

// create a component
const PhoneInput = ({value,onChangeText,pickerButtonOnPress,onPress,countryCode,show,required,error,errorMessage}) => {

   
    return (
        <View style={{flex:1}}>
            <View style={{flexDirection:"row"}}>
            <Text style={{marginLeft:10,color:"#696969"}}>Phone</Text>
            {required ?  <Text style={{color:"red"}} >*</Text>:""}
           
            </View>
           <View style={{flexDirection:"row"}}>
            <View>
            
         <TouchableOpacity onPress={onPress} style={styles.CountryPicker}>
        <CountryPicker show={show}  pickerButtonOnPress={pickerButtonOnPress} style={{textInput:{color:"#000000"},countryName:{color:"#000000"},dialCode:{color:"#000000"}}} />
        <Text style={{
            color: '#000000',
            fontSize: 12
        }}>
            {countryCode}
        </Text>
        </TouchableOpacity>
        </View>
        <View>
        <Input value={value} onChangeText={onChangeText} w="270" keyboardType="phone-pad"  />
        {error?
        <Text style={{color:"red"}}>{errorMessage}</Text>
    :""}
        </View>
        </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    
    CountryPicker:{
        height:45,
        width:70,
        backgroundColor:"#EEEEEE",
       justifyContent:"center",
       alignItems:"center",
        borderColor:"#d3d3d3",
        borderWidth:1,
        borderRadius:5,
        marginLeft:10
    },
   
});

//make this component available to the app
export default PhoneInput;
