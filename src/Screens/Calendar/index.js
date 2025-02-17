import React from 'react';
import commonStyles from '../../Common/style';
import {View, Text, SafeAreaView} from 'react-native';
const Calendar = () => {
  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.mainViewStyle}>
        <Text style={commonStyles.textStyle}>Calendar</Text>
      </View>
    </SafeAreaView>
  );
};

export default Calendar;
