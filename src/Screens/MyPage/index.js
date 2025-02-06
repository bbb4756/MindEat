import React from 'react';
import commonStyles from '../../Common/style';
import {View, Text, SafeAreaView} from 'react-native';
const MyPage = () => {
  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.mainViewStyle}>
        <Text style={commonStyles.textStyle}>MyPage</Text>
      </View>
    </SafeAreaView>
  );
};

export default MyPage;
