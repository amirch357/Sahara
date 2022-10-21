import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./routes/routes";
import { NativeBaseProvider } from "native-base";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Provider } from "react-native-paper";
import 'react-native-gesture-handler';
import { LogBox } from "react-native";

LogBox.ignoreLogs(["new NativeEventEmitter"])
const App = () => {
  return (
    <>
   <Provider>
    <NativeBaseProvider>
    <NavigationContainer>
    <StripeProvider>
      <Routes />
      </StripeProvider>
    </NavigationContainer>
    </NativeBaseProvider>
    </Provider>
    </>
  );
};

export default App;
