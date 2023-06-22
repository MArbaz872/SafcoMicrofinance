import React, { memo } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { TextView } from '.';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import * as Progress from 'react-native-progress';

const ComplainRecords = ({
  onPress,
  EmployeeComplainType,
  ComplainStatus,
  ResolveBy,
  iconName,
  type,
  progressVisible,
  alreadySynced,
  icons=false,

}) => {
  console.log('in in====>',ComplainStatus)
  return (

  

      <View
        style={{
          flexDirection: 'row',
          padding: 20,
          margin: 10,
          alignItems: 'center',
          backgroundColor: '#fff',
          borderRadius: 10,
          elevation: 5,
        }}>
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
          <View style={{}}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                borderColor: '#cdcdcd',
                borderWidth: 1, justifyContent: 'center'
              }}>
              
                <Fontisto
                  name={iconName}
                  color={Colors.parrotGreenColor}
                  size={20}
                  style={{ alignSelf: 'center' }}
                />
              
            </View>
          </View>

          <View style={{ paddingLeft: 10, flex: 1 }}>
            <View>
              <TextView type={"headingMid"} text={EmployeeComplainType} style={{ fontSize: 16, color: '#3d3d3d' }} />
            </View>
            <View>
              <TextView type={"headingMid"} text={ComplainStatus} style={{ fontSize: 16, color: '#3d3d3d' }} />
            </View>
            <View>
              <TextView type={"text"} text={ResolveBy} style={{ fontSize: 12, color: '#3d3d3d' }} />
            </View>


          </View>
          <View style={{marginTop:10}}>
         {
         progressVisible ?
         
        //  <Progress.Pie progress={0.4} size={50} />
         <Progress.Circle color={Colors.parrotGreenColor} size={30} indeterminate={true} />
         :
         <TouchableOpacity 
         onPress={onPress}
         >
          <View
            style={{ 
            justifyContent: 'center',
            padding: 10,
             borderRadius: 20 }}>
            {ComplainStatus =="Close" ?
             <Ionicons
             name={"chevron-down-circle-outline"}
             color={ComplainStatus=="Close"?"#cdcdcd":Colors.parrotGreenColor}
             size={30}
             style={{ alignSelf: 'center' }}
           />
                :
              <></>
                }
          </View>
          </TouchableOpacity>}
          </View>
        </View>
       {ComplainStatus == "Close" ? <View style={{position:'absolute',top:-1,right:-2,
        borderBottomLeftRadius:15,backgroundColor:Colors.parrotGreenColor}}>
          <TextView style={{fontSize:11,color:'#FFF',padding:5}}
           text={"Closed"}></TextView>
        </View>
        :
        <View style={{position:'absolute',top:-1,right:-2,
        borderBottomLeftRadius:15,backgroundColor:Colors.parrotGreenColor}}>
          <TextView style={{fontSize:11,color:'#FFF',padding:5}}
           text={"Not Resolve yet!"}></TextView>
        </View>}

      </View>

   

  );
};
const styles = StyleSheet.create({
  SyncButton: {
    position: 'absolute', bottom: 10, right: 100,
    justifyContent: 'center'
  },
  row: { flexDirection: "row", alignItems: 'center' },
  card: { height: 80, borderRadius: 5, elevation: 3, marginTop: 10, marginBottom: 10 },
  updateButton: {
    position: 'absolute', bottom: -1, right: 1,
    justifyContent: 'center', borderTopLeftRadius: 10, padding: 10,
    backgroundColor: Colors.parrotGreenColor
  },
  bottomButton: {
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 50,
    width: 70,
    height: 30,
    elevation: 5,
    flexDirection: 'column',
    justifyContent: 'center',
  }
});
export default memo(ComplainRecords);
