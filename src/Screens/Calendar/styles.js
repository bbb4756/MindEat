import {StyleSheet} from 'react-native';

const calendarStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  calendarContainer: {
    calendarContainer: {
      position: 'absolute', // 상단 고정
      top: 0, // 화면 위쪽에 고정
      left: 0,
      right: 0,
      overflow: 'hidden', // 자연스럽게 확장/축소
      backgroundColor: 'white',
    },
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    padding: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  arrowButton: {
    padding: 10,
  },
  arrowText: {
    fontSize: 20,
    color: 'rgb(156, 227, 255)',
    fontWeight: 'bold',
  },
  weekDays: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    color: '#666',
  },
  sundayText: {
    color: '#FF0000',
  },
  saturdayText: {
    color: '#0000FF',
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
  },
  dayCell: {
    width: '14.28%',
    padding: 5,
    alignItems: 'center',
  },
  day: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDay: {
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 18,
    backgroundColor: 'transparent',
  },
  dayText: {
    fontSize: 16,
    color: '#333',
  },
  selectedDayText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default calendarStyles;
