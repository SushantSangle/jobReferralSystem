import { 
    StyleSheet,
 } from 'react-native';
 import AsyncStorage from '@react-native-community/async-storage';
class DynamicStyle {
    //fill these colors accordingly
    static accentColor="";
    static bgColor="#88b972";
    static fgColor="";
    //call this function for the first time before anything renders
    UpdateValues(){
        AsyncStorage.getItem("accentColor").then((color)=>{
            color=this.accentColor;
        }).catch((error)=>{
            console.log("error");
        })
        AsyncStorage.getItem("bgColor").then((color)=>{
            color=this.bgColor;
        }).catch((error)=>{
            console.log("error");
        })
        AsyncStorage.getItem("fgColor").then((color)=>{
            color=this.fgColor;
        }).catch((error)=>{
            console.log("error");
        })
    }
    //function to set colors
    static setColors(accent,bg,fg){
        this.accentColor=accent;
        this.bgColor=bg;
        this.fgColor=fg;
        AsyncStorage.setItem("accentColor",accent).catch((error)=>{console.log(error)});
        AsyncStorage.setItem("bgColor",bg).catch((error)=>{console.log(error)});
        AsyncStorage.setItem("fgColor",fg).catch((error)=>{console.log(error)});
    }
    //function to call instead of StyleSheet.create
    static create(props){
        return StyleSheet.create(props);
    }
}
export {DynamicStyle as default}