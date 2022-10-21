import React from "react";
import { View,TouchableOpacity,Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../Screens/SplashScreen/SplashScreen";
import CampaignScreen from "../Screens/CampaignScreen/CampaignScreen";
import DetailScreen from "../Screens/DetailScreen/DetailScreen";
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/Home/HomeScreen";
import  Icon  from "react-native-vector-icons/Ionicons";
import MediaScreen from "../Screens/MediaScreen/MediaScreen";
import { createDrawerNavigator} from "@react-navigation/drawer";
import PrivacyPoliciy from "../Screens/PrivacyPolicy/PrivacyPoliciy";
import DonationForm from "../Screens/DonationForm/DonationForm";
import { Button,Avatar } from "react-native-paper";
import CustomSidebarMenu from "../Components/CustomSidebarMenu/CustomSidebarMenu";
import TermsConditions from "../Screens/TermsConditions/TermsConditions";
import ChairmanMessage from "../Screens/ChairmanMessage/ChairmanMessage";
import CustomTabBar from "../Components/CustomTabBar/CustomTabBar";
const Stack= createNativeStackNavigator()
const Tab=createBottomTabNavigator()
const Drawer=createDrawerNavigator()


const Routes = ({navigation}) => {
  
const menuButton=({navigation})=>{
  return navigation.toggleDrawer()
}



    const RenderTabIcon = (
        route,
        focused,
        color,
        size,
        show,
        text
      ) => {
        let iconName="home"
        switch (route.name) {
          case "HOME":
            
            iconName = focused ? "home" : "home-outline";
            break;
          case "APPEAL":
            iconName = focused ? "heart" : "heart-outline";
            break;
            case "MEDIA":
              iconName=focused?"images":"images-outline"
              break;
              

         
        }
        return <Icon name={iconName}  size={25} color={color} show={show} text={text}  />;
      };
      const RenderDrawerIcon = (
        route,
        focused,
        color,
        size,
        show,
        text
      ) => {
        let iconName="Home"
        switch (route.name) {
          case "Home":
            
            iconName = focused ? "home" : "home-outline";
            break;
          case "Privacy Policy":
            iconName = focused ? "lock-closed" : "lock-closed-outline";
            break;
            case "Terms & Conditions":
              iconName=focused?"clipboard":"clipboard-outline";
              break;
            case "Chairman Message":
              iconName=focused?"person":"person-outline"
              break;
         
        }
        return <Icon name={iconName}  size={20} color={color} show={show} text={text}  />;
      };

      const RenderTabNavigation = ({navigation}) => {
        return (
          <Tab.Navigator
         
            screenOptions={({ route,navigation }) => ({
              headerShown: true,
              headerRight:()=> <Avatar.Image size={30} style={{marginRight:10}} source={{uri:"https://jmcp.edu.pk/wp-content/uploads/2020/10/blank-profile-picture-973460_1280-300x300-1.jpg"}} />,
              headerLeft:()=><TouchableOpacity onPress={()=>navigation.toggleDrawer()}><Icon name="menu" size={25} color="#000" style={{marginLeft:10}} /></TouchableOpacity> ,
              headerTitleAlign:"center",
              tabBarStyle:{
                backgroundColor:"#000341",
                height:60,
                borderTopLeftRadius:40,
                borderTopRightRadius:40
              
              },
            //   tabBarIcon: ({ focused, color, size,show,text }) =>({
                
            //   tabBarActiveTintColor: "#ffb636",
            //   tabBarInactiveTintColor: "#ffb636",
            //   tabBarLabelStyle:  {color:"#FFF", fontWeight:"800",paddingBottom:5},
            
              
               
             
            // }) 
            })
            }
            tabBar={(props)=><CustomTabBar {...props} />}
          >
            <Tab.Screen name="HOME" component={HomeScreen} options={{tabBarIcon:({color,focused})=><Icon name={focused?"home":"home-outline"} size={23} color="#ffb636"  />,tabBarInactiveTintColor:"#ffb636",tabBarActiveTintColor:"#ffb636",tabBarLabelStyle:{color:"#FFF",fontWeight:"900",paddingBottom:4}}} />
            <Tab.Screen name="MEDIA" component={MediaScreen} options={{tabBarIcon:({color,focused})=><Icon name={focused?"images":"images-outline"} size={23} color="#ffb636"  />,tabBarInactiveTintColor:"#ffb636",tabBarActiveTintColor:"#ffb636",tabBarLabelStyle:{color:"#FFF",fontWeight:"900",paddingBottom:4}}}  />
            <Tab.Screen name="APPEAL" component={CampaignScreen} options={{headerShown:true,tabBarIcon:({color,focused})=><Icon name={focused?"heart":"heart-outline"} size={23} color="#ffb636"  />,tabBarInactiveTintColor:"#ffb636",tabBarActiveTintColor:"#ffb636",tabBarLabelStyle:{color:"#FFF",fontWeight:"900",paddingBottom:4}}} />
           
            
            
           
           
          </Tab.Navigator>
        );
      };
      const RenderDrawerNavigator=()=>{
        return(
          <Drawer.Navigator screenOptions={({route})=>({headerShown:false, 
          drawerIcon:({focused,color,size})=>
          RenderDrawerIcon(route,focused,color,size),
          drawerItemStyle:{borderBottomColor:"#000",borderBottomWidth:1,height:45,justifyContent:"center",marginBottom:-5},
          drawerLabelStyle:{fontSize:12,fontWeight:"700"},
          
          
          
         
          })} drawerContent={(props)=><CustomSidebarMenu {...props} /> }>
         
    <Drawer.Screen name="Home" component={RenderTabNavigation} />
    <Drawer.Screen name="Privacy Policy" component={PrivacyPoliciy} options={{headerShown:true, headerTitleAlign:"center"}} />
    <Drawer.Screen name="Terms & Conditions" component={TermsConditions} options={{headerShown:true, headerTitleAlign:"center"}} />
    <Drawer.Screen name="Chairman Message" component={ChairmanMessage} options={{headerShown:true, headerTitleAlign:"center"}} />
  </Drawer.Navigator>
        )
      }
  

    return (
       <Stack.Navigator screenOptions={{headerShown:false ,headerTitleAlign:"center" }} initialRouteName="Splash">
       <Stack.Screen name="HOME" component={ RenderDrawerNavigator}  />
        <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown:false}} />
        <Stack.Screen name="Detail" component={DetailScreen} options={({route})=>({title:route.params.title,headerShown:true}) } />
        <Stack.Screen name="Donate" component={DonationForm} options={{headerShown:true}} />
       </Stack.Navigator>
    );
};

export default Routes;
