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
import calendarStyles from './styles';
const CALENDAR_HEIGHT = 380;
const WEEK_HEIGHT = 100;
const SPRING_CONFIG = {damping: 20, stiffness: 150};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isMonthView, setIsMonthView] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState([]);
  const translateY = useSharedValue(0);
  const contextY = useSharedValue(0);
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
      ('worklet');
      contextY.value = translateY.value; // 기존 위치 저장
    })
    .onUpdate(event => {
      'worklet';
      translateY.value = contextY.value + event.translationY;
    })
    .onEnd(event => {
      'worklet';

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
        newDate.setDate(date.getDate() + direction * 7);
        return newDate;
      });

      return newWeek;
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
    const week = [];
    const selectedMonth = date.getMonth(); // 선택한 날짜의 월
    const selectedYear = date.getFullYear();

    let firstDayOfWeek = new Date(date);
    firstDayOfWeek.setDate(date.getDate() - date.getDay()); // 해당 주의 일요일 찾기

    for (let i = 0; i < 7; i++) {
      let newDate = new Date(firstDayOfWeek);
      newDate.setDate(firstDayOfWeek.getDate() + i);

      // 주별 보기에서도 항상 현재 월을 유지 (이전 달 or 다음 달로 넘어가지 않게 조정)
      if (
        newDate.getMonth() !== selectedMonth ||
        newDate.getFullYear() !== selectedYear
      ) {
        newDate = new Date(selectedYear, selectedMonth, newDate.getDate());
      }

      week.push(newDate);
    }

    return week;
  };

  // 날짜 선택 핸들러
  const handleDateSelect = date => {
    setSelectedDate(date);
    const weekDays = getWeekDays(date);

    if (isMonthView) {
      setCurrentDate(date); // 월별 보기에서 선택한 날짜를 기준으로 월 변경
    }

    setSelectedWeek(weekDays); // 항상 7개의 날짜가 나오도록 수정
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
      days.push(<View key={`empty-${i}`} style={calendarStyles.dayCell} />);
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
          style={calendarStyles.dayCell}
          onPress={() => handleDateSelect(date)}>
          <View
            style={[calendarStyles.day, isToday && calendarStyles.selectedDay]}>
            <Text
              style={[
                calendarStyles.dayText,
                isToday && calendarStyles.selectedDayText,
              ]}>
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
          style={calendarStyles.dayCell}
          onPress={() => handleDateSelect(date)}>
          <View
            style={[calendarStyles.day, isToday && calendarStyles.selectedDay]}>
            <Text
              style={[
                calendarStyles.dayText,
                isToday && calendarStyles.selectedDayText,
              ]}>
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
          calendarStyles.weekDayText,
          index === 0 && calendarStyles.sundayText,
          index === 6 && calendarStyles.saturdayText,
        ]}>
        {day}
      </Text>
    ));
  };

  return (
    <SafeAreaView style={calendarStyles.container}>
      <View style={calendarStyles.header}>
        <View style={{width: 40}}>
          {isMonthView && ( // 월별 보기일 때만 화살표 표시
            <TouchableOpacity
              onPress={handlePrevMonth}
              style={calendarStyles.arrowButton}>
              <Text style={calendarStyles.arrowText}>{'<'}</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={calendarStyles.headerText}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Text>

        <View style={{width: 40}}>
          {isMonthView && ( // 월별 보기일 때만 화살표 표시
            <TouchableOpacity
              onPress={handleNextMonth}
              style={calendarStyles.arrowButton}>
              <Text style={calendarStyles.arrowText}>{'>'}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <GestureDetector gesture={isMonthView ? gesture : gestureWeek}>
        <Animated.View
          style={[calendarStyles.calendarContainer, animatedStyle]}>
          <View style={calendarStyles.weekDays}>{renderWeekDays()}</View>
          <View style={calendarStyles.calendar}>{renderCalendar()}</View>
        </Animated.View>
      </GestureDetector>
    </SafeAreaView>
  );
};

export default Calendar;
