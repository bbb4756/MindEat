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

const chevron_black = require('../../Assets/Header/chevron_black.png');
const down_arrow = require('../../Assets/Header/down_arrow_full.png');
const down_arrow2 = require('../../Assets/Header/down_arrow.png');

const WriteMealScreen: React.FC = ({}) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string | null;
  }>({});

  const categories = {
    '식사 분류': ['아침', '점심', '저녁', '간식', '야식'],
    '식사 상대': ['혼자', '친구', '연인', '가족', '직장동료', '기타'],
    '식사 장소': ['집', '회사', '식당', '학교', '길거리', '기타'],
    포만감: ['허기짐', '적당함', '배부름', '매우 배부름'],
    '식사 만족도': ['매우아쉬움', '아쉬움', '무난함', '만족', '매우만족'],
    '식사 감정': [
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
    '특이 증상': [
      '칼로리 강박',
      '폭식하기',
      '극단적 단식',
      '씹고 뱉기',
      '과한 운동',
      '변비약 복용',
      '토하기',
      '식이량 제한',
      '스트레스 상황',
    ],
  };

  const navigation = useNavigation();

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

  const handleOptionSelect = (category: string, option: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [category]: prev[category] === option ? null : option,
    }));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 20}}>
      {/* 헤더 */}
      <View style={[styles.header, Platform.OS == 'ios' && {marginTop: 60}]}>
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
        style={styles.imageContainer}
        onPress={handleSelectImage}>
        {image ? (
          <Image source={{uri: image}} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>사진 추가 (선택)</Text>
        )}
      </TouchableOpacity>

      {/* 식사 시간 선택 */}
      <View style={styles.timeSection}>
        <Text style={styles.sectionTitle}>식사 시간*</Text>
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
      {Object.entries(categories).map(([category, options]) => (
        <View key={category} style={styles.section}>
          <Text style={styles.sectionTitle}>{category}</Text>
          <View style={styles.buttonGroup}>
            {options.map(option => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  selectedOptions[category] === option && styles.selectedOption,
                ]}
                onPress={() => handleOptionSelect(category, option)}>
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {/* 메모 기록 */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, {marginBottom: 5}]}>식사 메모</Text>
        <TextInput
          style={styles.input}
          placeholder="당시의 감정이나 느낀점을 간단히 적어주세요."
          multiline
        />
      </View>

      {/* 저장 버튼 */}
      <TouchableOpacity style={styles.saveButton} activeOpacity={0.8}>
        <Text style={styles.saveButtonText}>저장</Text>
      </TouchableOpacity>
    </ScrollView>
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
    padding: 15,
    backgroundColor: '#fff',
  },
  chevron: {width: 20, height: 20},
  downArrow: {width: 15, height: 15},
  emptyView: {
    width: 20,
    height: 30,
  },
  backButton: {
    fontSize: 20,
    color: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 350,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  imagePlaceholder: {
    color: '#999',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  timeSection: {
    width: '100%',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  section: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  sectionTitle: {fontFamily: 'NanumSquareB', fontSize: 16},
  toggle: {
    alignSelf: 'flex-end',
  },
  timeButton: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#ddd',
    alignSelf: 'flex-start',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonGroup: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginRight: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  saveButton: {
    backgroundColor: '#92e0a6',
    padding: 15,
    alignItems: 'center',
    margin: 15,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  selectedOption: {backgroundColor: '#888'},
});

export default WriteMealScreen;
