import AsyncStorage from '@react-native-community/async-storage';
import {
    Cloud
} from 'parse/react-native';
import { ToastAndroid } from 'react-native';
import { createSwitchNavigator } from 'react-navigation';
class RoleManager {
    static roleLevel = 3;
    static dark_theme = true;
    static get_dark() {
        return this.dark_theme;
    }
    static invert_dark() {
        this.dark_theme = !this.dark_theme;
        const themeVal = this.dark_theme?'true':'false';
        AsyncStorage.setItem("dark_theme_value",themeVal).then(()=>{
            ToastAndroid.show("Theme changed",ToastAndroid.SHORT);
        }).catch((error)=>{
            console.log("ERROR setting theme");
        });
    }
    static getLevel() {
        return this.roleLevel;
    }
    static setRole() {
        return new Promise(async (resolve, reject) => {
            var roles;
            try{
                const themeVal = await AsyncStorage.getItem("dark_theme_value");
                this.dark_theme = (themeVal=='true'?true:false);
            }catch{
                this.dark_theme = true;
            }
            try {
                roles = await Cloud.run('getRoles');
            } catch (error) {
                ToastAndroid.show("Please Check your internet connection, Unable to connect to server", ToastAndroid.LONG);
                try {
                    const userPriv = await AsyncStorage.getItem('userPriv');
                    this.roleLevel = userPriv ? userPriv : 3;
                    resolve(parseInt(this.roleLevel));
                    return;
                } catch (error) {
                    console.log("ERROR getting roleLevel:" + error);
                    resolve(parseInt(this.roleLevel));
                    return;
                }
            }
            var role;
            for (i in roles) {
                role = roles[i].get('name')
                if (role == 'SuperAdmin') {
                    this.roleLevel = 0;
                    break;
                }
                if (role == 'Recruiter') {
                    if (this.roleLevel > 1)
                        this.roleLevel = 1;
                }
                if (role == 'Employee') {
                    if (this.roleLevel > 2)
                        this.roleLevel = 2;
                }
            }
            console.log(this.roleLevel);
            try {
                console.log("saving role");
                await AsyncStorage.setItem('userPriv', this.roleLevel.toString());
                console.log("role Saved");
            } catch (error) {
                reject(error);
                return;
            }
            resolve(this.roleLevel);
            return;
        })
    }
}
export { RoleManager as default }