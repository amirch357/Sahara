import AsyncStorage from '@react-native-async-storage/async-storage';

export class LocalStorageService {
  static async getItem(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
      
           
        
      } catch (error) {
        console.log(error);
      }
  }

  static async setItem(key, value) {
    try{
      
      const jsonValue = JSON.stringify(value)
     await AsyncStorage.setItem(key, jsonValue);
    } catch (e){
      console.log(e)
    }
    
  } 
  static async mergeItem(key, value) {
    try{
      
      const jsonValue = JSON.stringify(value)
     await AsyncStorage.mergeItem(key, jsonValue);
    } catch (e){
      console.log(e)
    }
    
  } 
  static async deleteItem(){
    await AsyncStorage.clear()
  }
}
