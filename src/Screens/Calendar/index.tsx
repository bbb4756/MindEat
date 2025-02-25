import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  Agenda,
  DateData,
  // AgendaEntry,
  AgendaSchedule,
} from 'react-native-calendars';
import moment from 'moment';
import AddBtn from '../../Component/AddBtn';
const today = moment().format('YYYY-MM-DD');

type DataType = {
  timeStamp: number;
  date: string;
  time: string;
  category: string;
  emo: string;
  food: string[];
  kcal: number;
  weight: number;
  toilet: string;
  move: string;
  location: string;
  fullness: string;
};

const temData: DataType = {
  timeStamp: 1740268800000,
  date: '2025-02-23',
  time: '12:00PM - 12:45PM',
  category: '아침',
  emo: '😄',
  food: ['미역국', '쌀밥', '김치'],
  kcal: 785,
  weight: 200,
  toilet: '원활',
  move: '적당',
  location: 'With Staff Member In House',
  fullness: '적당',
};

const AgendaScreen = () => {
  const [items, setItems] = useState<AgendaSchedule | undefined>(undefined);

  // 날짜 데이터를 로드하는 함수
  const loadItems = (day: DateData) => {
    const currentItems = items || {};
    const strTime = day.dateString;

    if (!currentItems[strTime]) {
      currentItems[strTime] = [
        {
          name: temData.category, // "Julie Falcon"
          time: temData.time, // "12:00PM - 12:45PM"
          category: temData.food[0] + ', ' + temData.food?.[1] + '···.', // "Acu-Facial"
          staff: temData.location, // "With Staff Member #1"
          initials: temData.emo, // "JF"
          height: 80,
        },
      ];
    }

    setItems({...currentItems});
  };

  // 각 날짜 아이템을 렌더링하는 함수
  const renderItem = (reservation: any) => {
    return (
      <>
        <TouchableOpacity style={styles.item}>
          <View style={styles.leftContainer}>
            <Text style={styles.time}>{reservation.time}</Text>
            <Text style={styles.name}>{reservation.name}</Text>
            <Text style={styles.category}>{reservation.category}</Text>
            <Text style={styles.staff}>{reservation.staff}</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{reservation.initials}</Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      <View style={{flex: 1}}>
        <Agenda
          items={items}
          loadItemsForMonth={loadItems}
          selected={today}
          renderItem={renderItem}
          showClosingKnob={true}
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
      <AddBtn />
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    marginTop: 17,
    alignItems: 'center',
    elevation: 2,
  },
  leftContainer: {
    flex: 1,
  },
  time: {
    fontSize: 14,
    color: '#555',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 2,
  },
  category: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  staff: {
    fontSize: 14,
    color: '#888',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 24,
    // backgroundColor: '#81d68e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default AgendaScreen;
