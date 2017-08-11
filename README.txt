----------------- READ ME ---------------

--------------- NPM Packages ---------------

Npm install --save react-redux   (To create Providers)
Npm install --save redux   ( To write async method. >  dispatch actions )
Npm install --save native-base   (UI components
Npm i react-navigation --save   (For Navigation..)
Npm i --save lodash   (To manipulate easily Javascript array, objects etc..)
Npm install react-native-vector-icons   (set of icons)
Npm install --save axios (http client)
Npm i react-native-action-button --save (fab button for home page)
Npm i react-native-segmented-control-tab --save (segmented tab )
Npm i realm --save (cache memory database)
Npm i react-native-swiper --save (swiper when first launching the app)
Npm i react-native-tab-view --save (swipable tab-view)



> react-native link   (to link native libraries from package.JSON to native project)



--------------- Redux MiddleWares Packages ---------------

Npm install --save redux-thunk (allows your action creators to return a function-
Npm install --save redux-promise (allows your action creators to return a promise)
Npm install --save redux-logger (add logs when dispatch actions)


--------------- Environment Variables ---------------

export ANDROID_HOME=/Users/*USERNAME*/Library/Android/sdk  (Path to Android SDK)
PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools


--------------- ESLint Setup ---------------

Npm install -g eslint   (inside project directory)
Npm install --save-dev eslint-config-rallycoding   (pre build set of rules for eslint)
(RUN eslint --init    (to create own files and configure ))
Create .eslintrc with text inside : { “extends”: “rallycoding” }   (tell eslint to use the build set)
