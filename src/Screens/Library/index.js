import React from 'react';
import commonStyles from '../../Common/style';
import {View, Text, SafeAreaView} from 'react-native';
const Library = () => {
  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.mainViewStyle}>
        <Text style={commonStyles.textStyle}>Library</Text>
      </View>
    </SafeAreaView>
  );
};

export default Library;

// import React, {useState, useRef} from 'react';
// import {View, PanResponder, Dimensions} from 'react-native';
// import Svg, {Path} from 'react-native-svg';

// const Library = () => {
//   const [paths, setPaths] = useState([]);
//   const currentPath = useRef('');
//   const isDrawing = useRef(false);

//   const screenWidth = Dimensions.get('window').width;
//   const screenHeight = Dimensions.get('window').height;

//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onMoveShouldSetPanResponder: () => true,
//     onPanResponderGrant: evt => {
//       isDrawing.current = true;
//       const {locationX, locationY} = evt.nativeEvent;
//       currentPath.current = `M${locationX},${locationY}`;
//     },
//     onPanResponderMove: evt => {
//       if (isDrawing.current) {
//         const {locationX, locationY} = evt.nativeEvent;
//         currentPath.current += ` L${locationX},${locationY}`;
//       }
//     },
//     onPanResponderRelease: () => {
//       if (currentPath.current) {
//         setPaths(prevPaths => [...prevPaths, currentPath.current]);
//         currentPath.current = '';
//       }
//       isDrawing.current = false;
//     },
//   });

//   const clearDrawing = () => {
//     setPaths([]);
//   };

//   return (
//     <View
//       style={{flex: 1, backgroundColor: 'white'}}
//       {...panResponder.panHandlers}>
//       <Svg width={screenWidth} height={screenHeight}>
//         {paths.map((path, index) => (
//           <Path
//             key={index}
//             d={path}
//             stroke="black"
//             strokeWidth={2}
//             fill="none"
//           />
//         ))}
//         {currentPath.current ? (
//           <Path
//             d={currentPath.current}
//             stroke="black"
//             strokeWidth={2}
//             fill="none"
//           />
//         ) : null}
//       </Svg>
//     </View>
//   );
// };

// export default Library;
