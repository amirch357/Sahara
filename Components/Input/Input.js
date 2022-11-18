//import liraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input } from 'native-base';


// create a component
const InputC = ({label,required,error,errorMessage,value,onChangeText,defaultValue,keyboardType,autoCapitalize}) => {
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <View style={styles.titleContainer}>
                <Text style={{color:"#696969"}}>{label}</Text>
                {required?
                <Text style={styles.required}>*</Text>
:""}
                </View>
           
                <Input mode="outlined" error={error} value={value} onChangeText={onChangeText} defaultValue={defaultValue} keyboardType={keyboardType} autoCapitalize={autoCapitalize} />
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
export default InputC;
