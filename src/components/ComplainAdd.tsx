import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    TextInput, TouchableOpacity
} from 'react-native';
import {
    AppStatusBar,
    HeaderwithoutDialoge,
    TextView,
    DateSelector
} from '.';
import { GlobalStyles, Colors } from '../theme';
import { CustomButton } from '.';
import ClientDueDateComponent from './ClientDueDateComponent';
import DetailReportPicker from './DetailReportPicker';
import { FONTS } from '../theme/Fonts';
import ModalListComponent from './ModalListComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect, useSelector } from 'react-redux';
import { CustomDropdown, FormInputs ,CustomProgressDialoge} from '../components';
import { Complains_status } from '../utilis/RequiredArrays';
import { getUserComplain, ComplainMis } from '../apis_auth/apis';
const { height, width } = Dimensions.get('window');
import Toast from './Toast';
import { useNavigation } from '@react-navigation/native';
import { Priority } from '../utilis/RequiredArrays';

export default function ComplainAdd() {
    const [title, setTitle] = React.useState('Saving Complaint')
    const getUserData = useSelector(state => state.UserData);
    const [name, setName] = useState(getUserData.UserData.FirstName);
    const [EmployeeId, setEmployeeId] = useState(getUserData.UserData.EmployeeId);
    const [status, setstatus] = React.useState('Select Status');
    const [CompTypes, setCompTypes] = React.useState('Select Types');
    const [prio, setprio] = React.useState('Select Types');
    const [Complain, setComplain] = React.useState(Complains_status);
    const [allComplainTypes, setAllComplainTypes] = React.useState("Select Types")
    const [Description, setDescription] = useState();
    const [toast, setToast] = React.useState({ value: "", type: "" });
    const [editable, setEditable] = React.useState(false);
    const [priority, setpriority] = React.useState(Priority);
    const [progress, setProgresss] = useState(false)
    const navigation = useNavigation();
    let setComplainTypes = []



    useEffect(() => {
        getUserComplain().then((response) => {

            response.message.map((item) => {
                setComplainTypes.push({ name: item.EmployeeComplainType, ComplainTypesId: item.EmployeeComplainTypeId })
            })
            setAllComplainTypes([...setComplainTypes])
        })
    }, []);

    const handlePress = (ComplainTypesId, status, prio, name, Description, EmployeeId, setProgresss) => {
        ComplainMis(ComplainTypesId, status, prio, name, Description, EmployeeId, setProgresss).then((res) => {
            if (res.statusCode == 200) {

                setToast({
                    type: "success",
                    message: res?.message,
                });

            } else {
                setToast({
                    type: "error",
                    message: "!Internet Issue",
                });

            }

        }).catch(function (error) {
            console.log(error);
        });
    };


    return (
        <SafeAreaView style={{ flex: 1, padding: 17, backgroundColor: '#fff' }}>
            <View style={styles.formContainer}>
                <View style={styles.logoContainer}>
                    <View style={styles.logoContainerSecondLayer}>
                        <MaterialCommunityIcons
                            name="clipboard-text-outline"
                            color='#fff'
                            size={50} />
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.row2}>
                        <FormInputs

                            value={"Open"}
                            text={'Complain Added By'}
                            value={name}
                            onChangeText={setName}
                            editable={false}>
                        </FormInputs>

                        <FormInputs
                            style={{ position: 'relative', left: 5 }}
                            value={"Open"}
                            text={'Status'}
                            // onChangeText={setName}
                            editable={false}>
                        </FormInputs>
                    </View>
                    <View style={styles.row2}>
                        <CustomDropdown
                            text={"Complain Type"}
                            // required={true}
                            tempdata={allComplainTypes}
                            label={CompTypes.name == undefined ? 'Select Types' : CompTypes.name}

                            type={2}
                            onSelect={(value, underindex) => {
                                setCompTypes(value, allComplainTypes[underindex].name)
                            }}
                        />

                        <CustomDropdown
                            text={"Priority"}
                            // required={true}
                            tempdata={priority}
                            label={prio == undefined ? 'Select Types' : prio}

                            onSelect={async (value, underindex) => {
                                console.log("lolll", underindex)
                                setprio(value, priority[underindex])
                            }}
                        />

                    </View>
                    <View style={styles.row3}>
                    </View>
                    <TextView style={styles.textnote} text="Description"></TextView>
                    <View style={styles.row}>
                        <TextInput
                            style={styles.notes}
                            value={Description}
                            multiline={true}
                            onChangeText={setDescription}
                        ></TextInput>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => { handlePress(CompTypes.ComplainTypesId, status, prio, name, Description, EmployeeId,setProgresss); }}>
                        <TextView style={{ color: '#FFF', alignSelf: 'center' }} text="Submit"></TextView>
                    </TouchableOpacity>


                </ScrollView>
            </View>
            <CustomProgressDialoge

                dialogVisible={progress}

                setDialogVisible={setProgresss}

                title={title}

            />
            <Toast {...toast} onDismiss={() => setToast({ message: "", type: "" })} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: "#fff",
        elevation: 10,
        padding: 20,
        marginTop: 30,
        borderRadius: 10
    },

    inputContainer: {
        marginTop: 13
    },
    textViewStyle: {
        fontSize: 12,
        marginLeft: 10,
        fontFamily: FONTS.FONT_REGULAR
    },
    textContainer: { padding: 10, borderWidth: 1 },
    logoContainer: {
        alignItems: 'center'
    },
    logoContainerSecondLayer: {
        backgroundColor: Colors.parrotGreenColor,
        elevation: 10,
        width: 80,
        height: 80,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginTop: '-19%'
    }, row2: {
        marginTop: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 20
    },
    row3: {
        marginBottom: -25
    }, notes: {
        borderRadius: 10, borderWidth: 1, borderColor: '#cdcdcd', marginBottom: 30, textAlignVertical: 'top',
        marginTop: 10, height: 100, padding: 10, width: width / 1.3
    }, textnote: { color: '#7d7d7d', fontSize: 12, marginTop: 10, marginLeft: 20 },
    button: {
        backgroundColor: Colors.parrotGreenColor, width: width / 2.5, height: 60, justifyContent: 'center', borderRadius: 10,
        elevation: 10, alignSelf: 'center', marginTop: 5,
    }
})