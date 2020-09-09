import AsyncStorage from '@react-native-community/async-storage';
import {
    Cloud
} from 'parse/react-native';
import { ToastAndroid } from 'react-native';
class RoleManager {
    static roleLevel = 3;
    static dark_theme = true;
    static get_dark() {
        return this.dark_theme;
    }
    static invert_dark() {
        this.dark_theme = !this.dark_theme;
    }
    static getLevel() {
        return this.roleLevel;
    }
    static setRole() {
        return new Promise(async (resolve, reject) => {
            var roles;
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