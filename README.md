<p align="center">
<a href="https://github.com/mitulsavani/react-native-daug">
<img alt="daug" src="./assets/daugLogo.png" width="250">
</a>
</p>

<h3 align="center">
Daug 
</h3>

## What's Daug?

**Daug is a fully functioning Social Network mobile application for pet owners to post pictures of their pets and share it with community.**

## Functionality
- Users can **sign up** & **log in** into the app
- Users can **create** and **upload pictures** new post
- Users can **like, dislike** and **comment** on others post
- Users can **follow** each other

### [Demo - Try it on Expo](https://exp.host/@mitulsavani/daug-mobile)
![daug_demo](./assets/daug.gif)


Used [React Native AWS3](https://github.com/benjreinhart/react-native-aws3)  library to let the users upload a new profile picture. Additionally, I used [React Native Elements](https://github.com/react-native-training/react-native-elements) library to build UI, [React Navigation](https://reactnavigation.org/) library to handle navigation, and packages such as react-native-modal and [React-Native-Keyboard-Aware-Scroll-View](https://github.com/APSL/react-native-keyboard-aware-scroll-view) to improve UI.

## Designs and Inspiration

Intro, Login & Sign Up screens are based on **Robinhood App**.

Profile screen is based on **Instagram**.

Social Feed screen is based on **Facebook** and **Instagram**.


## Milestones

Learn more about the milestones of the product and how I achieved them.

## Milestone #1

- [x] Design & build an Intro Screen
- [ ] :star: **Bonus:** Add [Snap Carousel](https://github.com/archriss/react-native-snap-carousel) with [Lottie animations](https://docs.expo.io/versions/latest/sdk/lottie.html) to Intro Screen
- [x] Design & build an Signup Screen
- [ ] :star: **Bonus:** Add buttons to sign up with Facebook & Twitter
- [x] Design & build an Login Screen
- [ ] :star: **Bonus:** Add buttons to login with Facebook & Twitter
- [x] Design & build an Profile Screen
- [x] :star: **Bonus:** Add the Logout button
- [x] Design & build an Social Feed Screen with [Mock Data](https://raw.githubusercontent.com/mobilespace/daug-mobile/master/app/utils/constants.js?token=AHejrmtQeRKU4ntCxaYLoNiWDlF-kQdKks5am8vHwA%3D%3D)
- [x] Attach screenshots/gif of screens to `README.MD`


## Milestone #2


- [x] Understand the 3 main navigation patterns for mobile apps:
- [x] [StackNavigator](https://reactnavigation.org/docs/hello-react-navigation.html#creating-a-stacknavigator)
- [x] [TabNavigator](https://reactnavigation.org/docs/tab-based-navigation.html)
- [x] [DrawerNavigator](https://reactnavigation.org/docs/drawer-based-navigation.html)
- [x] Setup a **IntroStack** (using StackNavigator) for the Intro Screen (root), Login Screen (push) & Sign Up Screen (push)
- [x] Setup a **HomeTabs** (using TabNavigator) for the Social Feed Screen (default) and Profile Screen
- [x] Setup a **RootNavigator** (using StackNavigator) with the **IntroStack** & **HomeTabs** with `mode: "modal"`
- [x] Design & build an Edit Profile Screen
- [x] Setup a **ProfileStack** (using StackNavigator) for the Profile Screen (root), Post Details Screen (push) & Edit Profile Screen (modal) with mode: "modal" and custom RNE header component
- [x] Design & build a Post Details Screen
- [x] Design & build a Create Post Screen
- [x] Setup a **SocialStack** (using StackNavigator) for the Social Feed Screen (root), Post Details Screen (push) & Create Post Screen (modal) with mode: "modal" and custom RNE header component
- [x] :star: **Bonus:** Display Posts on ProfileScreen
- [x] :star: **Bonus:** Setup a **HomeNavigator**(using DrawerNavigator) with the **HomeTabs** (as root) and update **RootNavigator** to use **HomeNavigator** instead of **HomeTabs**

## Milestone #3

- [x] Intro Screen - Make simple **`GET`** request to **`/api`** to check server status
- [x] Signup Screen - Make **`POST`** request to **`/auth/signup`** to create a new user
- [ ] :star: **Bonus:** Add UI validation to Signup Screen - name (not null), email (format) & password (min. 8 characters)
- [x] Login Screen - Make **`POST`** request to **`/auth/login`** to validate and login an existing user
- [ ] :star: **Bonus:** Add UI validation to Login Screen - email (format) & password (min. 8 characters)
- [x] Social Feed Screen - Make **`GET`** request to **`/api/feed/`** to get all posts for social feed
- [x] :star: **Bonus:** Use `ActivityIndicator` to show placeholder loading when fetching feed data
- [x] :star: **Bonus:** Use `DeviceEventEmitter` to trigger fetching posts when the `new_post_created` event is emitted
- [x] :star: **Bonus:** Use `timeSince()` utility function to show relative times for post creation
- [x] Create Post Screen - Make **`POST`** request to **`/api/users/:userId/posts`** to create a new post by the user
- [x] :star: **Bonus:** Use `DeviceEventEmitter` to emit `new_post_created` event once post is created
- [x] Profile Screen - Make **`GET`** request to **`/api/users/:userId`** to get all the profile data
- [x] :star: **Bonus:** Use `ActivityIndicator` to show placeholder loading when fetching profile data
- [x] :star: **Bonus:** Use `DeviceEventEmitter` to trigger fetching profile data when the `user_profile_updated` event is emitted
- [x] Edit Profile Screen - Make **`PUT`** request to **`/api/users/:userId`** to update a user's profile information
- [x] :star: **Bonus:** Use `DeviceEventEmitter` to emit `user_profile_updated` event once user data is updated
- [x] Setup Authentication flow for app using `AsyncStorage`. Once the user has logged in then take them to home page each time they open the app again
- [ ] Use Redux to share state between tab bar & screens
- [x] Add working gif of app to `README.MD`

## Wrap up

- [x] Dynamically load user info
- [x] Fix photo upload and add take photo functionality
- [x] Add Like, Comment and Follow API functionality
- [x] Clean up and format `README.MD` to showcase app - [follow this template](https://github.com/mobilespace/MobileGuides/blob/master/showcase_app_readme.md#readme-template-for-showcasing-a-mobile-app)
- [ ] :star: **Bonus:** Add phone number UI to Edit Profile screen
- [x] :star: **Bonus:** Add Camera functionality to Create Post screen
- [ ] :star: **Bonus:** Use Redux to share state between tab bar & screens
- [x] Add working gif of app to `README.MD`

## Future Ideas

Would like to implement Redux in the future to better manage the state. Also would like to add themes to the app to enable light/dark modes, and overall make the app more dynamic and functional.

## Getting started

```
git clone https://github.com/mitulsavani/react-native-daug.git
exp start
exp ios
exp android
```

## Feedback

For any other questions about this repo in general please reach out to [**@mitulsavani**](https://github.com/mitulsavani) on Github. <br>
PS: Feel free to fork it if you find my app interesting.

Thanks