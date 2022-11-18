import React,{useEffect} from "react";
import { View,Text,Image,StyleSheet,ScrollView,BackHandler } from "react-native";

const ChairmanMessage = (props) => {
    const backActionChairman = () => {
        props.navigation.goBack()
        return true
      }
useEffect(()=>{
    
    
        BackHandler.addEventListener("hardwareBackPress",backActionChairman);
    
      return () => BackHandler.removeEventListener("hardwareBackPress", backActionChairman);
},[])

    return (
        <ScrollView>
        <View style={style.container}>
        <View style={{alignItems:"center"}}>
        <View>
            <Text style={style.name}>ABRAR-UL-HAQ</Text>
            <Text style={style.chairText}>CHAIRMAN</Text>
        </View>
        <View style={style.frame}>
        <Image source={require("../../assets/images/pic-chairman.jpg")} style={style.image} />
        </View>
        </View>
       
        <View style={style.contentContainer}>
            <Text style={style.content}>I’ve always respected those who try to change the world for the better rather than just complain about it. It is, indeed, a matter of great satisfaction to me that my altruistic reverie, Sughra Shafi Medical Complex, Narowal has continued to provide treatment services of most of the diseases with high standards and with the help of the latest equipment, modern medical, surgical techniques and above all, the dedication and expertise of the staff to poor and underserved people of Narowal who cannot afford to pay for these facilities. Over the years, SAHARA for Life Trust has been fortunate in receiving generous donations from a large number of people. This is most reassuring because it indicates the trust of donors in the quality of service and care provided by the Hospital. Nonetheless, it is in the area of operational expenses that the SSMC faces some problems because of a shortage of resources. Since treatment is provided
the staff to poor and underserved people of Narowal who cannot afford to pay for these facilities. Over the years, SAHARA for Life Trust has been fortunate in receiving generous donations from a large number of people. This is most reassuring because it indicates the trust of donors in the quality of service and care provided by the Hospital. Nonetheless, it is in the area of operational expenses that the SSMC faces some problems because of a shortage of resources. Since treatment is provided virtually free of charge or in very subsidized rates, it means that any addition to the number of wards /beds and patients, perforce, entails an increase in the requirement of funds for running the Hospital satisfactorily. It is my fervent hope that people, particularly the more affluent, will come forward and share the burden of the SSMC, enabling it to continue the provision of humanitarian services to society. I, therefore, appeal to the donors to kindly contribute towards the setting up and strengthening of the advance medical facilities & services of SSMC. I remain indebted and assured of your trust and unflinching support with which SAHARA will continue to serve the people of unreached areas of Pakistan, giving a ray of light to those who have otherwise lost all hope.
</Text>
</View>
        </View>
        </ScrollView>
    );
};

const style=StyleSheet.create({
    container:{
       
        flex:1
    },
    
    image:{
        height:160,
        width:140,
       
    },
    name:{
        fontSize:18,
        color:"#000",
        fontWeight:"900",
        paddingTop:10
    },
    chairText:{
        fontSize:16,
        paddingLeft:19
    },
    frame:{
        height:164,
        width:145,
        backgroundColor:"#FFF",
        justifyContent:"center",
        alignItems:"center",
        marginTop:10,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
            },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },
    content:{
       fontSize:15,
       color:"black",
       textAlign:"justify"
       
    },
    contentContainer:{
        marginLeft:24,
        marginTop:15,
        marginRight:20
        
    }
})

export default ChairmanMessage;
