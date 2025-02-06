import React from 'react';
import commonStyles from '../../Common/style';
import {View, Text, SafeAreaView} from 'react-native';
const Library = () => {
  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.mainViewStyle}>
        <Text style={commonStyles.textStyle}>Library</Text>
      </View>
    </SafeAreaView>
  );
};

export default Library;
