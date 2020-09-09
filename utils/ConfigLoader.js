import {Parse,Config} from 'parse/react-native';
import AsyncStorage from '@react-native-community/async-storage'

export default class ConfigLoader {
    static Image={
        mime: '',
        data: '',
        url:'',
    };
    static getLogoFromAsync(){
        return new Promise(async(resolve,reject)=>{
            try{
                this.Image.data=await AsyncStorage.getItem('logoImage');
                this.Image.url=await AsyncStorage.getItem('logoUrl');
                resolve(this.Image);
            }catch(error){
                reject(error);
            }
        })
    }
    static getLogo(){
        return this.Image;
    }
    static pullConfig(){
        return new Promise(async(resolve,reject)=>{
            try{
                const config= await Config.get();
                const logo= config.get('logo');
                if(this.Image.url!=logo.url()){
                    this.Image.data = await logo.getData();
                    this.Image.url = logo.url();
                    await AsyncStorage.setItem('logoImage',this.Image.data);
                    await AsyncStorage.setItem('logoUrl',this.Image.url);
                    resolve(1);
                }
                resolve(2);
            }catch(error){
                reject(error);
            }
        })
    }
}