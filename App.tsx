import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import {StyleSheet, Platform} from 'react-native';
import Home from './src/Screens/Home';
import Library from './src/Screens/Library';
import MyPage from './src/Screens/MyPage';
import Calendar from './src/Screens/Calendar';

import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

type RouteNameType = 'Home' | 'Calendar' | 'Library' | 'MyPage';

type TabBarIconProps = {
  focused: boolean;
};

type RootStackParamList = {
  Home: object;
  Library: object;
  MyPage: object;
  Calendar: object;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

// Dynamic icon generation based on route name
const generateTabIcons = () => {
  const icons = {
    default: {
      Home: require('./src/Assets/Footer/home.png'),
      Calendar: require('./src/Assets/Footer/calendar.png'),
      Library: require('./src/Assets/Footer/library.png'),
      MyPage: require('./src/Assets/Footer/mypage.png'),
    },
    focused: {
      Home: require('./src/Assets/Footer/focused_home.png'),
      Calendar: require('./src/Assets/Footer/focused_calendar.png'),
      Library: require('./src/Assets/Footer/focused_library.png'),
      MyPage: require('./src/Assets/Footer/focused_mypage.png'),
    },
  };

  return (route: {name: RouteNameType}) => ({
    tabBarIcon: (props: TabBarIconProps) => (
      <Image
        source={
          props.focused ? icons.focused[route.name] : icons.default[route.name]
        }
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
    const timer: NodeJS.Timeout = setTimeout(() => {
      SplashScreen.hide();
    }, 1500); // 3초 후에 스플래시 스크린 숨기기, 시간은 조정 가능

    return () => clearTimeout(timer); // 클린업
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({route}) => ({
            headerShown: false,
            ...getTabBarIcon(route),
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: '#999',
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '500',
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
          <Tab.Screen name="Home" component={Home} options={{title: 'HOME'}} />
          <Tab.Screen
            name="Calendar"
            component={Calendar}
            options={{title: 'CALENDAR'}}
          />
          <Tab.Screen
            name="Library"
            component={Library}
            options={{title: 'LIBRARY'}}
          />
          <Tab.Screen
            name="MyPage"
            component={MyPage}
            options={{title: 'MY PAGE'}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
