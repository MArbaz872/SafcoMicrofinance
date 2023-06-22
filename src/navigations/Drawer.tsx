import React from 'react';
import { Image, StyleSheet, View, Alert, Pressable, Dimensions, PermissionsAndroid } from 'react-native';
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { Icons, Colors, GlobalStyles } from '../theme';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import DrawerContent from './DrawerContent';
import Screens from './Screens';
const {
  interpolateNode,
  Extrapolate
} = Animated;
// screens

const Drawer = createDrawerNavigator();

export default () => {
  const [progress, setProgress] = React.useState(new Animated.Value(0));
  const scale = interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  const borderRadius = interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = { borderRadius, transform: [{ scale }] };

  return (
    <LinearGradient style={{ flex: 1 }} colors={[Colors.primary, Colors.darkGreenColor]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
      <Drawer.Navigator
        // hideStatusBar
        drawerType="slide"
        overlayColor="transparent"
        drawerStyle={styles.drawerStyles}
        contentContainerStyle={{ flex: 1 }}
        drawerContentOptions={{
          activeBackgroundColor: 'transparent',
          activeTintColor: 'white',
          inactiveTintColor: 'white',
        }}
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
        drawerContent={props => {
          setProgress(props.progress);
          return <DrawerContent {...props} />;
        }}>
        <Drawer.Screen name="Screens">
          {props => <Screens {...props} style={animatedStyle} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    // shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
    // overflow: 'scroll',
    // borderWidth: 1,
  },
  drawerStyles: { flex: 1, width: '50%', backgroundColor: 'transparent' },
  drawerItem: { flexDirection: 'row', alignItems: 'center', marginLeft: 15, marginTop: 15 },
  drawerLabel: { color: 'white', marginLeft: 20, alignSelf: 'center', marginTop: 5 },
  circle: {
    borderRadius: 100,
    height: 40, width: 40,
    justifyContent: 'center'
  },
  circleimg: {
    borderRadius: 100, marginLeft: 0, marginTop: 50,
    height: 60, width: 60, backgroundColor: '#FFF',
    justifyContent: 'center'
  },
  logout: {
    height: 30, width: 100,
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.white, alignSelf: 'center', marginTop: 5,
    borderRadius: 20, justifyContent: 'center'
  },

});