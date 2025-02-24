import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import Svg, {Path} from 'react-native-svg';
import {RootStackParamList} from '../../App';

type NavigationProps = StackNavigationProp<RootStackParamList>;

const AddBtn: React.FC = ({}) => {
  const navigation = useNavigation<NavigationProps>();
  // 애니메이션 값들
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const backgroundColor = useSharedValue('#92e0a6');
  // 버튼 애니메이션 스타일
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}, {rotate: `${rotation.value}deg`}],
    backgroundColor: backgroundColor.value,
  }));

  // 버튼 클릭 이벤트
  const handlePress = () => {
    // 1. 버튼 크기 커졌다가 줄어드는 애니메이션
    scale.value = withSequence(
      withTiming(1.1, {duration: 100}),
      withTiming(1, {duration: 100}),
    );
    navigation.push('WriteMeal');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.fabTouchable} onPress={handlePress}>
        <Animated.View style={[styles.fabContainer, animatedStyle]}>
          <Svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round">
            <Path d="M12 5v14M5 12h14" />
          </Svg>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  fabTouchable: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddBtn;
