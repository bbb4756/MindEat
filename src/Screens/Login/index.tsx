import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import {wp, rw, rh} from '../../Common/resize';
import {SafeAreaView} from 'react-native-safe-area-context';

const main_image = require('../../Assets/Login/login_image.jpg');
const main_image2 = require('../../Assets/Login/login_image2.jpg');
const kakaotalk_icon = require('../../Assets/Login/kakaotalk_icon.png');
const naver_icon = require('../../Assets/Login/naver_icon.png');
const google_icon = require('../../Assets/Login/google_icon.png');
const x_icon = require('../../Assets/Login/x_icon.png');

// SNS 버튼 정보
const snsButtons = [kakaotalk_icon, naver_icon, google_icon, x_icon];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: wp(24),
    paddingVertical: wp(30),
  },

  textContainer: {
    marginTop: rh(10),
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  imageContainer: {width: rw(90), height: wp(300)},
  mainImageStyle: {width: rw(90), height: wp(260)},
  description: {
    width: 300,
    fontSize: 30,
    height: 100,
    fontFamily: 'NanumSquareR',
    lineHeight: wp(40),
    textAlign: 'left',
    color: '#333',
    marginBottom: 20,
  },
  logoText: {
    width: 300,
    fontSize: wp(44),
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
    marginBottom: wp(20),
  },

  snsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: 'purple',
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
    fontSize: wp(20),
    fontWeight: 'bold',
    color: 'white',
  },
});
const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* 텍스트 및 로고 */}
      <View style={styles.textContainer}>
        <Text style={styles.description}>
          내 마음 들여다보는{'\n'}식사 일기
        </Text>
        <Text style={styles.logoText}>
          MindEat<Text style={styles.dot}>.</Text>
        </Text>
      </View>
      {/* 이미지 박스 */}
      <View style={styles.imageContainer}>
        <Image
          source={main_image2}
          style={styles.mainImageStyle}
          resizeMode="cover"
        />
      </View>

      {/* SNS 로그인 */}
      <Text style={[styles.snsText]}>SNS 계정으로 간편 가입하기</Text>
      <View style={styles.snsContainer}>
        {snsButtons.map((sns, index) => (
          <TouchableOpacity key={index} style={[styles.snsButton]}>
            <Image
              source={sns}
              style={{width: wp(46), height: wp(46)}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Login;
