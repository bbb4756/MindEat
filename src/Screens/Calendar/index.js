import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';

const CALENDAR_HEIGHT = 380;
const WEEK_HEIGHT = 100;
const SPRING_CONFIG = {damping: 20};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isMonthView, setIsMonthView] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState([]);

  // Animation values
  const translateY = useSharedValue(0);
  const context = useSharedValue(0);

  const updateIsMonthView = useCallback(value => {
    setIsMonthView(value);
  }, []);

  // Gesture handlers
  const handlePanStart = () => {
    context.value = translateY.value;
  };

  const handlePanUpdate = event => {
    translateY.value = event.translationY + context.value;
  };

  const handlePanEnd = () => {
    const isSwipeSignificant = Math.abs(translateY.value) > CALENDAR_HEIGHT / 4;

    // 애니메이션 완료 후 view 변경되도록 수정
    if (isSwipeSignificant) {
      const targetValue = isMonthView ? CALENDAR_HEIGHT - WEEK_HEIGHT : 0;
      translateY.value = withSpring(targetValue, SPRING_CONFIG, () => {
        runOnJS(updateIsMonthView)(!isMonthView);
      });
      animateToTarget(targetValue);
    } else {
      const returnValue = isMonthView ? 0 : CALENDAR_HEIGHT - WEEK_HEIGHT;
      translateY.value = withSpring(returnValue, SPRING_CONFIG);
    }

    if (isSwipeSignificant) {
      runOnJS(updateIsMonthView)(!isMonthView);
    }
  };

  const getTargetValue = isSwipeSignificant => {
    if (isSwipeSignificant) {
      return isMonthView ? CALENDAR_HEIGHT - WEEK_HEIGHT : 0;
    }
    return isMonthView ? 0 : CALENDAR_HEIGHT - WEEK_HEIGHT;
  };

  const animateToTarget = targetValue => {
    translateY.value = withSpring(targetValue, SPRING_CONFIG);
  };

  const gesture = Gesture.Pan()
    .onStart(handlePanStart)
    .onUpdate(handlePanUpdate)
    .onEnd(handlePanEnd);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
      height: interpolate(
        translateY.value,
        [0, CALENDAR_HEIGHT - WEEK_HEIGHT],
        [CALENDAR_HEIGHT, WEEK_HEIGHT],
      ),
    };
  });

  const getDaysInMonth = date => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = date => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

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

  const handleDateSelect = date => {
    setSelectedDate(date);
    const weekDays = getWeekDays(date);
    setSelectedWeek(weekDays);
  };

  const renderCalendar = () => {
    if (!isMonthView) {
      return renderWeekView();
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
        <TouchableOpacity onPress={handlePrevMonth} style={styles.arrowButton}>
          <Text style={styles.arrowText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Text>
        <TouchableOpacity onPress={handleNextMonth} style={styles.arrowButton}>
          <Text style={styles.arrowText}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      <GestureDetector gesture={gesture}>
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
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
