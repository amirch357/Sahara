// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/
 
import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
 
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
 
const CustomSidebarMenu = (props) => {
  
 
  return (
    <SafeAreaView style={{flex: 1}}>
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
      <Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          color: 'grey'
        }}>
        www.saharaforlife.org
      </Text>
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
   
   
   

  }
});
 
export default CustomSidebarMenu;
