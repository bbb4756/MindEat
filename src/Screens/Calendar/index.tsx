import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  Agenda,
  DateData,
  AgendaEntry,
  AgendaSchedule,
} from 'react-native-calendars';
import moment from 'moment';
import testIDs from './testIDs';

const today = moment().format('YYYY-MM-DD');

const AgendaScreen = () => {
  const [items, setItems] = useState<AgendaSchedule | undefined>(undefined);

  // 날짜 데이터를 로드하는 함수
  const loadItems = (day: DateData) => {
    const currentItems = items || {};

    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000; // 하루 단위로 시간 계산
        const strTime = timeToString(time);

        if (!currentItems[strTime]) {
          currentItems[strTime] = [];

          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            currentItems[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime,
            });
          }
        }
      }

      const newItems: AgendaSchedule = {};
      Object.keys(currentItems).forEach(key => {
        newItems[key] = currentItems[key];
      });

      setItems(newItems); // 상태 업데이트
    }, 1000);
  };

  // 날짜를 포맷팅하는 함수
  const timeToString = (time: number) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  // 각 날짜 아이템을 렌더링하는 함수
  const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';

    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, {height: reservation.height}]}
        onPress={() => Alert.alert(reservation.name)}>
        <Text style={{fontSize, color}}>{reservation.name}</Text>
      </TouchableOpacity>
    );
  };

  // 비어 있는 날짜를 렌더링하는 함수
  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  // 아이템 변경 여부를 확인하는 함수
  const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  };

  return (
    <View style={{flex: 1}}>
      <View style={{height: 100, backgroundColor: 'red'}}>
        <TestFontScreen />
      </View>
      <Agenda
        testID={testIDs.agenda.CONTAINER}
        items={items}
        loadItemsForMonth={loadItems}
        selected={today}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        showClosingKnob={true} // Knob Bar 활성화
        showOnlySelectedDayItems
        theme={{
          calendarBackground: 'white',
          todayTextColor: 'green',
          dotColor: '#86dd71',
          selectedDayBackgroundColor: '#86dd71',
          todayDotColor: 'green',
          indicatorColor: '#86dd71',
          agendaTodayColor: 'green',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  customDay: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dayItem: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AgendaScreen;

const TestFontScreen = () => {
  return (
    <View>
      <Text style={{fontFamily: 'KOROADB', fontSize: 20}}>
        폰트 테스트 (KoroadBold)
      </Text>
      <Text style={{fontFamily: 'KOROADB', fontSize: 20}}>
        기본 시스템 폰트 테스트
      </Text>
    </View>
  );
};
