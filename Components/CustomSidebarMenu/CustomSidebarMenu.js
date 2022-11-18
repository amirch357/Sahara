// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/
 
import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView
} from 'react-native';
 
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
 import Icon from "react-native-vector-icons/Ionicons"
import { Button } from 'react-native-paper';
const CustomSidebarMenu = (props) => {
  let aus="0061280144790"
  let usa="0015038376008"
  let pak="042111800111"
  let uk="02030511207"
 
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
       
      {/*Top Large Image */}
      <View style={{justifyContent:"center",alignItems:"center"}}>
      <View style={styles.container}>
      <View style={styles.imageContainer}>
      <Image
        source={require("../../assets/images/SFLT_logo.png")}
        style={styles.sideMenuProfileIcon}
      />
      </View>
      </View>
      </View>
      <DrawerContentScrollView {...props}>
      
        <DrawerItemList {...props} />
       
        <DrawerItem
          label=""
         
        />
        
      </DrawerContentScrollView>
      
     
      {/* <TouchableOpacity onPress={()=>Linking.openURL("https://saharaforlife.org/")}>
      <Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          color: 'blue',
          
        }}>
        www.saharaforlife.org
      </Text>
      </TouchableOpacity> */}
      
      </ScrollView>
    </SafeAreaView>
  );
};
 
const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 60,
    height: 95,
    alignSelf: 'center',
    marginTop:10
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container:{
    height:90,
    width:90,
    backgroundColor:"#a9a9a9",
    shadowColor: "#000",
    shadowOffset: {
        width: 2,
        height: 2,
        },
    shadowOpacity: 0.25,
    shadowRadius: 20.84,
    elevation: 2,
    borderRadius:70,
    justifyContent:"center",
    alignItems:"center",
    marginTop:25,
    marginBottom:10

  },
  imageContainer:{
    backgroundColor:"#FFF",
    height:85,
    width:85,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:70,
    paddingBottom:5
   
   
   

  },
  icon:{
    height:50,
    width:50,
    margin:10
  },
  iconContainer:{
    paddingBottom:10,
    margin:10,
    alignItems:"center"
  },
  button:{
  height:40,
  alignItems:"center",
  justifyContent:"center",
  margin:5
  }
});

 
export default CustomSidebarMenu;
