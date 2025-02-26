import React from 'react';
import commonStyles from '../../Common/style';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
const Home = ({navigation}) => {
  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.mainViewStyle}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={commonStyles.textStyle}>Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
