import { StyleSheet } from 'react-native';

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
        fontSize: 18,
        paddingLeft: 10,
        marginLeft: 10,
    },
    signin: {
        borderRadius: 20,
        backgroundColor: "#3ab795",
        height: 60, width: 200,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    inputext: {
        width: '90%',
        padding: 10,
        marginBottom: 20,
        marginHorizontal: 20,
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
});

module.exports = newPost;
