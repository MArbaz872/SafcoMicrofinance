import React, {memo} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  Text,
  Dimensions,
  Platform,
  Modal,
  StyleSheet,
  Alert,
  Pressable,
  FlatList
} from 'react-native';
import {TextInput, TouchableOpacity,TouchableWithoutFeedback} from 'react-native-gesture-handler'
import {connect, useSelector} from 'react-redux';
import {Search, TextView} from '.';
import {Colors, GlobalStyles} from '../theme';
import { Card } from 'react-native-paper';
const {height, width} = Dimensions.get('window');
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { BlurView } from '@react-native-community/blur';
import { FONTS } from '../theme/Fonts';

const ModalListComponent = ({style,stylesfrom,text,required,tempdata,label, onSelect,type=1,}) => {
const[filterModal,setfilterModal]=React.useState(false);
const[data,setData]=React.useState(tempdata);


const searchFilterFunction = (text) => {
  // Check if searched text is not blank
  if (text) {
    const newData = tempdata.filter(
      function (item) {
        var itemData;
        if(type==2){
          itemData   = item
          ? item.label.toUpperCase()
          : ''.toUpperCase();
        }else{
          itemData = item
          ? item.toUpperCase()
          : ''.toUpperCase();
        }
       
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
    });
    setData(newData);
    // setSearch(text);
  } else {
    setData(tempdata);
    // setSearch(text);
  }
};
  return (<View>
    
    <TextView type={'formLabel'} text={text.length>20?text.substring(0,20)+"...":text} 
    
      style={{color:'#737373',marginLeft:10}}></TextView>
   <View style={[stylesfrom,styles.textInput,{height:30}]}>
   {required && <View style={{position:'absolute',right:1,top:-5}}>
        <Text style={{color:'#FF0000'}}>*</Text>
      </View>}
      <Pressable
      onPress={()=>{
        setData([...tempdata])
        setfilterModal(true)
      }}
      style={[styles.dropdownstyles,{flexDirection:'row',alignItems:'center'}]}
      >
    <TextView type={'formLabel'} style={{
      flex:1, 
      backgroundColor:'#fff',
      color:'#737373',
      //height:55,
      paddingLeft:0,marginTop:5,
      //marginBottom:33,
      //borderBottomColor:'#cdcdcd',
      //borderBottomWidth:1,
      flexDirection:'row',
      alignItems:'center',
      width:width/2.5,borderRadius:3
      }} text={label} />
      <MaterialCommunityIcons name="menu-down"  
         color={'#000'} size={26}></MaterialCommunityIcons>
      </Pressable>
      </View>
   { filterModal && (
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={filterModal}
        onRequestClose={() => {
          setfilterModal(false);
          //console.log('Modal has been closed.');
        }}>
        <View style={styles.modal}>
        
          <BlurView
            style={styles.absolute}
            //   viewRef={this.state.viewRef}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
          <View style={{width:'100%', flexDirection: 'column', alignItems: 'center' }}>
          <Pressable 
            onPress={()=>{setfilterModal(false)}}
            style={{alignSelf:'flex-end'}}>
              <MaterialCommunityIcons
              name={'close'}
              style={{color:Colors.red}}
              size={26}
              ></MaterialCommunityIcons>
            </Pressable>
            <Card style={styles.modalcardall}>
              <View style={{ flex: 1, padding: 10, }}>
               {/* //your content */}
               {/* <TextView text="hello"></TextView> */}
              <View style={{flexDirection:'row',alignItems:'center', 
              borderBottomWidth:0.7, borderBottomColor:Colors.darkGreenColor,
              marginBottom:30,
              width:'85%', alignSelf:'center'}}>
                <View style={{flex:1}}>
                  <TextInput 
                  onChangeText={(value)=>{
                    searchFilterFunction(value);
                  }}
                  placeholder={'Search..'}
                  style={{backgroundColor:'#FFF'}} />
                </View>
                <View style={{ paddingTop:0, marginTop:0}}>
                <View style={styles.circle}>
      <EvilIcons name="search" 
      style={{alignSelf: 'center'}}
      color={Colors.parrotGreenColor} size={26} />
      

      </View>
                </View>
              </View>
               <FlatList
        data={data.sort((a, b) => type==2? a.label.localeCompare(b.label) : a.localeCompare(b) )}
        renderItem={({ item, index, separators }) => (
          <Pressable 
            style={{padding:12, borderBottomColor:'#f0f5f1', borderBottomWidth:1}}
            onPress = {()=>{
              setfilterModal(false)
              onSelect(item, tempdata.indexOf(type==2?item.label:item) )}}
            >
                <Text>{type==2?item.label:item}</Text>
            </Pressable>
        )}
      />
              </View>
            </Card>
            
 
        
          </View>
        </View>
      </Modal>
    )}
  </View>
   

  );
};
const styles = StyleSheet.create({
  shareview: { flexDirection: 'row', alignItems: 'center', margin: 5 },
  modalcardtopright: {
    borderRadius: 20,
    height: height / 10,
    width: width / 4,
    elevation: 20,
  },
  dropdownstyles:{marginLeft:10,flex:1},
  modalcardall: {
    borderRadius: 20,
    marginTop:20,
    height: height / 1.3,
    width: width / 1.3,
    elevation: 20,
  },
  text1: { fontSize: 14, color: '#8E8E93', fontFamily: FONTS.FONT_REGULAR },
  text2: { fontSize: 20, color: '#000', fontFamily: FONTS.FONT_SEMI_BOLD },
  flexrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    position: 'absolute',
  },
  circle: {height:30,width:30,borderRadius:100,marginLeft:0,marginRight:10,
    justifyContent:'center',backgroundColor:'#f1f1f1'},
  name: {
    fontFamily: FONTS.FONT_REGULAR,
    fontSize: 14,
  },
  name2: {
    fontFamily: FONTS.FONT_BOLD,
    fontSize: 24,
  },
  editext: { marginTop: 80, marginLeft: 20 },

  textInput:{
      backgroundColor:'#fff',
      // height:30,
      paddingLeft:0,
      marginTop:1,
      marginBottom:0,
      borderBottomColor:'#cdcdcd',
      borderBottomWidth:1,
      flexDirection:'row',
      alignItems:'center',
      width:'100%',
      borderRadius:3
    },
  alltext: {
    marginRight: 10,
    fontFamily: FONTS.FONT_REGULAR,
    fontSize: 14,
  },
  historytext: {
    fontFamily: FONTS.FONT_MEDIUM,
    fontSize: 18,
  },
  historyblock: {
    justifyContent: 'center',
    marginTop: 20,
    padding: 20,
    backgroundColor: '#F8F8F9',
    borderRadius: 30,
    width: Dimensions.get('screen').width,
  },

  modal: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default memo(ModalListComponent);
