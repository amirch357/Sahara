//import liraries
import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity,ScrollView,BackHandler,Modal } from 'react-native';
import  {launchCamera,launchImageLibrary} from 'react-native-image-picker';
import Input from '../../Components/Input/Input';
import { Button } from 'react-native-paper';
import { LocalStorageService } from '../../Components/LocalStorage/LocalStorage';
import { DONORS_UPDATE_URL } from '../../utils/Link';
import axios from 'axios';
import  Icon  from 'react-native-vector-icons/Ionicons';
import PhoneInput from '../../Components/PhoneInput/PhoneInput';


const createFormData = ( image,body = {}) => {
    const data = new FormData();
  
    data.append('image', {
      name: image.fileName,
      type: image.type,
      uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
    });
  
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
  
    return data;
  };



// create a component
const Profile = (props) => {

const [name,setName]=useState("")
const [phone,setPhone]=useState("")
const [email,setEmail]=useState("")
const [address,setAddress]=useState("")
const [donor_id,setDonor_id]=useState("")
const [image,setImage]=useState()
const [modalVisible,setModalVisible] = useState(false)
const [avatar,setAvatar]=useState("")
const [showCountry,setShowCountry]=useState(false)
    const [countryCode, setCountryCode] = useState("+1");


    const [imageUrl,setImageUrl]=useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKrlJY_2yfGGrAUlC3nYItskIdVdy4Z-PcyOL5-3U&s")

    
        const backActionProfile = () => {
            props.navigation.goBack()
            return true
          }
const UpdateData= async ()=>{
    fetch(DONORS_UPDATE_URL, {
        method: 'PUT',
        body: createFormData(image,{ name:name,email:email,phone:phone,id:donor_id }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log('response', response);
          LocalStorageService.setItem("avatar",imageUrl)
        })
        .catch((error) => {
          console.log('error', error);
        });
}
          
useEffect(()=>{

 

 
LocalStorageService.getItem("UserData").then((res)=>{
    console.log("Local Data........",res)
    setName(res?.name)
    setPhone(res?.phone)
    setEmail(res?.email)
})
LocalStorageService.getItem("donorId").then((res)=>{
    console.log("my id.......",res)
setDonor_id(res )
})
    BackHandler.addEventListener("hardwareBackPress",backActionProfile);
    
      return () => BackHandler.removeEventListener("hardwareBackPress", backActionProfile);
     
},[])

LocalStorageService.getItem("avatar").then((res)=>{
    setAvatar(res)
})
const openCamera =()=>{
    launchCamera({ noData: true }, (response) => {
     console.log(response)
        if (response) {
            response?.assets?.map((res)=>(setImageUrl(res.uri),setImage(res)))
            setModalVisible(false)
         
          
        }
      });
}
const openGellary=()=>{
    launchImageLibrary({noData:true},(response)=>{
        console.log(response)
        if (response) {
            response?.assets?.map((res)=>(setImageUrl(res.uri),setImage(res)))
            setModalVisible(false)
         
          
        }
    })
}
    return (
        <ScrollView>
        <View style={styles.container}>
      
            <View style={styles.avatarContainer} >
            <Text style={styles.id}> Donor_ID : {donor_id}</Text>
            <TouchableOpacity onPress={()=>setModalVisible(true)}>
                <Image source={avatar?{uri:avatar}:{uri:imageUrl}} style={styles.image} />
                </TouchableOpacity>
            </View>
            
            <Input label="Name"  defaultValue={name} onChangeText={(n)=>setName(n)} />
            <PhoneInput  show={showCountry} onPress={()=>setShowCountry(true)} pickerButtonOnPress={(item)=>{setCountryCode(item.dial_code);setShowCountry(false)}} countryCode={countryCode} value={phone} onChangeText={(p)=>setPhone(p)} />
            <Input label="Email"  defaultValue={email} onChangeText={(e)=>setEmail(e)} />
            <Input label="Address" defaultValue={address} onChangeText={(a)=>setAddress(a)} />
            <View style={styles.button}>
            <Button mode="contained" buttonColor="#8b0000" textColor='#FFFF' onPress={UpdateData}>Save</Button>
            </View>
            
        </View>
        <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
   setModalVisible(false)
  }}
  onDismiss={()=>setModalVisible(false)}
  >
  <View
    style={{
      marginTop: 'auto',
      backgroundColor:'white'
    }}>
    <View style={styles.modalView}>
        <View>
            <TouchableOpacity onPress={openCamera}>
      <Icon name='camera' size={56} />
      <Text style={{fontWeight:"900",paddingLeft:5}}>Camera</Text>
      </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={openGellary}>
        <Icon name="images" size={56} />
        <Text style={{fontWeight:"900",paddingLeft:5}}>Gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
   
  </View>
</Modal>
        </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
      
    },
    avatarContainer:{
        backgroundColor:"#8b0000",
        height:150,
       justifyContent:"space-between",
        margin:10,
        marginTop:40,
        borderRadius:10,
        alignItems:"center" ,
        flexDirection:"row"   
    },
    image:{
        height:100,
        width:100,
        borderRadius:80,
        marginRight:150
    },
    button:{
        margin:10
    },
    id:{
        fontSize:14,
        fontWeight:"900",
        paddingLeft:10,
        paddingBottom:120,
        color:"#FFF"

    },
    modalView: {
        justifyContent:"space-evenly",
        flexDirection:"row",
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius:20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      
});

//make this component available to the app
export default Profile;
