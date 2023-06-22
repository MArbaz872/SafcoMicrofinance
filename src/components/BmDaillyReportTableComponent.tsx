import React, { memo } from 'react'
import { Text, View, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import { GlobalStyles, Colors } from '../theme'
import { 
    AppStatusBar, 
    HeaderwithoutDialoge, 
    TextView,
} from '../components';



const BmDaillyReportTableComponent = ({item})=>{
    return(
        <View>
        <View style={styles.tableContainer}>
        <View style={styles.rowTwo}>
            <View style={styles.columnOne}>
            <TextView style={styles.columnOneText} text={'Station Name'} />
            </View>
            <View style={styles.columnTwo}>
            <TextView  style={styles.columnTwoText} text={item.StationName} />
            </View>
        </View>
        <View style={styles.rowOne}>
            <View style={styles.columnOne}>
            <TextView style={styles.columnOneText} text={'Employee Name'} />
            </View>
            <View style={styles.columnTwo}>
            <TextView style={styles.columnTwoText} text={item.EmployeeName} />
            </View>
        </View>
        <View style={styles.rowTwo}>
            <View style={styles.columnOne}>
            <TextView style={styles.columnOneText} text={'RepaymentAmount'} />
            </View>
            <View style={styles.columnTwo}>
            <TextView style={styles.columnTwoText} text={item.RepaymentAmount} />
            </View>
        </View>
    </View>
   <View style={{flexDirection:'row',alignItems:'center'}}>
       <TriangleDown/>
       <TriangleDown/>
       <TriangleDown/>
       <TriangleDown/>
       <TriangleDown/>
       <TriangleDown/>
       <TriangleDown/>
       <TriangleDown/>
       <TriangleDown/>
       <TriangleDown/>
       <TriangleDown/>
       <TriangleDown/>
       <TriangleDown/>
       <TriangleDown/>
       <TriangleDown/>
       <TriangleDown/>
       <TriangleDown/>
       <TriangleDown/>
       <TriangleDown/>
       <TriangleDown/>
       <TriangleDown/>
       <TriangleDown/>


   </View>
    </View>
    )
}
const Triangle = ({style}) => {
    return <View style={[styles.triangle,style]} />;
  };
  const TriangleDown = () => {
    return <Triangle style={styles.triangleDown} />;
  };
const styles = StyleSheet.create({
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 20,
        borderRightWidth: 20,
        borderBottomWidth: 20,//elevation:10,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "#f1f1f1",
      },
      triangleDown: {
        transform: [{ rotate: "180deg" }],
      },
    tableContainer:{
        marginTop:30,
        borderWidth:1,
        backgroundColor:'#FFF',
        borderColor:"#cdcdcd",
        borderRadius:5
    },
    rowOne:{
        flexDirection:'row',
        //borderBottomColor:'#cdcdcd',borderBottomWidth:1
        
    },
    rowTwo:{
        flexDirection:'row',
        //borderBottomColor:'#cdcdcd',borderBottomWidth:1,
        backgroundColor:'#f1f1f1'
    },
    columnOne:{
        padding:10,
        flex:1,

        //borderRightWidth:1,borderRightColor:'#cdcdcd',
        alignItems:'flex-start'
    },
    columnOneText:{
        fontSize:12,color:'#7d7d7d',
        fontWeight:'bold',
    },
    columnTwo:{
        flex:1,
        alignItems:'flex-start',
        padding:10
    },
    columnTwoText:{
        fontSize:12
    }
})

export default memo(BmDaillyReportTableComponent)