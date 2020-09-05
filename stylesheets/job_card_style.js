import { StyleSheet, Dimensions } from 'react-native';
const width = Dimensions.get("window").width;

const job_card_style = StyleSheet.create({
    jobcard_view: {
        shadowColor : "#020202",
        width: "95%",
        borderRadius: 5,
        backgroundColor: "#222629",
        alignSelf: "center",
        padding: 10,
        elevation: 10,
        marginVertical: "1%",
    },
    jobcard_head: {
        color: "#69a74e",
        fontSize: width/18,
        fontWeight:'bold',
        marginBottom: 5
    },
    jobcard_details: {
        fontSize: width/28,
        padding: 1,
        color: "#606770"
    }
});

module.exports = job_card_style;