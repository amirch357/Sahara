import React,{useState,useEffect} from "react";
import { View,TouchableOpacity,Text,Image,StyleSheet } from "react-native";
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
import CustomSidebarMenu from "../Components/CustomSidebarMenu/CustomSidebarMenu";
import TermsConditions from "../Screens/TermsConditions/TermsConditions";
import ChairmanMessage from "../Screens/ChairmanMessage/ChairmanMessage";
import CustomTabBar from "../Components/CustomTabBar/CustomTabBar";
import Profile from "../Screens/Profile/Profile";
import ContactUs from "../Screens/ContactUs/ContactUs";
import Avatar from "../Components/Avatar/Avatar";
import { DONORS_URL,AVATAR_URL } from "../utils/Link";
import { LocalStorageService } from "../Components/LocalStorage/LocalStorage";
import axios from "axios";
const Stack= createNativeStackNavigator()
const Tab=createBottomTabNavigator()
const Drawer=createDrawerNavigator()


const Routes = ({navigation}) => {
  
  const [image,setImage]=useState([])
  const [donorId,setDonorId]=useState()
  const [Localavatar,setLocalAvatar]=useState()
  const [avatar,setAvatar]=useState()


LocalStorageService.getItem("donorId").then((id)=>{
  console.log("myid,,,,,,,,,,",id)
  setDonorId(id)
})

const getImage= async ()=>{
  const responce= await axios.post(DONORS_URL,{id:donorId})

  setImage(responce.data.data)
}


useEffect(()=>{
getImage()
image.map((res)=>setAvatar(res.IMAGE))
LocalStorageService.getItem("avatar").then((res)=>{
  setLocalAvatar(res)
  console.log(res)
  
})
},[])






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
              case "Contact Us":
                iconName=focused?"megaphone":"megaphone-outline"
         
        }
        return <Icon name={iconName}  size={20} color={color} show={show} text={text}  />;
      };

      const RenderTabNavigation = ({navigation}) => {
        return (
          <Tab.Navigator
         
            screenOptions={({ route,navigation }) => ({
              headerShown: true,
              headerRight:()=>  <Avatar  source={image.length===0?{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKrlJY_2yfGGrAUlC3nYItskIdVdy4Z-PcyOL5-3U&s"}: Localavatar!==null? {uri:Localavatar}:{uri:`${AVATAR_URL}/${avatar}`}} onPress={()=>navigation.navigate("Profile")}  />,
              headerLeft:()=><TouchableOpacity onPress={()=>navigation.toggleDrawer()}>
                <View style={style.mainContainer}>
                <View style={style.imageContainer}>
                <Image source={require("../assets/images/SFLT_logo.png")} style={style.image} />
                </View>
                </View>
                </TouchableOpacity> ,
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
    <Drawer.Screen name="Privacy Policy" component={PrivacyPoliciy} options={({navigation})=>({headerShown:true, headerTitleAlign:"center",headerLeft:()=>
  <TouchableOpacity onPress={()=>navigation.toggleDrawer()}>
  <View style={style.mainContainer}>
  <View style={style.imageContainer}>
  <Image source={require("../assets/images/SFLT_logo.png")} style={style.image} />
  </View>
  </View>
  </TouchableOpacity>
  })} />
    <Drawer.Screen name="Terms & Conditions" component={TermsConditions} options={({navigation})=>({headerShown:true, headerTitleAlign:"center",headerLeft:()=>
  <TouchableOpacity onPress={()=>navigation.toggleDrawer()}>
  <View style={style.mainContainer}>
  <View style={style.imageContainer}>
  <Image source={require("../assets/images/SFLT_logo.png")} style={style.image} />
  </View>
  </View>
  </TouchableOpacity>
  })} /> 
    <Drawer.Screen name="Chairman Message" component={ChairmanMessage} options={({navigation})=>({headerShown:true, headerTitleAlign:"center",headerLeft:()=>
  <TouchableOpacity onPress={()=>navigation.toggleDrawer()}>
  <View style={style.mainContainer}>
  <View style={style.imageContainer}>
  <Image source={require("../assets/images/SFLT_logo.png")} style={style.image} />
  </View>
  </View>
  </TouchableOpacity>
  })} />
  <Drawer.Screen name="Contact Us" component={ContactUs} options={({navigation})=>({headerShown:true, headerTitleAlign:"center",headerLeft:()=>
  <TouchableOpacity onPress={()=>navigation.toggleDrawer()}>
  <View style={style.mainContainer}>
  <View style={style.imageContainer}>
  <Image source={require("../assets/images/SFLT_logo.png")} style={style.image} />
  </View>
  </View>
  </TouchableOpacity>
  })} />
  </Drawer.Navigator>
        )
      }
  

    return (
       <Stack.Navigator screenOptions={{headerShown:false ,headerTitleAlign:"center" }} initialRouteName="Splash">
       <Stack.Screen name="HOME" component={ RenderDrawerNavigator}  />
        <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown:false}} />
        <Stack.Screen name="Detail" component={DetailScreen} options={({route})=>({title:route.params.title,headerShown:true}) } />
        <Stack.Screen name="Donate" component={DonationForm} options={{headerShown:true}} />
        <Stack.Screen name="Profile" component={Profile} options={{headerShown:true}} />
       </Stack.Navigator>
    );
};
const style=StyleSheet.create({
  imageContainer:{
    height:42,
    width:42,
    margin:10,
    backgroundColor:"#FFF",
    borderRadius:80,
    justifyContent:"center",
    alignItems:"center"
  },
  image:{
    height:"80%",
    width:"70%"
  },
  mainContainer:{
    height:44,
    width:44,
    backgroundColor:"#ccc",
    margin:10,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:80
  }
})
export default Routes;
