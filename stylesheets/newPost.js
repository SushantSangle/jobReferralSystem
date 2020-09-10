import { StyleSheet } from 'react-native';
import { withOrientation } from 'react-navigation';

const newPost = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,  
    },
    scrollView: {
        width: '100%',
        padding: 10,
    },
    text: {
        color: '#586776',
        paddingLeft: 10,
        marginLeft: 10,
    },
    signin: {
        alignSelf:'center',
        borderRadius: 20,
        backgroundColor: "#3ab795",
        height: 60, width: 200,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        color: '#ffffff',
    },
    inputext: {
        width: '90%',
        padding: 10,
        marginTop: 8,
        marginBottom: 8,
        marginHorizontal: 20,
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: '#606770',
        borderRadius: 15,
        color: '#535C68',
   
    },

});

module.exports = newPost;
