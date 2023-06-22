import React, { useEffect, useState, useRef } from 'react';
import { Alert, FlatList, View, Dimensions, ScrollView } from "react-native";
import { getComplain } from '../apis_auth/apis';
import { connect, useSelector } from 'react-redux';
import ComplainRecords from './ComplainRecords';
import { Modalize } from 'react-native-modalize';
import TextView from './TextView';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import Toast from './Toast';
import CustomProgressDialoge from './CustomProgressDialoge';



export default function ComplainView() {
    const [title, setTitle] = React.useState("Fetching..")
    const getUserData = useSelector(state => state.UserData);
    const [name, setName] = useState(getUserData.UserData.FirstName);
    const [EmployeeId, setEmployeeId] = useState(getUserData.UserData.EmployeeId);
    const [selectedData, setSelectedData] = React.useState()
    const [Complain, setComplain] = React.useState(undefined);
    const [toast, setToast] = useState({ value: "", type: "" });
    const modalizeRef = useRef<Modalize>(null);
    const { height, width } = Dimensions.get('window');
    const [progress, setProgresss] = useState(false)
    const onOpen = () => {

        modalizeRef.current?.open();

    };

    useEffect(() => {
        getComplain(EmployeeId,setProgresss).then((response) => {
            if (response.data.statusCode == 200) {

                setComplain(response.data.message)
            } else {
                alert(response.data.message)

            }

        }).catch(function (error) {
            console.log(error);
        });
    }, []);
    const renderItemGroups = ({ item, index }) => (
        <ComplainRecords
            iconName={"person"}
            EmployeeComplainType={item.EmployeeComplainType}
            ComplainStatus={item.ComplainStatus}
            ResolveBy={item.ResolveBy}
            onPress={() => {
                if (index == 2) {
                    setSelectedData(item)
                    onOpen()
                } else {
                    setSelectedData(item)
                    onOpen()
                }

            }}

        >
        </ComplainRecords>


    );
   

    return (
        <>
            {Complain != undefined && <FlatList
                data={Complain}
                renderItem={renderItemGroups}
                keyExtractor={item => item.id}
                
            />}
            
             <CustomProgressDialoge

                dialogVisible={progress}

                setDialogVisible={setProgresss}

                title={title}

            />

            {(selectedData != undefined && selectedData.ComplainStatus == "Close") ? <Modalize ref={modalizeRef}
                snapPoint={height / 1.8}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ paddingTop: 30, paddingBottom: 30 }}>
                        <TextView text={selectedData.EmployeeComplainType} style={{ color: '#7d7d7d', marginLeft: 20 }}></TextView>
                        <View style={{backgroundColor: '#f1f1f1'}}>
                        <View style={{display:'flex',marginTop:20,justifyContent:'space-between',alignItems:'baseline',alignSelf:'baseline',height:100}}>
                            <TextView text="Resolved By" style={{ fontWeight: 'bold', flex: 1.8, fontSize: 14, color: '#000', marginRight: 20, marginLeft: 20,top:10 }}></TextView>
                            <TextView text="Resolve Comment" style={{ fontWeight: 'bold', flex: 1.8, fontSize: 14, color: '#000', marginRight: 20, marginLeft: 20,top:15 }}></TextView>
                            <TextView text="Complain Date" style={{ fontWeight: 'bold', flex: 1.8, fontSize: 14, color: '#000', marginRight: 20, marginLeft: 20,top:20 }}></TextView>
                            <TextView text="Resolved On" style={{ fontWeight: 'bold', flex: 1.8, fontSize: 14, color: '#000', marginRight: 20, marginLeft: 20,top:25 }}></TextView>

                        </View>
                        <View style={{ display:'flex',bottom:89,alignItems:'flex-end',}}>
                            <TextView text={selectedData.ResolveBy} style={{ flex: 1, fontSize: 14, color: '#000', marginRight: 20, marginLeft: 20}}></TextView>
                            <TextView text={selectedData.ResolveComment} style={{ flex: 1, fontSize: 14, color: '#000', marginRight: 20, marginLeft: 20 ,top:10}}></TextView>
                            <TextView text={selectedData.ComplainDate} style={{ flex: 1, fontSize: 14, color: '#000', marginRight: 20, marginLeft: 20,top:25 }}></TextView>
                            <TextView text={selectedData.ResolveOn} style={{ flex: 1, fontSize: 14, color: '#000', marginRight: 20, marginLeft: 20,top:35 }}></TextView>
                        </View>
                        </View>

                    </View>
                </ScrollView>

            </Modalize>
                :
                // alert("Not Resolve yet!")
                <></>
            }

        </>
        

    )
}