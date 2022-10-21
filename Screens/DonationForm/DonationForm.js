import React,{useState,useEffect} from "react";
import { View,Text,ScrollView,TextInput,ActivityIndicator,TouchableOpacity } from "react-native";
import style from "../../Styles/DonationFormStyle"
import { RadioButton,Button,Modal,Portal,Checkbox } from "react-native-paper";
import CurrencyPicker from "react-native-currency-picker"
import Icon from "react-native-vector-icons/Ionicons";
import {CardField} from "@stripe/stripe-react-native"
import axios from "axios";
import { Select } from "native-base";
import Input from "../../Components/Input/Input";


const DonationForm = () => {
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
    const [fName,setFname]=useState("")
    const [error,setError]=useState(false)

    const showModal = () => setShowModel(true);
    const hideModal = () => setShowModel(false);


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
const onSubmit=()=>{
    if(fName.length===0){
        setError(true)
    }else{
        setError(false)
        console.log("my Total amount=",fName)
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

})


    return (
        <ScrollView>
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
                                        <Text style={{fontSize:18,paddingTop:5}}>Strip-Cradit Card</Text>
                                    </View>
                                    <View style={{flexDirection:"row"}}>
                                        <RadioButton value="paypal" />
                                        <Text style={{fontSize:18,paddingTop:5}}>Paypal</Text>
                                    </View>
                                </View>
                            </RadioButton.Group>
                            <View style={style.headingContainer}>
                            <Text style={style.headingText}>Personal Info</Text>
                            </View>
                            <View>
                                <Input label="First Name" required value={fName} onChangeText={(n)=>{setFname(n),setError(false)}} error={error} errorMessage="Please Enter your name"/>
                                <Input label="Last Name" required/>
                                <Input label="Email" required/>
                                
                            </View>
                            <View style={style.headingContainer}>
                            <Text style={style.headingText}>Reclaim Gift Aid</Text>
                            <Text>Add 25% more to your donation at no cost to you. A Gift Aid declaration allows Sahara For Life Trust to claim tax back on eligible donations. It means that for every £1 you donate to Sahara For Life Trust we can claim back 25p, at no extra cost to you.</Text>
                            <TouchableOpacity onPress={showModal}><Text style={style.link}>Tell me more {">>"}</Text></TouchableOpacity>
                           <Portal>
                           <Modal visible={showModel} onDismiss={hideModal} contentContainerStyle={style.contentContainerStyle} >
                                
                                <Text style={style.modelHeader}>What is Gift Aid ?</Text>
                                <Text style={style.modelbody}>Gift Aid does not cost you a penny more, but can add an additional 25p to every £1 you donate. When Sahara For Life Trust receives a donation from a UK taxpayer, we're entitled to claim an amount of tax (calculated at the basic rate of income tax in that year) paid on that donation. Once you have given your permission for us to do this on your behalf, there is no need for you to do anything else.

All that is required is that you must be a taxpayer and that would have paid or will pay sufficient Income and/or Capital Gains Tax to cover all the Gift Aid claimed on all your donations in that tax year. Please note that it is your responsibility to pay any difference.

The amount of tax we claim will be 25% of the total value of your donations in that tax year. Furthermore, if you are a higher taxpayer, you are also entitled to claim the difference between the basic rate which we will claim and the amount of tax you have actually paid. For further details on how you can do this, please contact your tax office. If your tax situation changes and your gifts will no longer be eligible for the Gift Aid scheme please contact us and we will amend your record accordingly.

</Text>
                                
                                
                            </Modal>
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
                           <Input label="Country" required />
                           <Input label="Address 1" required />
                           <Input label="Address 2"  />
                           <Input label="City" required />
                           <Input label="Postal Code" required />
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
                                <CardField style={style.cardField} cardStyle={{borderColor:"#696969",borderWidth:1,borderRadius:6}}  />
                            </View>
                        </View>
                       
                        </ScrollView>
                        :""}
                            
                         </View>
                         </ScrollView>
                         </>   
                            :""}
                               
                            
                            <View style={style.buttonContainer}>
                                <Button mode="contained" style={style.button} labelStyle={{ fontWeight: "900" }} onPress={onDonate}>DONATE NOW</Button>
                            </View>
                           
                            
                            
                            </>
           )}
        </View>
        </ScrollView>
    );
};

export default DonationForm;
