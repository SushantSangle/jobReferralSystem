<<<<<<< HEAD
import DynamicStyle from '../utils/DyamicStyle';

const loginstyle=DynamicStyle.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      marginBottom: 30,
    },
  
    logoContainer: {
      width: 100,
      height: 100,
      resizeMode: 'stretch',
      borderRadius: 30,
      marginBottom: 20,
    },
    input: {
      width: '80%',
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
      marginBottom: 10,
    },
    inputext: {
      width: '80%',
      height: 44,
      padding: 10,
      textAlign: 'center',
      borderWidth: 1,
      borderColor: 'grey',
      marginBottom: 20,
      marginHorizontal: 20,
      borderRadius: 20,
    },
  signin: { 
    borderRadius: 20, 
    backgroundColor: DynamicStyle.bgColor, 
    height: 40, width: 150, 
    justifyContent: "center", 
    alignItems: "center" },
  });
=======
import { StyleSheet } from 'react-native';

const loginstyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 30,
  },

  logoContainer: {
    width: 100,
    height: 100,
    resizeMode: 'stretch',
    borderRadius: 30,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  inputext: {
    width: '80%',
    height: 44,
    padding: 10,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  signin: {
    borderRadius: 20,
    backgroundColor: "#3ab795",
    height: 40, width: 150,
    justifyContent: "center",
    alignItems: "center"
  },
});
>>>>>>> 8366da6701953cb94ca34b11d23c229f8caea081

module.exports = loginstyle;