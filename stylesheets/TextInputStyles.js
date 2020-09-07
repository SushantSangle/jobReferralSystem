import DynamicStyle from '../utils/DyamicStyle'
import {Dimensions} from 'react-native'
const width = Dimensions.get("window").width;

const commentWidth=width-50;

const TextStyle=DynamicStyle.create({
    commentBox: {
        shadowColor : "#020202",
        width: commentWidth,
        borderRadius: 5,
        backgroundColor: "#222629",
        alignSelf: "center",
        padding: 10,
        elevation: 10,
        marginVertical: "1%",
    },
    sendButton: {
        width : 40,
        height: 40,
    }
})