import { createStackNavigator } from 'react-navigation-stack';
import NewPost from '../screens/NewPost';
import EditPost from '../screens/EditPost';
import PostManagement from '../screens/PostManagement';

const screens = {
    PostManagement: {
        screen: PostManagement,
        navigationOptions: {
            title: "Post Management"
        }
    },
    NewPost: {
        screen: NewPost,
        navigationOptions: {
            title: "Add New Post"
        }
    },
    EditPost: {
        screen: EditPost,
        navigationOptions: {
            title: "Edit Post Details"
        }
    },
}

const postManagementStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "#88b972",
            height: 50
        }
    }
});

export default postManagementStack;
