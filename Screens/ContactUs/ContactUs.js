//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Linking,TouchableOpacity,Image } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { Divider } from 'native-base';


// create a component
const ContactUs = () => {
    let aus="0061280144790"
    let usa="0015038376008"
    let pak="042111800111"
    let uk="02030511207"
    return (
        <>
        <View style={styles.container}>
            <View style={styles.logoContainer}>
            <Image source={require("../../assets/images/SFLT_logo.png")}  style={styles.logo}/>
            </View>
            <View style={styles.card}>
                <Text style={{fontSize:25,margin:10,color:"#8b0000",fontWeight:"bold" }}>GET IN TOUCH</Text>
               
               <Divider my={2}/>
            <TouchableOpacity onPress={()=>Linking.openURL(`tel:${usa}`)}>
          <View style={styles.tiles}>
            <View style={{flexDirection:"row"}}>
          <Icon name='phone' size={20} color="#000" style={styles.icon} />
            <Text style={styles.title}>USA Contact</Text>
            </View>
            <View>
            <Text style={styles.phone}>0015038376008</Text> 
            </View>

          </View>
          </TouchableOpacity>

          <Divider my={2}/>

          <TouchableOpacity onPress={()=>Linking.openURL(`tel:${uk}`)}>
          <View style={styles.tiles}>
            <View style={{flexDirection:"row"}}>
          <Icon name='phone' size={20} color="#000" style={styles.icon} />
            <Text style={styles.title}>UK Contact</Text>
            </View>
            <Text style={styles.phone}>02030511207</Text> 

          </View>
          </TouchableOpacity>
          <Divider my={2} />
          <TouchableOpacity onPress={()=>Linking.openURL(`tel:${aus}`)}>
          <View style={styles.tiles}>
            <View style={{flexDirection:"row"}}>
          <Icon name='phone' size={20} color="#000" style={styles.icon} />
            <Text style={styles.title}>AUS Contact</Text>
            </View>
            <Text style={styles.phone}>0061280144790</Text> 

          </View>
          </TouchableOpacity>
          
          <Divider my={2} />
           
       
        <TouchableOpacity onPress={()=>Linking.openURL(`tel:${pak}`)}>
          <View style={styles.tiles}>
            <View style={{flexDirection:"row"}}>
          <Icon name='phone' size={20} color="#000" style={styles.icon} />
            <Text style={styles.title}>PAK Contact</Text>
            </View>
            <Text style={styles.phone}>042111800111</Text> 

          </View>
          </TouchableOpacity>
          <Divider my={2}  />
          
          
          <TouchableOpacity onPress={()=>Linking.openURL('mailto:info@saharaforlife.org')}>
          <View style={styles.tiles}>
            <View style={{flexDirection:"row"}}>
          <Icon name='gmail' size={20} color="#000" style={styles.icon} />
          <Text style={styles.title}>Email</Text>
            </View>
             <Text style={styles.phone}>info@saharaforlife.org</Text>

          </View>
          </TouchableOpacity>  
            <Divider my={2}  />
          <View>
          <View style={styles.iconContainer}>
        <View style={{flexDirection:"row"}}>
        <TouchableOpacity onPress={()=>Linking.openURL("https://twitter.com/saharaforlife?lang=en")}>
         <Icon name='twitter'size={40} color="#3f729b" style={styles.icons}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>Linking.openURL("https://www.facebook.com/saharavolunteerforce/")}>
          <Icon name="facebook" size={40} color="#4169e1" style={styles.icons} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>Linking.openURL("https://www.youtube.com/user/saharaforlifeorg")}>
         <Icon name='youtube'size={40} color="red" style={styles.icons}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>Linking.openURL("https://www.instagram.com/saharaforlifetrustofficial/?hl=en")}>
         <Icon name='instagram'size={40} color="#3f729b" style={styles.icons}/>
          </TouchableOpacity>
        </View>
      </View>
          </View>
          </View>
          </View>
        </>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"center",
        alignItems:"center"
            
    },
    tiles:{
       marginLeft:10,
       marginTop:5
        
        
    },
    title:{
        color:"#000000",
        fontSize:16,
        marginLeft:10,
        fontWeight:"bold"
    },
    image:{
        height:30,
        width:30,
        color:"#FFF"
    },
    icon:{
        marginLeft:10
    },
    phone:{
        color:"#000",
        marginTop:5,
        marginLeft:40
    },
    iconContainer:{
        paddingBottom:10,
        margin:10,
        alignItems:"center",
        marginBottom:10
      },
      icons:{
        margin:10
      },
      card:{
       
        width:330,
        backgroundColor:"#FFF",
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.22,
shadowRadius: 2.22,

elevation: 3,
      },
      logo:{
        height:90,
        width:60
      },
      logoContainer:{
        backgroundColor:"#FFF",
        height:120,
        width:120,
        borderRadius:70,
        justifyContent:"center",
        alignItems:"center",
        marginBottom:20,
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.22,
shadowRadius: 2.22,

elevation: 3,
        
      }
});

//make this component available to the app
export default ContactUs;
