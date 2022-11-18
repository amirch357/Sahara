import React,{useState,useEffect,useRef} from "react";
import { View,Text,ScrollView,TextInput,ActivityIndicator,TouchableOpacity,RefreshControl} from "react-native";
import style from "../../Styles/DonationFormStyle"
import { RadioButton,Button,Modal,Portal,Checkbox } from "react-native-paper";
import CurrencyPicker from "react-native-currency-picker"
import Icon from "react-native-vector-icons/Ionicons";
import {CardField,presentPaymentSheet,useStripe,useConfirmPayment} from "@stripe/stripe-react-native"
import axios from "axios";
import { Select } from "native-base";
import InputC from "../../Components/Input/Input";
import { PAYMENT_URL } from "../../utils/Link";
import SuccessModel from "../../Components/SuccessModel/SuccessModel";
import { LocalStorageService } from "../../Components/LocalStorage/LocalStorage";
import PhoneInput from "../../Components/PhoneInput/PhoneInput";





const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }


const DonationForm = ({route}) => {
    const stripe=useStripe()
    const [value,setValue]=useState("")
    const [currency,setCurrency]=useState("$")
    const [amount,setAmount]=useState("1")
    const [code,setCode]=useState("USD")
    const [smallValue,setSmallValue]=useState("49")
    const [largeValue,setLargeValue]=useState("99")
    const [loading,setLoading]=useState(true)
    const [subscription,setSubscription]=useState()
    const [show,setShow]=useState(false)
    const [typeValue,setTypeValue]=useState("stripe")
    const [showModel,setShowModel]=useState(false)
    const [checked, setChecked] = React.useState(false);
    const [name,setName]=useState("")
    const [error,setError]=useState(false)
    const [email,setEmail]=useState("")
    const [phone,setPhone]=useState("")
    const [Model,setModel]=useState(false)
    const [submitLoding,setSubmitLoding]=useState(false)
    const [refresh,setRefresh]=useState(false)
    const [showCountry,setShowCountry]=useState(false)
    const [countryCode, setCountryCode] = useState("+1");
    const [emailerror,setEmailError]=useState(false)
    const [phoneError,setPhoneError]=useState(false)
   
    
    


   
    
    const shwoSuccessModal=()=>setModel(true)
    const hideSuccessModal=()=>setModel(false)

    const showModal = () => setShowModel(true);
    const hideModal = () => setShowModel(false);
const {title}=route.params

const CurrencyConvert= async()=>{
   await axios.get(`https://api.exchangerate.host/convert?from=USD&to=${code}`).then((res)=>{
        setAmount(res.data.info.rate)
        var smallValue=res.data.info.rate*49
        setSmallValue(smallValue.toFixed(2))
var largeValue=res.data.info.rate*99
setLargeValue(largeValue.toFixed(2))
setLoading(false)
    })
}




const fetchPaymentData= async ()=>{
    
   const {paymentMethod}= await stripe.createPaymentMethod({
    paymentMethodType:"Card",
    paymentMethodData:{
        billingDetails:{
            name:name,
            email:email
        }

    }
   })
   console.log("result..............",paymentMethod.billingDetails)
    const data= await axios.post(PAYMENT_URL,{name:name,amount:value,email:email,phone:phone,currency:code,paymentMethodId:paymentMethod.id,title:title,countryCode:countryCode}).then((responce)=>{
         console.log("data......",responce.data)
         const data=responce.data
         const clientSecret=responce.data.client_secret
         const customer=responce.data.customer
         const ephemeralKey=responce.data.ephemeralKey
         setSubmitLoding(false)
     return {clientSecret,customer,ephemeralKey,data}      
     })
return{data}
   
}

const initializePayement= async ()=>{
    const {data}= await fetchPaymentData()
    console.log("key........",data.data.UserData)
    const {error}= await stripe.initPaymentSheet({
        customerId:data.customer,
        customerEphemeralKeySecret:data.ephemeralKey,
        paymentIntentClientSecret:data.clientSecret,
        merchantDisplayName:name,
        allowsDelayedPaymentMethods:true,

        
    })
   
    if(error){
        alert(error.message)
        setSubmitLoding(false)
    }else{
        shwoSuccessModal()
        LocalStorageService.setItem("UserData",data.data.UserData)
        LocalStorageService.setItem("donorId",data.data.donor_id)

    }
    stripe.retrievePaymentIntent(data.clientSecret).then((responce)=>{
        console.log("status..............",responce.paymentIntent.status)
    })
}



const onSubmit=()=>{
    if(name.length===0){
        setError(true)
    
        
    }else if(email.length===0){
        setEmailError(true)
    }else if(phone.length===0){
        setPhoneError(true)
    }else{
        setError(false)
        initializePayement()
        setSubmitLoding(true)
        
    }
}
const onDonate=()=>{
    if(value.length===0){
        alert("Please Enter amount")
       
    }else
    if(show==false){
        setShow(true)
        
        
    }else{
       onSubmit()
       
      
       
    }
}
const totalAmount=value*amount


useEffect(()=>{
CurrencyConvert()


},[])
const onRefresh = React.useCallback(() => {
    setRefresh(true);
    wait(2000).then(() => setRefresh(false));
  }, []);

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}>
            
        <View style={style.container}>
        
        
         
       
                            
            {loading?
            <View style={style.spinnerContainer}>
                <ActivityIndicator size="large" color="red" style={style.spinner} />
            </View>
            :
            (
        <><RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                            <View style={style.subContainer}>

                                <View style={style.radioCard}>
                                    <View style={style.priceContainer}>
                                        <Text style={style.priceText} numberOfLines={1}>{currency} {smallValue}</Text>
                                    </View>
                                    <View style={style.contentContainer}>
                                        <Text style={style.contentText}>1 week education</Text>
                                        <Text style={style.contentText}>expenses of 2 children</Text>

                                    </View>
                                </View>
                                <View>
                                    <RadioButton value={`${smallValue}`} />
                                </View>

                            </View>
                            <View style={style.subContainer}>
                                <View style={style.radioCard}>
                                    <View style={style.priceContainer}>
                                        <Text style={style.priceText} numberOfLines={1}>{currency} {largeValue}</Text>
                                    </View>
                                    <View style={style.contentContainer}>
                                        <Text style={style.contentText}>1 week education</Text>
                                        <Text style={style.contentText}>expenses of 4 children</Text>

                                    </View>
                                </View>
                                <View>
                                    <RadioButton value={`${largeValue}`} />
                                </View>

                            </View>
                        </RadioButton.Group><View style={style.headingContainer}>
                                <Text style={style.headingText}>Enter Amount</Text>
                            </View><View style={style.amountContainer}>
                                <View style={style.amountSubContainer}>
                                    
                                    <View style={style.currencyPiker}>
                                        <CurrencyPicker
                                            showFlag={false}
                                            enable={true}
                                            showCurrencyName={false}
                                            showCurrencyCode={false}
                                            darkMode={false}
                                            onSelectCurrency={(data) => { console.log("DATA..........", data.code), setCurrency(data.symbol_native), setCode(data.code); } } />
                                    </View>
                                   
                                    <View style={style.iconContainer}>
                                        <Icon name="caret-down" color="#808080" />
                                    </View>
                                    
                                </View>
                                <View style={style.amountInput}>
                                    <TextInput keyboardType="numeric" style={style.input} value={value} onChangeText={(v) => { setValue(v); } } onPressIn={() => setValue("")} />
                                </View>
                                <View style={style.swapContainer}>
                                    <Icon name="swap-vertical" size={20} />
                                </View>
                            </View>
                            <View style={style.headingContainer}>
                            <Text style={style.headingText}>Subscription</Text>
                            </View>
                           
                            <View style={style.subscription}>
                                <Text style={style.subscriptionText}>Make this donation every</Text>
                                <Select
                                selectedValue={subscription}
                                onValueChange={(item)=>setSubscription(item)}
                                width={130}
                                marginRight={2}
                                placeholder="Select"
                                >
                                    
                                    <Select.Item label="Month" value="Monthely" />
                                    <Select.Item  label="Week" value="Weekly"/>
                                    <Select.Item  label="Quarter" value="Quarter"/>
                                    <Select.Item  label="Year" value="Year"/>
                                </Select>
                                
                                </View>
                                {show==true?
                                <>
                                <ScrollView>
                             <View style={style.headingContainer}>
                             <Text style={style.headingText}>Select Payment Method</Text>
                         </View> 
                         <View>
                            <RadioButton.Group onValueChange={newValue => setTypeValue(newValue)} value={typeValue}>
                                <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
                                    <View style={{flexDirection:"row"}}>
                                        <RadioButton value="stripe"/>
                                        <Text style={{fontSize:18,paddingTop:5,color:"#696969"}}>Strip-Cradit Card</Text>
                                    </View>
                                    <View style={{flexDirection:"row"}}>
                                        <RadioButton value="paypal" />
                                        <Text style={{fontSize:18,paddingTop:5,color:"#696969"}}>Paypal</Text>
                                    </View>
                                </View>
                            </RadioButton.Group>
                            <View style={style.headingContainer}>
                            <Text style={style.headingText}>Personal Info</Text>
                            </View>
                            <View>
                                <InputC label="Name" required value={name} onChangeText={(n)=>{setName(n),setError(false)}} error={error} errorMessage="Please Enter your name"/>
                                <InputC label="Email" required value={email} onChangeText={(e)=>{setEmail(e);setEmailError(false)}} keyboardType="email-address" autoCapitalize="none" error={emailerror} errorMessage="Please Enter your Email" />
                                <PhoneInput  show={showCountry} onPress={()=>setShowCountry(true)} pickerButtonOnPress={(item)=>{setCountryCode(item.dial_code);setShowCountry(false)}} countryCode={countryCode} value={phone} onChangeText={(p)=>{setPhone(p),setPhoneError(false)}} required error={phoneError} errorMessage="enter your phone" />
                                
                            </View>
                            <View style={style.headingContainer}>
                            <Text style={style.headingText}>Reclaim Gift Aid</Text>
                            <Text style={{color:"#696969"}}>Add 25% more to your donation at no cost to you. A Gift Aid declaration allows Sahara For Life Trust to claim tax back on eligible donations. It means that for every £1 you donate to Sahara For Life Trust we can claim back 25p, at no extra cost to you.</Text>
                            <TouchableOpacity onPress={showModal}><Text style={style.link}>Tell me more {">>"}</Text></TouchableOpacity>
                           <Portal>
                           <Modal visible={showModel} onDismiss={hideModal} contentContainerStyle={style.contentContainerStyle} >
                                
                                <Text style={style.modelHeader}>What is Gift Aid ?</Text>
                                <Text style={style.modelbody}>Gift Aid does not cost you a penny more, but can add an additional 25p to every £1 you donate. When Sahara For Life Trust receives a donation from a UK taxpayer, we're entitled to claim an amount of tax (calculated at the basic rate of income tax in that year) paid on that donation. Once you have given your permission for us to do this on your behalf, there is no need for you to do anything else.

All that is required is that you must be a taxpayer and that would have paid or will pay sufficient Income and/or Capital Gains Tax to cover all the Gift Aid claimed on all your donations in that tax year. Please note that it is your responsibility to pay any difference.

The amount of tax we claim will be 25% of the total value of your donations in that tax year. Furthermore, if you are a higher taxpayer, you are also entitled to claim the difference between the basic rate which we will claim and the amount of tax you have actually paid. For further details on how you can do this, please contact your tax office. If your tax situation changes and your gifts will no longer be eligible for the Gift Aid scheme please contact us and we will amend your record accordingly.

</Text>
                                
                                
                            </Modal>
                            <SuccessModel visibale={Model} onDismiss={hideSuccessModal} />
                           </Portal>
                           <View style={style.claimGiftContainer}>
                            <Checkbox 
                            status={checked?"checked":"unchecked"}
                            onPress={()=>setChecked(!checked)}
                            />
                            <Text style={style.claimGiftText}>Yes, I would like to claim Gift Aid</Text>
                           </View>
                           {checked==true?
                           <>
                           <InputC label="Country" required />
                           <InputC label="Address 1" required />
                           <InputC label="Address 2"  />
                           <InputC label="City" required />
                           <InputC label="Postal Code" required />
                           </>
                           :""}
                        </View>
                            {typeValue=="stripe"?
                            <ScrollView>
                            <View style={style.headingContainer}>
                            <Text style={style.headingText}>Credit Card Info</Text>
                            <View>
                                <View style={{flexDirection:"row",alignItems:"center"}}>
                                    <Icon name="lock-closed" style={{paddingTop:4}} size={16} />
                                <Text style={style.secureText}>This is a secure SSL encrypted payment.</Text>
                                </View>
                                <CardField style={style.cardField} cardStyle={{borderWidth:1,borderRadius:6,textColor:"#000000",placeholderColor:"#696969",cursorColor:"#000000",textErrorColor:"#ff0000"}}    />
                            </View>
                        </View>
                       
                        </ScrollView>
                        :""}
                            
                         </View>
                         </ScrollView>
                         </>   
                            :""}
                               
                            
                            <View style={style.buttonContainer}>
                                {submitLoding?<ActivityIndicator size="large" color="red" />:
                                <Button mode="contained" style={style.button} labelStyle={{ fontWeight: "900" }} textColor="#FFFF" onPress={onDonate}>DONATE NOW</Button>
                            }
                                </View>
                           
                            
                            
                            </>
           )}
        </View>
        </ScrollView>
    );
};

export default DonationForm;
