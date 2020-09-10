import { StyleSheet, Dimensions } from 'react-native';
const width = Dimensions.get("window").width;

const job_card_style = StyleSheet.create({
    jobcard_view: {
        width: "90%",
        borderRadius: 10,
        alignSelf: "center",
        padding: 10,
        marginVertical: "1%",
        borderColor:'#777E8B',
        borderWidth: 2,
    },
    jobcard_head: {
        color: '#69a74e',
        fontSize: width/18,
        fontWeight:'bold',
        marginBottom: 5
    },
    jobcard_details: {
        fontSize: width/28,
        padding: 1,
        color: '#586776'
    },
    fontSize: width/28,
    headSize: width/18,
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,

    },

    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
    },
});

module.exports = job_card_style;