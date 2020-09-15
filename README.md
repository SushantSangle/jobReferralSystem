# JOB REFERRAL SYSTEM
The Job Referral App is a platform where companies can ask their Employees for referrals for the posts generated in the company. This app brings together the Recruiters and the Employees with a Super Admin who manages the app. The recruiters will be able to post the requirements and the Employees will be able to view the posts, ask doubts in the comments section and also post the referrals to the employer.

These referrals can be viewed by the Employer who will be able to make changes in them and download them in a single go. The super admin will be able to manage the users of this app and allot them the accession rights. He can also change the theme, name and logo of the app.

This application is made using the react native development environment and is currently configured for android applications. The server side code has been developed on the Parse server using mongoDB database.

# OBJECTIVES
1. Communicate in timely manner
2. Allow more of the right people to make referrals
3. Proactively encourage referrals.
4. Keep employees updates on available job openings.
5. Give exaustive job requirements description.

# REQUIREMENTS
## HARDWARE REQUIREMENTS FOR DEPLOYMENT
1. Android mobile device/emulator.

## SOFTWARE REQUIREMENTS FOR DEVELOPMENT
1. React Native Framework

# PRODUCT FEATURES
## FUNCTIONAL
1. Role Based Access Control System (RBAC)
1. Upload Employee Data from CSV
1. Add/View/Modify/Delete User data
1. Add/View/Modify/Delete Job posts
1. Users are able to post comments on Job Posts
1. Recruiters can respond to the comments
1. An Email Notification can be sent to Users when new Job is posted
1. Super admin can Download Referrals into CSV

## NON FUNCTIONAL
1. The data can be stored in a MongoDB database
The Application is deployable on open source Parse server
1. The Application supports on latest Android Platform
1. The Application supports 1000+ concurrent users.
1. The Application is secure as only authorized users are able to access the application
1. The Size of the APK file has been kept as small as possible
1. User Interface and Icons are as per Industry Best Practices
1. Super Admin is able to Modify Company Logo
1. User-friendly error messages as well as alerts appears on the screen wherever applicable

# STRUCTURE OF APPLICATION
## NAVIGATION
![navigation](https://github.com/SushantSangle/jobReferralSystem/blob/main/images/navigation_structure.png?raw=true)

## LAYOUTS
1. **Login Page**
	- For the end-user to access the application functions, the user is expected to login/sign-in into the application. This is done by acquiring the login credentials (username and password) of the user. To verify the login session of the user we compare the above login credentials with the database. The authentication factors are:
		1. Username - provided by the company
		2. Password - provided by the company
2. **Home Page**
	- The home page features the latest referrals. A list view is implemented to view the referrals in order. Here each post briefly describes the job requirements. Clicking on a particular post takes you to the details of the job post.
	- This page is visible by all the users.
	- The home page also contains a floating button that helps the Employer to create a new post. This button is only visible to the Super Admin and the Employer.
3. **New Post**
	- This page is used by the Employer and the Super Admin only to create new posts. The fields of this form include - Position, Technology, Type, Location, Qualification, Work Experience and Description.
4. **Post Details Page**
	- This page will display all the attributes of the job post posted by the Employer along with the date and time that the post was uploaded.
	- This page will be visible by all the users.
	- The post card contains a 3 dot menu that contains the following options for the user - Refer Person, Referred People, Edit and Remove. The remove options will delete the post.
	- Only Refer Person will be visible to the Employees. Rest other options will be visible to both Employer and Super Admin.
	- The Comments section will display the comments posted by the users and is visible to everyone.
5. **Refer Person Page**
	- This form will be used by Employees to Post Job Referrals. The fields of this form include - Name, Contact, Date of Birth, Email, Qualification, Work Experience, Description and Other Links.
	- This form is visible to everyone.
6. **Referred People Page**
	- Referred People contains the Referrals posted by the Employees in a list form. Each Post contains a 3 dot menu for the Employer to delete that post if necessary.
	- The page also contains a download option that downloads the Referrals in a csv file that is stored at the downloads folder in the internal storage of the mobile phone.
	- This page is only visible to the Employer and the Super Admin.
7. **Edit Post Page**
	- This page contains a form that will allow the user to update the details of that post. The fields of this form are the same as that of the New Post page form.
	- The visibility is set to visible for the Employer and the Super Admin.
8. **User Management page**
	- This page displays the users of the application in brief. The fields of the users include- Name, ID and Post. On clicking on the user, the details of the user can be seen.
	- This page also uses a floating button for creating new users. The fields include - name, username, password, email address, gender, date of birth, designation, organization, description, status, and role.
	- This page is only visible to the Employer and the Super Admin.
9. **User Details Page**
	- This page displays all the fields of the User mentioned in the New User Page. The card also contains a 3 dot menu that allows the Super Admin to Edit users and to delete them.
	- Only the Super Admin can view the User Details page.
10. **Edit User Page**
	- This page is used to edit the users data. The fields that can be edited are the same as those mentioned in the New User Page form.
	- This page can only be accessed by the Super Admin.
11. **Settings Page**
	- This page has fields like Change Logo, Change Theme and Logout.
	- The change logo page has fields like change app name, change app logo and the change app line.
	- The theme gets changed when clicked on the option. This option toggles between the light and the dark theme.
	- Logout option logs the user out and returns to the sign in page.

# SCREENSHOTS
![login1](https://github.com/SushantSangle/jobReferralSystem/blob/main/images/login_page1.png?raw=true)
![login2](https://github.com/SushantSangle/jobReferralSystem/blob/main/images/login_page2.png?raw=true)

![home_light](https://github.com/SushantSangle/jobReferralSystem/blob/main/images/home_light.png?raw=true)
![home_dark](https://github.com/SushantSangle/jobReferralSystem/blob/main/images/home_dark.png?raw=true)

![details](https://github.com/SushantSangle/jobReferralSystem/blob/main/images/details_light.png?raw=true)
![details_dark](https://github.com/SushantSangle/jobReferralSystem/blob/main/images/details_dark.png?raw=true)

![editPost_light](https://github.com/SushantSangle/jobReferralSystem/blob/main/images/editPost_light.png?raw=true)
![ediPost_dark](https://github.com/SushantSangle/jobReferralSystem/blob/main/images/new_post_dark.png?raw=true)

You can find more screenshots in **images** folder.
# GETTING STARTED
1. Create a parse server from [here](https://github.com/SushantSangle/jobReferralSystem_server/).
2. replace the link inside *Parse.serverURL* from screens/LoginScreen.js.
3. type `npm install` to install all the required dependencies.
4. type `npx react-native run-android` to install it onto your system and try it out.
5. Build the apk after proper configuration.

# CONTRIBUTORS
1. <a class='contrib_unit' style='display:flex;align-items:center;' href='https://github.com/atharva-borekar'><img style='border-radius:15px;height:15px;width:15px' src='https://github.com/atharva-borekar.png'> Atharva Borekar</a>
1. <a class='contrib_unit' href='https://github.com/priyaghayal'><img src='https://github.com/priyaghayal.png'> Priya Ghayal</a>
1. <a class='contrib_unit' href='https://github.com/Hardika3'><img src='https://github.com/Hardika3.png'> Hardika Doshi</a>
1. <a class='contrib_unit' href='https://github.com/SushantSangle'><img src='https://github.com/SushantSangle.png'> Sushant Sangle</a>