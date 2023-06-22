import React from 'react'
import { Text, View, SafeAreaView, StyleSheet, ScrollView, TextInput, Alert } from 'react-native'
import { GlobalStyles, Colors } from '../../theme';
import RNFS from 'react-native-fs';

import DailyReportTableComponent from '../../components/DaillyReportTableComponent';
import BmDailyReportTableComponent from '../../components/BmDaillyReportTableComponent';
import {
    AppStatusBar,
    HeaderwithoutDialoge,
    TextView,
} from '../../components';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { connect, useSelector } from 'react-redux';

const Dashbordreport = ({ route }) => {
    const [report, setReports] = React.useState(route.params.report.data);
    const [orignal, setOrignal] = React.useState(route.params.report.data);
    const [progress,setProgress]=React.useState(false)
    const AppFolder = 'Safco_reactapp'; 
    const getUserData = useSelector((state) => state.UserData);
    const [UserData, setUserData] = React.useState(undefined);
// console.log("Report===>"+ JSON.stringify(report))
    React.useEffect(() => {
        setUserData(getUserData.UserData)  
    }, [])
    //console.log(route.params.report.LoanDetails)
    const handleSearch = (text) => {
        try {
            if (text) {
                const newData = orignal.filter((item) => {
                    return (
                        item.LoanId.toLowerCase().indexOf(text.toLowerCase()) >= 0
                        || item.CustomerName.toLowerCase().indexOf(text.toLowerCase()) >= 0
                        || item.MobileNo.toLowerCase().indexOf(text.toLowerCase()) >= 0
                    )
                }


                    //  var itemData   = item
                    //   ? item.LoanId.toUpperCase()
                    //   : ''.toUpperCase();


                    // const textData = text.toUpperCase();
                    // return itemData.indexOf(textData) > -1;
                );
                setReports(newData);
                // setSearch(text);
            } else {
                setReports(orignal);
                // setSearch(text);
            }
        } catch (error) {
            //console.log(error)
        }

    }

    return (
        <>
            <AppStatusBar></AppStatusBar>
            <View style={GlobalStyles.row}>
                <HeaderwithoutDialoge Theme={Colors} back={true}></HeaderwithoutDialoge>
            </View>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', padding: 20 ,top:20}}>
                { getUserData.UserData.EmployeeTypeName == "Credit Officer"  && <FlatList
                    data={report}
                    renderItem={({ item }) => (
                        <DailyReportTableComponent item={item} />
                    )}
                    keyExtractor={item => item.SrNo}
                />}
                { getUserData.UserData.EmployeeTypeName == "Branch Manager"  && <FlatList
                    data={report}
                    renderItem={({ item }) => (
                        <BmDailyReportTableComponent item={item} />
                    )}
                    keyExtractor={item => item.SrNo}
                />}
            </SafeAreaView>
             
<ProgressDialog
    visible={progress}
    title="Downloading Report..."
    message="Please, wait..."
    activityIndicatorColor={Colors.parrotGreenColor}
/>
        </>
    )
}

export default Dashbordreport;