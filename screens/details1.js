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
    ScrollView
} from 'react-native';
import PopupMenu from '../components/popup_menu';
import {
    Query,
    Relation,
    User,
    Object
} from 'parse/react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RoleManager from '../utils/RoleManager'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';


const width = Dimensions.get("window").width;
const commentWidth = width - 20;
const commentTextWidth = commentWidth - 20 - 47;

export default class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            userComment: '',
            userName: '',
            comments: [],
            User: undefined,
            post: undefined,
            actions: ['Refer Person']
        };
        this.navigation = this.props.navigation;
        if (RoleManager.getLevel() < 2) {
            this.state.actions = [...this.state.actions, ...['Referred People', 'Edit', 'Remove',]];
        }
        User.currentAsync().then(async (user) => {
            this.state.User = user;
        }).catch((error) => {
            console.log("UnAuthorizedAccess");
        })
    }

    onPopupEvent = (eventName, index) => {
        if (eventName !== 'itemSelected') return
        if (index == 0) {
            this.navigation.navigate("ReferPerson", {
                jobId: this.props.route.params.jobId,
            });
        }
        if (index == 1) {
            this.navigation.navigate("ReferredPeople", { jobId: this.props.route.params.jobId });
        }
        if (index == 2) {
            this.navigation.navigate("EditPost", { objectId: this.props.route.params.jobId });
        }
        if (index == 3) {
            const jobPost = this.props.route.params.jobPost;
            jobPost.destroy().then(() => {
                ToastAndroid.show("Post deleted for all other users, restart app to see updated list.", ToastAndroid.SHORT);
                this.navigation.goBack();
            })
        }
    }
    componentDidMount() {
        const query = new Query('jobPosts');
        console.log('Components Mounted:' + this.props.route.params.jobId);
        query.get(this.props.route.params.jobId).then(async (job) => {
            this.state.post = job;
            const relation = new Relation(job, 'postComments');
            const relatedQuery = relation.query();
            const resultArray = await relatedQuery.find();
            for (var i in resultArray) {
                console.log(resultArray[i].id);
                this.state.comments.push(resultArray[i]);
            }
            this.setState(this.state);
        }).catch((error) => {
            console.log("ERROR GETTING COMMENTS:" + error);
        })

    }

    onPress = () => {
        if (this.state.userComment == '') {
            alert("Can't post empty comment");
        }
        else {
            var comment = new Object('comments', {
                fromPost: this.state.post.toPointer(),
                byUser: this.state.User.toPointer(),
                byUsername: this.state.User.get('username'),
                content: this.state.userComment,
            });
            const relation = new Relation(this.state.post, 'postComments');
            comment.save().then(() => {
                ToastAndroid.show("Comment Posted", ToastAndroid.SHORT);
                this.state.userComment = '';
                this.setState(this.state);
            }).catch((error) => {
                alert("Can't post empty comment");
            });
        }
    };

    render() {
        let comments = this.state.comments.map((val, key) => {
            console.log(val);
            return (
                <View style={styles.jobcard_view} key={key}>
                    <Text style={[styles.jobcard_details, { fontWeight: 'bold' }]}>{val.get('byUsername')}</Text>
                    <Text style={styles.jobcard_details}>{val.get('content')}</Text>
                </View>
            )
        })
        return (
            <>
                <View style={styles.jobcard_view}>
                    <Text style={styles.jobcard_head}>{this.props.route.params.jobHead}</Text>
                    <Text style={styles.jobcard_details}>TYPE: {this.props.route.params.jobType}</Text>
                    <Text style={styles.jobcard_details}>LOCATION: {this.props.route.params.jobLocation}</Text>
                    <Text style={styles.jobcard_details}>POSTED BY: {this.props.route.params.jobAuthor}</Text>
                    <Text style={styles.jobcard_details}>Technology: {this.props.route.params.jobTechnology}</Text>
                    <Text style={styles.jobcard_details}>Work Experience: {this.props.route.params.jobWorkExperience}</Text>
                    <Text style={styles.jobcard_details}>Description: {this.props.route.params.jobDescription}</Text>

                    <View style={{ flexDirection: "row-reverse", alignContent: "center" }}>
                        <PopupMenu actions={this.state.actions}
                            onPress={this.onPopupEvent} />
                        <Text style={{ color: "#606770", marginHorizontal: '5%' }}>{this.props.route.params.jobDate}</Text>
                    </View>
                </View>
                <Text style={{ fontWeight: "bold", fontSize: 20, marginLeft: '2.5%' }}>Comments</Text>
                <ScrollView>
                    {comments}
                    <View style={[styles.jobcard_view, { flexDirection: 'row', justifyContent: 'space-between' }]}>
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
                </ScrollView>
            </>
        );
    }
}
const commentStyle = StyleSheet.create({
    commentText: {
        color: "#606770",
    },
    sendButton: {
        width: 45,
        height: 45,
    }
})
const styles = require('../stylesheets/job_card_style');