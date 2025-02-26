import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, StyleSheet, Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Home from './src/Screens/Home';
import Library from './src/Screens/Library';
import MyPage from './src/Screens/MyPage';
import CalendarScreen from './src/Screens/Calendar';
import WriteMeal from './src/Screens/Calendar/writeMeal';
import Login from './src/Screens/Login';

// ✅ 네비게이션 타입 정의
export type RootTabParamList = {
  Home: undefined;
  CalendarScreen: undefined;
  Library: undefined;
  MyPage: undefined;
};

export type RootStackParamList = {
  HomeMain: undefined;
  Login: undefined;
  CalendarMain: undefined;
  WriteMeal: undefined;
  LibraryMain: undefined;
  MyPageMain: undefined;
};

// ✅ 스택 네비게이터 생성
const HomeStack = createNativeStackNavigator<RootStackParamList>();
const CalendarStack = createNativeStackNavigator<RootStackParamList>();
const LibraryStack = createNativeStackNavigator<RootStackParamList>();
const MyPageStack = createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator<RootTabParamList>();

// ✅ 각 탭의 스택 네비게이터 설정
const HomeStackNavigator: React.FC = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="HomeMain"
      component={Home}
      options={{title: 'HOME'}}
    />
    <HomeStack.Screen
      name="Login"
      component={Login}
      options={{title: '로그인', headerShown: false}}
    />
  </HomeStack.Navigator>
);

const CalendarStackNavigator: React.FC = () => (
  <CalendarStack.Navigator>
    <CalendarStack.Screen
      name="CalendarMain"
      component={CalendarScreen}
      options={{
        title: 'CALENDAR',
        headerTitle: '식사 기록',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'KOROADB',
          fontSize: 20,
          fontWeight: 'normal',
          color: '#333',
        },
      }}
    />
    <CalendarStack.Screen
      name="WriteMeal"
      component={WriteMeal}
      options={{
        headerShown: false,
      }}
    />
  </CalendarStack.Navigator>
);

const LibraryStackNavigator: React.FC = () => (
  <LibraryStack.Navigator>
    <LibraryStack.Screen
      name="LibraryMain"
      component={Library}
      options={{title: 'LIBRARY'}}
    />
  </LibraryStack.Navigator>
);

const MyPageStackNavigator: React.FC = () => (
  <MyPageStack.Navigator>
    <MyPageStack.Screen
      name="MyPageMain"
      component={MyPage}
      options={{title: 'MY PAGE'}}
    />
  </MyPageStack.Navigator>
);

// ✅ 아이콘 설정 함수
const generateTabIcons = () => {
  const icons = {
    default: {
      Home: require('./src/Assets/Footer/home.png'),
      CalendarScreen: require('./src/Assets/Footer/calendar.png'),
      Library: require('./src/Assets/Footer/library.png'),
      MyPage: require('./src/Assets/Footer/mypage.png'),
    },
    focused: {
      Home: require('./src/Assets/Footer/focused_home.png'),
      CalendarScreen: require('./src/Assets/Footer/focused_calendar.png'),
      Library: require('./src/Assets/Footer/focused_library.png'),
      MyPage: require('./src/Assets/Footer/focused_mypage.png'),
    },
  };

  return (route: {name: keyof typeof icons.default}) => ({
    tabBarIcon: ({focused}: {focused: boolean}) => (
      <Image
        source={focused ? icons.focused[route.name] : icons.default[route.name]}
        style={iconStyle.iconSize}
      />
    ),
  });
};

const iconStyle = StyleSheet.create({
  iconSize: {
    width: 18,
    height: 18,
  },
});

const App: React.FC = () => {
  const getTabBarIcon = generateTabIcons();

  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="CalendarScreen"
          screenOptions={({route}) => ({
            ...getTabBarIcon(route),
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: '#999',
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '500',
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'KOROADB',
              fontSize: 20,
              fontWeight: 'normal',
              color: '#333',
            },
            tabBarStyle: [
              {
                height: 60,
                paddingBottom: 10,
                borderTopWidth: 1,
                borderTopColor: '#eee',
                backgroundColor: '#fff',
              },
              Platform.OS === 'ios' && {marginBottom: 15},
            ],
          })}>
          <Tab.Screen
            name="Home"
            component={HomeStackNavigator}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="CalendarScreen"
            component={CalendarStackNavigator}
            options={{title: '식사 기록', headerShown: false}}
          />
          <Tab.Screen name="Library" component={LibraryStackNavigator} />
          <Tab.Screen name="MyPage" component={MyPageStackNavigator} />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
