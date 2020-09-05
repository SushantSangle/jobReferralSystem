/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TextInput,
    FlatList,
    ToastAndroid,
    Image,
} from 'react-native';
import PopupMenu from '../components/popup_menu';
import Comment from '../components/comment';
import Button from '../components/button';
import {
    Query,
    Relation,
    User,
    Object
} from 'parse/react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const width = Dimensions.get("window").width;
const commentWidth=width-20;
const commentTextWidth=commentWidth-20-47;

export default class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            userComment: '',
            userName: '',
            comments:[],
            User: undefined,
            post: undefined,
        };
        this.navigation = this.props.navigation;
        
        User.currentAsync().then(async(user)=>{
            this.state.User=user;
        }).catch((error)=>{
            console.log("UnAuthorizedAccess");
        })
    }

    onPopupEvent = (eventName, index) => {
        if (eventName !== 'itemSelected') return
        if (index == 0) {
            this.navigation.navigate("EditPost", { objectId: this.navigation.getParam('jobId') });
        }
        if (index == 1) {
            alert("Pressed Delete Post");
        }
        if (index == 2) {
            this.navigation.navigate("ReferPerson",{
                jobId:this.navigation.getParam('jobId'),
            });
        }
        if (index == 3) {
            this.navigation.navigate("ReferredPeople",{   jobId:this.navigation.getParam('jobId')});
        }
    }
    componentDidMount(){
        const query = new Query('jobPosts');
        console.log('Components Mounted:'+this.navigation.getParam('jobId'));
        query.get(this.navigation.getParam('jobId')).then(async(job)=>{
            this.state.post=job;
            const relation = new Relation(job,'postComments');
            const relatedQuery = relation.query();
            const resultArray = await relatedQuery.find();
            for(var i in resultArray){
                console.log(resultArray[i].id);
                this.state.comments.push(resultArray[i]);
            }
            this.setState(this.state);
        }).catch((error)=>{
            console.log("ERROR GETTING COMMENTS:"+error);
        })

    }

    onPress = () => {
        if (this.state.userComment == '') {
            alert("Can't post empty comment");
        }
        else {
            var comment = new Object('comments',{
                fromPost: this.state.post.toPointer(),
                byUser: this.state.User.toPointer(),
                content: this.state.userComment,
            });
            const relation = new Relation(this.state.post,'postComments');
            comment.save().then(()=>{
                ToastAndroid.show("Comment Posted",ToastAndroid.SHORT);
                this.state.userComment='';
                this.setState(this.state);
            }).catch((error)=>{
                alert("Can't post empty comment");
            });
        }
    };

    render() {
        let comments = this.state.comments.map((val,key)=>{
            return(
                <View style={styles.jobcard_view} key={key.toString()}>
                    <Text style={styles.jobcard_details}>{val.get('byUser').get('username')}</Text>
                    <Text style={styles.jobcard_details}>{val.get('content')}</Text>
                </View>
            )
        })
        return (
            <>
                <View style={styles.jobcard_view}>
                    <Text style={styles.jobcard_head}>{this.navigation.getParam('jobHead')}</Text>
                    <Text style={styles.jobcard_details}>TYPE: {this.navigation.getParam('jobType')}</Text>
                    <Text style={styles.jobcard_details}>LOCATION: {this.navigation.getParam('jobLocation')}</Text>
                    <Text style={styles.jobcard_details}>POSTED BY: {this.navigation.getParam('jobAuthor')}</Text>
                    <Text style={styles.jobcard_details}>Technology: {this.navigation.getParam('jobTechnology')}</Text>
                    <Text style={styles.jobcard_details}>Work Experience: {this.navigation.getParam('jobWorkExperience')}</Text>
                    <Text style={styles.jobcard_details}>Description: {this.navigation.getParam('jobDescription')}</Text>

                    <View style={{ flexDirection: "row-reverse", alignContent: "center" }}>
                        <PopupMenu actions={['Edit', 'Remove', 'Refer Person', 'Referred People']}
                            onPress={this.onPopupEvent} />
                        <Text style={{ color: "#606770", marginHorizontal: '5%' }}>{this.navigation.getParam('jobDate')}</Text>
                    </View>
                </View>
                <Text style={{ fontWeight: "bold", fontSize: 20, marginLeft: '2.5%' }}>Comments</Text>
                
                {comments}
                <View style={commentStyle.commentBox}>
                    <TextInput
                        style={commentStyle.commentText}
                        value={this.state.userComment}
                        onChangeText={(userComment) => this.setState({ userComment })}
                        label="userComment"
                        placeholder='comment Here'
                        placeholderTextColor='#606770'
                    />
                    <TouchableOpacity onPress={this.onPress}>
                        <Image style={commentStyle.sendButton} source={require('../images/send.png')}></Image>
                    </TouchableOpacity>
                </View>
            </>
        );
    }
}
const commentStyle = StyleSheet.create({
    commentBox: {
        width: commentWidth,
        borderRadius: 5,
        backgroundColor: "#222629",
        alignSelf: "center",
        padding: 10,
        elevation: 10,
        color: "#606770",
        marginVertical: "1%",
        flexDirection:'row' ,
        flexWrap:'nowrap',
        alignItems:'center',
    },
    commentText:{
        color: "#606770",
        width: commentTextWidth,
    },
    sendButton: {
        width : 45,
        height: 45,
    }
})
const styles = require('../stylesheets/job_card_style');

