import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import {BackHandler} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {RootStackParamList} from '../../../App';
import {StackNavigationProp} from '@react-navigation/stack';

import {wp, rh, rw} from '../../Common/resize';

type NavigationProps = StackNavigationProp<RootStackParamList>;

const chevron_black = require('../../Assets/Header/chevron_black.png');
const down_arrow = require('../../Assets/Header/down_arrow_full.png');
const down_arrow2 = require('../../Assets/Header/down_arrow.png');

const WriteMealScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [selectedMealType, setSelectedMealType] = useState<string | null>(null);
  const [selectedCompanion, setSelectedCompanion] = useState<string | null>(
    null,
  );
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedSatiety, setSelectedSatiety] = useState<string | null>(null);
  const [selectedSatisfaction, setSelectedSatisfaction] = useState<
    string | null
  >(null);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [selectedSpecial, setSelectedSpecial] = useState<string | null>(null);

  const isFormComplete =
    selectedMealType &&
    selectedCompanion &&
    selectedLocation &&
    selectedSatiety &&
    selectedSatisfaction &&
    selectedEmotion;

  const handleSelect = (category: string, value: string) => {
    switch (category) {
      case 'mealType':
        setSelectedMealType(value);
        break;
      case 'companion':
        setSelectedCompanion(value);
        break;
      case 'location':
        setSelectedLocation(value);
        break;
      case 'satiety':
        setSelectedSatiety(value);
        break;
      case 'satisfaction':
        setSelectedSatisfaction(value);
        break;
      case 'emotion':
        setSelectedEmotion(value);
        break;
      case 'special':
        setSelectedSpecial(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  // 날짜 형식 변환: YYYY년 MM월 DD일
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // 시간 형식 변환: AM HH시 MM분
  const formatTime = (time: Date) => {
    return time.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }); // 공백 정리
  };

  const handleSelectImage = async (): Promise<void> => {
    try {
      const options: ImageLibraryOptions = {
        mediaType: 'photo',
      };

      const response = await launchImageLibrary(options);

      if (
        response.didCancel ||
        !response.assets ||
        response.assets.length === 0
      ) {
        return;
      }

      const imageUri = response.assets[0].uri ?? null; // undefined 방지 (null 대체 가능)

      setImage(imageUri);
    } catch (error) {
      console.error('이미지 선택 중 오류 발생:', error);
    }
  };

  const renderOptions = (
    category: string,
    options: string[],
    selectedValue: string | null,
  ) => (
    <View style={styles.buttonGroup}>
      {options.map(option => (
        <TouchableOpacity
          key={option}
          style={[
            styles.optionButton,
            selectedValue === option && {backgroundColor: '#888'},
          ]}
          onPress={() => handleSelect(category, option)}>
          <Text>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const saveInfo = () => {
    console.log('hihi');
    //백엔드 저장 프로세스
    navigation.navigate('CalendarMain');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* 헤더 */}
      <View style={[styles.header]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={chevron_black}
            style={styles.chevron}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setDatePickerOpen(true)}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.headerTitle}>{formatDate(date)}</Text>
          <Image
            source={down_arrow}
            style={[
              styles.downArrow,
              Platform.OS === 'android' && {marginTop: 5},
            ]}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.emptyView} />
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 20}}>
        {/* 날짜 선택 Picker */}
        <DatePicker
          modal
          locale="ko"
          open={datePickerOpen}
          date={date}
          mode="date"
          title="날짜 선택" // 모달 상단 제목 변경
          cancelText="취소" // 취소 버튼 한글화
          confirmText="확인" // 확인 버튼 한글화
          onConfirm={selectedDate => {
            setDatePickerOpen(false);
            setDate(selectedDate);
          }}
          onCancel={() => setDatePickerOpen(false)}
        />

        {/* 이미지 추가 */}
        <TouchableOpacity
          style={[styles.imageContainer]}
          onPress={handleSelectImage}>
          {image ? (
            <Image source={{uri: image}} style={styles.image} />
          ) : (
            <Text style={styles.imagePlaceholder}>사진 추가 (선택)</Text>
          )}
        </TouchableOpacity>

        {/* 식사 시간 선택 */}
        <View style={styles.timeSection}>
          <Text style={styles.sectionTitle}>식사 시간 *</Text>
          <TouchableOpacity
            style={styles.timeButton}
            onPress={() => setTimePickerOpen(true)}>
            <Text style={{marginRight: 6}}>{formatTime(time)}</Text>
            <Image
              source={down_arrow2}
              style={[
                styles.downArrow,
                Platform.OS === 'android' && {marginTop: 5},
              ]}
            />
          </TouchableOpacity>
        </View>

        {/* 시간 선택 Picker */}
        <DatePicker
          modal
          locale="ko"
          open={timePickerOpen}
          date={time}
          mode="time"
          title="시간 선택"
          cancelText="취소"
          confirmText="확인"
          onConfirm={selectedTime => {
            setTimePickerOpen(false);
            setTime(selectedTime);
          }}
          onCancel={() => setTimePickerOpen(false)}
        />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>식사 분류*</Text>
          {renderOptions(
            'mealType',
            ['아침', '점심', '저녁', '간식', '야식'],
            selectedMealType,
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>식사 상대*</Text>
          {renderOptions(
            'companion',
            ['혼자', '친구', '연인', '가족', '직장동료', '기타'],
            selectedCompanion,
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>식사 장소*</Text>
          {renderOptions(
            'location',
            ['집', '회사', '식당', '학교', '길거리', '기타'],
            selectedLocation,
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>포만감*</Text>
          {renderOptions(
            'satiety',
            ['허기짐', '적당함', '배부름', '매우 배부름'],
            selectedSatiety,
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>식사 만족도*</Text>
          {renderOptions(
            'satisfaction',
            ['매우아쉬움', '아쉬움', '무난함', '만족', '매우만족'],
            selectedSatisfaction,
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>식사 후 감정*</Text>
          {renderOptions(
            'emotion',
            [
              '무난함',
              '짜증남',
              '행복함',
              '뿌듯함',
              '우울함',
              '즐거움',
              '죄책감',
              '두려움',
              '무기력',
              '불쾌함',
              '후회됨',
            ],
            selectedEmotion,
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>식사 특이 사항*</Text>
          {renderOptions(
            'special',
            [
              '칼로리 강박',
              '폭식하기',
              '극단적 단식',
              '씹고 뱉기',
              '과한 운동',
              '변비약 복용',
              '토하기',
              '식이량 제한',
              '스트레스 상황',
              '없음',
            ],
            selectedSpecial,
          )}
        </View>
        {/* 메모 기록 */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {marginBottom: 5}]}>
            식사 메모
          </Text>
          <TextInput
            style={styles.input}
            placeholder="당시의 감정이나 느낀점을 간단히 적어주세요."
            multiline
          />
        </View>

        {/* 저장 버튼 */}
        <TouchableOpacity
          onPress={() => saveInfo()}
          style={[
            styles.saveButton,
            {backgroundColor: isFormComplete ? '#92e0a6' : '#ccc'},
          ]}
          activeOpacity={isFormComplete ? 0.8 : 1}
          disabled={!isFormComplete}>
          <Text style={styles.saveButtonText}>저장</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: wp(15),
    backgroundColor: '#fff',
    width: rw(100),
  },
  chevron: {width: wp(20), height: wp(20)},
  downArrow: {width: wp(15), height: wp(15)},
  emptyView: {
    width: wp(20),
    height: wp(30),
  },
  backButton: {
    fontSize: wp(20),
    color: '#333',
  },
  headerTitle: {
    fontSize: wp(18),
    fontWeight: 'bold',
    marginRight: wp(10),
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: wp(350),
    margin: wp(10),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp(10),
  },
  imagePlaceholder: {
    color: '#999',
  },
  image: {
    width: rw(100),
    height: rh(100),
    borderRadius: 10,
  },
  timeSection: {
    width: '100%',
    paddingHorizontal: wp(15),
    backgroundColor: '#fff',
    marginBottom: wp(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  section: {
    padding: wp(15),
    backgroundColor: '#fff',
    marginBottom: wp(10),
  },
  sectionTitle: {fontFamily: 'NanumSquareB', fontSize: wp(16)},
  toggle: {
    alignSelf: 'flex-end',
  },
  timeButton: {
    marginVertical: wp(10),
    padding: wp(10),
    backgroundColor: '#ddd',
    alignSelf: 'flex-start',
    borderRadius: wp(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonGroup: {
    marginTop: wp(10),
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp(10),
  },
  optionButton: {
    padding: wp(10),
    backgroundColor: '#ddd',
    borderRadius: wp(5),
    marginRight: wp(5),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: wp(10),
    borderRadius: wp(5),
    marginTop: wp(5),
  },
  saveButton: {
    backgroundColor: '#92e0a6',
    padding: wp(15),
    alignItems: 'center',
    margin: wp(15),
    borderRadius: wp(5),
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  selectedOption: {backgroundColor: '#888'},
});

export default WriteMealScreen;
