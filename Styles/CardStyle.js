import { StyleSheet } from "react-native";

export default style=StyleSheet.create({
    container:{
        backgroundColor:"#fff",
       
        marginLeft:15,
        marginRight:15,
        borderRadius:5,
        hadowColor: "#000",
        shadowOffset: {
	        width: 2,
	        height: 2,
            },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
marginTop:20,
marginBottom: 10,
    },
    image:{
        width:"100%",
        height:200
    },
    title:{
        fontSize:20,
        fontWeight:"900",
        color:"#666666"
    },
    titleStyle:{
        paddingTop:10,
        paddingLeft:19
    },
    progress:{
        paddingLeft:20,
        paddingRight:20,
        paddingTop:5
    },
    price:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    donation:{
        paddingTop:5,
        fontSize:16,
        fontWeight:"800"
    },
    number:{
        color:"#ff0000",
        paddingBottom:10
    },
    button:{
        marginLeft:80,
        marginRight:80,
        
        
    
    },
    buttonContainer:{
        paddingBottom:10
    },
    buttonText:{
        fontFamily:"PoppinsBold"
    },
    header:{
        fontSize:20,
        fontWeight:"900",
        color:"#000",
        paddingTop:30,
        paddingLeft:15
    },
    filterButton:{
        paddingLeft:5,
        paddingTop:10
    }
    
})