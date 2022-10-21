//import liraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';


// create a component
const Input = ({label,required,error,errorMessage,value,onChangeText}) => {
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <View style={styles.titleContainer}>
                <Text>{label}</Text>
                {required?
                <Text style={styles.required}>*</Text>
:""}
                </View>
           
                <TextInput mode="outlined" error={error} value={value} onChangeText={onChangeText}/>
            {error?
            <>
             
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            </>
            :""}
            
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    },
    inputContainer:{
        margin:10
    },
    titleContainer:{
        flexDirection:"row"
    },
    required:{
        color:"red"
    },
    errorMessage:{
        color:"red"
    }
});

//make this component available to the app
export default Input;
