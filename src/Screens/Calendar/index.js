import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

const CALENDAR_HEIGHT = 380;
const WEEK_HEIGHT = 100;
const SPRING_CONFIG = {damping: 20, stiffness: 150};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isMonthView, setIsMonthView] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState([]);
  // const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  // const contextX = useSharedValue(0);
  const contextY = useSharedValue(0);

  // useEffect(() => {
  //   console.log('늘');
  // });

  useEffect(() => {
    const today = new Date();
    setSelectedDate(today);
    setSelectedWeek(getWeekDays(today)); // 오늘 날짜 기준으로 주 데이터 설정
  }, []);

  useEffect(() => {
    if (selectedWeek.length > 0) {
      setCurrentDate(selectedWeek[0]); // 주가 변경되면 currentDate 업데이트
    }
  }, [selectedWeek]);

  const updateIsMonthView = useCallback(value => {
    setIsMonthView(value);
  }, []);

  const gesture = Gesture.Pan()
    .onStart(event => {
      console.log('ononon');
      ('worklet');
      // console.log(
      //   '시작점은 왜 항상 0일까',
      //   event.translationX,
      //   event.translationY,
      // );
      contextY.value = translateY.value; // 기존 위치 저장
    })
    .onUpdate(event => {
      'worklet';
      translateY.value = contextY.value + event.translationY;

      console.log('움직일 때', event.translationX, event.translationY);
    })
    .onEnd(event => {
      'worklet';

      if (translateY.value > (CALENDAR_HEIGHT - WEEK_HEIGHT) / 2) {
        console.log('펼치다');
      } else {
        console.log('접다');
      }

      const targetValue =
        translateY.value > (CALENDAR_HEIGHT - WEEK_HEIGHT) / 2
          ? CALENDAR_HEIGHT - WEEK_HEIGHT // 280기준
          : 0;
      translateY.value = withSpring(targetValue, SPRING_CONFIG, () => {
        runOnJS(updateIsMonthView)(targetValue !== 0);
      });
    });

  // 주별 달력 스와이프

  const updateWeek = useCallback(direction => {
    setSelectedWeek(prevWeek => {
      const newWeek = prevWeek.map(date => {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() + direction * 7); // 7일 이동
        return newDate;
      });
      return newWeek;
    });

    setSelectedDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + direction * 7);
      return newDate;
    });
  }, []);

  const gestureWeek = Gesture.Pan().onEnd(event => {
    'worklet';
    if (isMonthView) {
      //  월별 보기 상태에서 좌우 스와이프 시 월 변경 (주별 보기로 전환 X)
      if (event.translationX > 50) {
        runOnJS(handlePrevMonth)(); //  왼쪽으로 스와이프 → 이전 달
      } else if (event.translationX < -50) {
        runOnJS(handleNextMonth)(); //  오른쪽으로 스와이프 → 다음 달
      }
      return; // 월별 보기 상태에서는 여기서 끝냄
    }

    //  주별 보기 상태에서 아래로 스와이프할 때만 월별 보기 전환
    if (
      event.translationY > 50 &&
      Math.abs(event.translationY) > Math.abs(event.translationX)
    ) {
      runOnJS(updateIsMonthView)(true);
    } else if (Math.abs(event.translationX) > 50) {
      //  좌우 스와이프 시 주 변경 (주별 보기 상태일 때만)
      if (event.translationX > 50) {
        runOnJS(updateWeek)(-1); //  왼쪽으로 스와이프 → 이전 주
      } else {
        runOnJS(updateWeek)(1); //  오른쪽으로 스와이프 → 다음 주
      }
    }
  });

  const animatedStyle = useAnimatedStyle(() => ({
    height: isMonthView ? CALENDAR_HEIGHT : WEEK_HEIGHT,
  }));
  // 현재 월의 일 수 반환
  const getDaysInMonth = date => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };
  // 현재 월의 첫 번째 요일 반환
  const getFirstDayOfMonth = date => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };
  // 이전 달 이동
  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };
  // 다음 달 이동
  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };
  // 선택한 날짜의 주 정보 가져오기
  const getWeekDays = date => {
    const day = date.getDay();
    const week = [];

    // Get first day of the week (Sunday)
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(date);
      newDate.setDate(date.getDate() - day + i);
      week.push(newDate);
    }

    return week;
  };
  // 날짜 선택 핸들러
  const handleDateSelect = date => {
    setSelectedDate(date);
    const weekDays = getWeekDays(date);
    setSelectedWeek(weekDays);
  };

  // 월별 보기 렌더링
  const renderCalendar = () => {
    if (!isMonthView) {
      return renderWeekView(); //주별 보기 렌더링
    }

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day,
      );
      const isToday = date.toDateString() === selectedDate.toDateString();

      days.push(
        <TouchableOpacity
          key={day}
          style={styles.dayCell}
          onPress={() => handleDateSelect(date)}>
          <View style={[styles.day, isToday && styles.selectedDay]}>
            <Text style={[styles.dayText, isToday && styles.selectedDayText]}>
              {day}
            </Text>
          </View>
        </TouchableOpacity>,
      );
    }

    return days;
  };

  const renderWeekView = () => {
    return selectedWeek.map((date, index) => {
      const isToday = date.toDateString() === selectedDate.toDateString();

      return (
        <TouchableOpacity
          key={index}
          style={styles.dayCell}
          onPress={() => handleDateSelect(date)}>
          <View style={[styles.day, isToday && styles.selectedDay]}>
            <Text style={[styles.dayText, isToday && styles.selectedDayText]}>
              {date.getDate()}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const renderWeekDays = () => {
    return weekDays.map((day, index) => (
      <Text
        key={day}
        style={[
          styles.weekDayText,
          index === 0 && styles.sundayText,
          index === 6 && styles.saturdayText,
        ]}>
        {day}
      </Text>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{width: 40}}>
          {isMonthView && ( // 월별 보기일 때만 화살표 표시
            <TouchableOpacity
              onPress={handlePrevMonth}
              style={styles.arrowButton}>
              <Text style={styles.arrowText}>{'<'}</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.headerText}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Text>

        <View style={{width: 40}}>
          {isMonthView && ( // 월별 보기일 때만 화살표 표시
            <TouchableOpacity
              onPress={handleNextMonth}
              style={styles.arrowButton}>
              <Text style={styles.arrowText}>{'>'}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <GestureDetector gesture={isMonthView ? gesture : gestureWeek}>
        <Animated.View style={[styles.calendarContainer, animatedStyle]}>
          <View style={styles.weekDays}>{renderWeekDays()}</View>
          <View style={styles.calendar}>{renderCalendar()}</View>
        </Animated.View>
      </GestureDetector>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    height: 100,
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

export default Calendar;
