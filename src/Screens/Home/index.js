import React from 'react';
import commonStyles from '../../Common/style';
import {View, Text, SafeAreaView} from 'react-native';
const Home = () => {
  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.mainViewStyle}>
        <Text style={commonStyles.textStyle}>Home</Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
