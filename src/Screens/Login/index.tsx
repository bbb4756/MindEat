import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
  },
  textContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  description: {
    width: 300,
    fontSize: 30,
    height: 100,
    // fontFamily: 'KOROADB',

    textAlign: 'left',
    color: '#333',
    marginBottom: 20,
  },
  logoText: {
    width: 300,
    fontSize: 44,
    fontFamily: 'KOROADB',
    // fontStyle: 'italic',
    color: '#32CD32',
  },
  dot: {
    color: '#32CD32',
  },
  snsText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginTop: 300,
  },
  snsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  snsButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  snsIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
const Login = () => {
  return (
    <View style={styles.container}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity style={styles.backButton}>
        <Svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <Path d="M15 18l-6-6 6-6" />
        </Svg>
      </TouchableOpacity>

      {/* 텍스트 및 로고 */}
      <View style={styles.textContainer}>
        <Text style={styles.description}>
          내 마음 들여다보는{'\n'}식사 일기
        </Text>
        <Text style={styles.logoText}>
          MindEat<Text style={styles.dot}>.</Text>
        </Text>
      </View>

      {/* SNS 로그인 */}
      <Text style={styles.snsText}>SNS 계정으로 간편 가입하기</Text>
      <View style={styles.snsContainer}>
        {snsButtons.map((sns, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.snsButton, {backgroundColor: sns.color}]}>
            {sns.icon}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// SNS 버튼 정보
const snsButtons = [
  {
    name: 'kakao',
    color: '#FEE500',
    icon: <Text style={styles.snsIcon}>💬</Text>, // 카카오톡 말풍선 이모지
  },
  {
    name: 'naver',
    color: '#03C75A',
    icon: <Text style={styles.snsIcon}>N</Text>, // 네이버 N
  },
  {
    name: 'apple',
    color: '#000000',
    icon: (
      <Svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <Path d="M18.7 13.4c-.1-2.2 1.8-3.3 1.9-3.4-1-1.5-2.5-1.7-3-1.7-1.3-.1-2.6.8-3.2.8s-1.7-.8-2.8-.8c-1.4 0-2.8.8-3.6 2-.1.1-1 1.5-1 3.5 0 2.7 2 5.2 2.7 6.2.7 1 1.5 2 2.7 2s1.5-.7 2.8-.7 1.6.7 2.8.7c1.2 0 2-1 2.7-2 .5-.8.7-1.6.8-1.6 0 0-1.5-.6-1.6-3zM15.6 4.6c.7-.9 1.1-2 1-3-.9.1-2 .6-2.6 1.4-.6.7-1.1 1.9-1 3 .9.1 1.9-.5 2.6-1.4z" />
      </Svg>
    ),
  },
  {
    name: 'google',
    color: '#4285F4',
    icon: <Text style={styles.snsIcon}>G</Text>, // Google G
  },
];

export default Login;
