# RN navigation 및 calendar 구현 과제

## 🎥 구현 화면

![Image](https://github.com/user-attachments/assets/fdead607-5bbd-4de2-8525-f834dfd998e2)

## 📌 Enviroment

> - node : v18.20.4
> - rn : 0.73.0
> - JDK : openjdk17
> - etc : macOS, ruby 3.1.0, xcode 16.0, Android Studio Koala Feature Drop(24.1.2)

#### ✅ : 구현 완료

## 💡 요구 사항 및 구현한 기능

> #### Level 1. 앱 하단에 Bottom Tabs Navigator를 추가하고 4개(홈/ 캘린더/라이브러리/ 마이페이지)의 탭을 추가, 4개의 스크린을 생성하여 각 탭과 연결 ✅
>
> - @react-navigation/native, @react-navigation/bottom-tabs 라이브러리 사용하여 구현하였음.

> #### Level 2. 캘린더 탭에 외부 캘린더 라이브러리를 이용하지 않고 캘린더 컴포넌트를 제작하기
>
> - 캘린더에 현재 월을 출력하고 오늘 날짜를 아래 이미지와 같이 구현 하시오. ✅
> - 상단 좌우 화살표 버튼 클릭 시 전월, 익월을 캘린더에 출력 하시오. ✅
> - 캘린더 상에 특정 날짜를 선택하면 해당 날짜에 원을 표시 하시오. 마지막으로 선택된 날짜만 표시해야 함. ✅

> #### Level 3. react-native-reanimated, react-native-gesture-handler 라이브러리를 이용해서 제스처 이벤트가 발생하면 아래와 같이 캘린더의 형태가 월 캘린더에서 주 캘린더로, 주 캘린더에서 다시 월 캘린더로 변환 가능하도록 구현 하시오
>
> - react-native-reanimated, react-native-gesture-handler 라이브러리를 이용하기 ✅
> - 월 캘린더에서 주 캘린더로, 주 캘린더에서 다시 월 캘린더로 변환 가능하도록 구현하기 ✅

## 💡 추가로 구현한 기능

> 1. 주 캘린더에서 변환된 상태로, 좌우 스와이핑 시에 주(week) 캘린더 변화시키기
> 2. 주 캘린더 상태에서 좌우 스와이프로 월, 연도가 변할 시, 캘린더 상단의 월, 연도도 변화해서 보이도록 구현
> 3. 주 캘린더일 땐, arrow button(<,>) 숨기기

## 📍 아쉬운 점

> - 월 <-> 주 캘린더 전환 시 매끄러운 애니메이션을 구현하지 못함

## 💥 Trouble Shooting

> ### 1. react-native-reanimated, react-native-gesture-handler 라이브러리 설치 후, 프로젝트 빌드 실패 현상
>
> #### 💡 원인 : 버전 차이에 따른 라이브러리 호환성 문제
>
> #### ✅ 해결 방법
>
> 1.  react-native version을 0.77.0에서 0.76.0으로 downgrade
> 2.  react-native-gesture-handler 2.14.0로 downgrade
> 3.  react-native-reanimated 3.7.1로 downgrade

> ### 2. Android는 정상적으로 동작되나, IOS 시뮬레이터에서만 프로젝트 빌드 실패하는 현상 (CompileC error, failed to build ios project-code 65, A valid Xcode project file 등)
>
> #### 💡 원인: 종속성 파일이 제대로 설치되지 않았거나 캐시 파일이 남아 있어서 발생
>
> #### ✅ 해결 방법
>
> 1. xcode에서 수동 빌드
> 2. Pods파일, podfile.lock 삭제
>
> 3. 캐시 삭제 및 종속성 재설치
>
> ```bash
> cd ios
> pod deintegrate
> pod cache clean --all
> pod install --verbose --no-repo-update
> ```

## 💡 느낀점

> #### 캘린더 라이브러리 없이 javascript로 캘린더를 구현하면서, 많은 문제에 봉착했습니다. Date 객체로 월말, 연도 계산, 이전/다음 달 처리 등의 복잡한 날짜 로직을 직접 구현하는 것과 월 달력에서 주 달력으로 변화할 때의 날짜 계산이 까다로웠습니다.
>
> #### 그리고 여러 로직이 겹칠 수록 발생하는 다양한 버그들을 해결하는 데에 어려움을 겪었습니다. 하지만 문제들을 해결하면서 평소 라이브러리에 과도하게 의존했던 제 자신을 돌아보게 되었습니다. 또한, 제가 개발을 좋아했던 까닭은 복잡한 문제들을 하나씩 해결하면서 느끼는 성취감때문이었다는 것을 다시 한 번 상기했습니다.
>
> #### 이번 경험은 단순히 과제 수행을 넘어, 프론트엔드 개발자로서 제 시야를 한층 성장시키고 방향성을 잡을 수 있는 계기가 되었습니다.
