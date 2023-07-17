import React, { useState } from 'react';
import { SafeAreaView, View, Image, Dimensions, StyleSheet, Pressable, FlatList, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextView } from '../components';
import { AppStatusBar, HeaderwithoutDialoge } from '../components';
import { GlobalStyles, Colors } from '../theme'
import UserDetailTable from '../components/UserDetailTable';
import { getUserDetailForZM } from '../apis_auth/apis';
import CustomerRiskProfileTabel from '../components/CustomerRiskProfileTable';
import { useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';
import { getDownloadedDataforRegionalById } from '../sqlite/sqlitedb';
const { width, height } = Dimensions.get('window')
import FastImage from 'react-native-fast-image'
const UserDetailForZM = (props) => {
    const { item } = props.route.params;



    const [customerInfomation, setCustomerInformation] = React.useState({});
    const [loanInformation, setLoanInformation] = React.useState({});
    const [povertyScoreCard, setPovertyScoreCard] = React.useState({});
    const [customerGurantees, setCustomerGurantees] = React.useState([]);
    const [customerFamilyMember, setCustomerFamilyMember] = React.useState([]);
    const [customerDocuments, setCustomerDocuments] = React.useState({});
    const [customerAssets, setCustomerAssets] = React.useState({});
    const [error, setError] = React.useState(false)
    const array_index = 0
    const [loader, setLoader] = useState(false)
    const GETQuestions = useSelector(state => state.QuestionsReducer.questionArray);

    const _onImageLoadError = (event) => {
        setError(true)
    }




    React.useEffect(() => {
        showUserData();

    }, [])

    const showUserData = async () => {
        setLoader(true)
        getDownloadedDataforRegionalById(item.CustomerGroupId)
            .then((datax) => {
                var parser = JSON.parse(datax[0]?.GroupData)
                 //console.log(data?.LoanInformation[0])
                var indexer = parser?.Customers.findIndex(x => x.CustomerInformation?.NicNumber === item.NicNumber)
                var data = parser?.Customers[indexer];
                
                // console.log('===>>',data)
                
                setCustomerInformation(data?.CustomerInformation)
                setLoanInformation(data?.LoanInformation[0])
                setPovertyScoreCard(data?.PovertyScoreCard)
                setCustomerGurantees(data?.CustomerGurantees)
                setCustomerFamilyMember(data?.CustomerFamilyMember)
                setCustomerDocuments(data?.CustomerDocuments)
                setCustomerAssets(data?.CustomerAssets)
                setLoader(false)
            }).catch((error) => {
                console.log(error)
                setLoader(false)
            })
    }
    const getUserDetailForZM_api = async (NicNumber) => {
        setLoader(true)
        getUserDetailForZM(NicNumber).then((data) => {

            //console.log('==>>>',data.CustomerInformation)

            setCustomerInformation(data.CustomerInformation)
            setLoanInformation(data.LoanInformation[0])
            setPovertyScoreCard(data.PovertyScoreCard)
            setCustomerGurantees(data.CustomerGurantees)
            setCustomerFamilyMember(data.CustomerFamilyMember)
            setCustomerDocuments(data.CustomerDocuments)
            setCustomerAssets(data.CustomerAssets)
            setLoader(false)
        }).catch((error) => {
            setLoader(false)
        })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

            <AppStatusBar></AppStatusBar>

            <View style={GlobalStyles.row}>

                <HeaderwithoutDialoge Theme={Colors} back={true}></HeaderwithoutDialoge>

                <TextView
                    type={'mini_heading22'}
                    style={{ paddingHorizontal: 30, marginTop: 55, fontSize: 15, }}
                    text="User Detail"></TextView>

            </View>

            {/* <View style={{flex:1}}> */}

            {loader ?

                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <LottieView
                        style={{ height: 120, width: 100, alignSelf: 'center' }}
                        source={require('../assests/anim/spinnerallcolor.json')}
                        // colorFilters={[{
                        //   keypath: "button",
                        //   color: "#F00000"
                        // },{
                        //   keypath: "Sending Loader",
                        //   color: "#F00000"
                        // }]}
                        autoPlay
                        loop
                    />
                </View>

                : <ScrollView
                    showsHorizontalScrollIndicator={false}

                //contentContainerStyle={{marginBottom:10}}
                >

                    <View style={styles.dataContainer}>

                        <View style={styles.imageContainer}>

                            {error == false ?
                                <Image
                                    onError={_onImageLoadError}
                                    source={customerInfomation?.ProfileImage == "" ? require('../assests/images/placeholder.png') : { uri: customerInfomation.ProfileImage }}
                                    style={{ width: '100%', height: height / 3.5, resizeMode: 'contain' }}
                                />
                                :
                                <Image
                                    source={require('../assests/images/placeholder.png')}
                                    style={{ width: '100%', height: height / 3.5, resizeMode: 'contain' }}
                                />
                            }

                        </View>

                        <UserDetailTable
                            labelOne={'Firstname'}
                            valueOne={customerInfomation?.FirstName}
                            labelTwo={'Lastname'}
                            valueTwo={customerInfomation?.LastName}
                        />

                        <UserDetailTable
                            labelOne={'Guradian/Father Name'}
                            valueOne={customerInfomation?.Guardian}
                            labelTwo={'Gender'}
                            valueTwo={customerInfomation?.Gender}
                            rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'Date Of Birth'}
                            valueOne={customerInfomation?.DOB}
                            labelTwo={'Family Number'}
                            valueTwo={customerInfomation?.FamilyNumber}
                        //rowtwo={true} 
                        />

                        <UserDetailTable
                            labelOne={'Mother Name'}
                            valueOne={customerInfomation?.MotherName}
                            labelTwo={''}
                            rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'Cnic Type'}
                            valueOne={customerInfomation?.CnicType}
                            labelTwo={'Cnic Number'}
                            valueTwo={customerInfomation?.NicNumber}
                        //rowtwo={true} 
                        />

                        <UserDetailTable
                            labelOne={'Nic Expiry'}
                            valueOne={customerInfomation?.NICExpiry}
                            labelTwo={'Nic Issue'}
                            valueTwo={customerInfomation?.NICIssue}
                            rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'Is Deceased'}
                            valueOne={customerInfomation?.IsDeceased}
                            labelTwo={'Is Disabled'}
                            valueTwo={customerInfomation?.IsDisabled}
                        //rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'Is BISP Beneficiary'}
                            valueOne={customerInfomation?.Bisp}
                            labelTwo={'Station'}
                            valueTwo={customerInfomation?.StationName}
                            rowtwo={true}
                        />

                        <View style={{ marginTop: 10, alignItems: 'center', marginBottom: 10 }}>

                            <TextView text={"Customer Additional Information"} style={{ textDecorationLine: 'underline', }} />

                        </View>

                        <UserDetailTable
                            labelOne={'Marital Status'}
                            valueOne={customerInfomation?.MaritalStatus}
                            labelTwo={'Religion'}
                            valueTwo={customerInfomation?.Religion}
                        //rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'House Status'}
                            valueOne={customerInfomation?.HouseStatus}
                            labelTwo={'House Type'}
                            valueTwo={customerInfomation?.HouseType}
                            rowtwo={true}
                        />

                        <View style={{ marginTop: 10, alignItems: 'center', marginBottom: 10 }}>

                            <TextView text={"Customer Address"} style={{ textDecorationLine: 'underline' }} />

                        </View>

                        <View style={{ marginTop: 10, alignItems: 'center', marginBottom: 10 }}>

                            <TextView text={"Permanent Address"} style={{ textDecorationLine: 'underline', fontSize: 12 }} />

                        </View>

                        <UserDetailTable
                            labelOne={'Country'}
                            valueOne={customerInfomation?.Address_Permanent_Country}
                            labelTwo={'State/Provence'}
                            valueTwo={customerInfomation?.Address_Permanent_State}
                        //rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'District'}
                            valueOne={customerInfomation?.Address_Permanent_District_Name}
                            labelTwo={'Taluka'}
                            valueTwo={customerInfomation?.Address_Permanent_Taluka_Name}
                            rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'UC'}
                            valueOne={customerInfomation?.Address_Permanent_UC_Name}
                            labelTwo={'Mohalla/Village'}
                            valueTwo={customerInfomation?.Address_Permanent_Mohalla_Village}
                        //rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'City'}
                            valueOne={customerInfomation?.Address_Permanent_City}
                            labelTwo={'Address '}
                            valueTwo={customerInfomation?.Address_Permanent_Address}
                            rowtwo={true}
                        />

                        <View style={{ marginTop: 10, alignItems: 'center', marginBottom: 10 }}>

                            <TextView text={"Present Address"} style={{ textDecorationLine: 'underline', fontSize: 12 }} />

                        </View>

                        <UserDetailTable
                            labelOne={'Country '}
                            valueOne={customerInfomation?.Address_Present_Country}
                            labelTwo={'State/Provence'}
                            valueTwo={customerInfomation?.Address_Present_State}
                        //rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'District'}
                            valueOne={customerInfomation?.Address_Present_District_Name}
                            labelTwo={'Taluka'}
                            valueTwo={customerInfomation?.Address_Present_Taluka_Name}
                            rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'UC'}
                            valueOne={customerInfomation?.Address_Present_UC_Name}
                            labelTwo={'Mohalla/Village'}
                            valueTwo={customerInfomation?.Address_Present_Mohalla_Village}
                        //rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'City'}
                            valueOne={customerInfomation?.Address_Present_City}
                            labelTwo={'Address '}
                            valueTwo={customerInfomation?.Address_Present_Address}
                        //rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'Number of years at present address'}
                            valueOne={customerInfomation?.Address_Present_NumberOfYears}
                            labelTwo={''}
                            valueTwo={''}
                            rowtwo={true}
                        />

                        <View style={{ marginTop: 10, alignItems: 'center', marginBottom: 10 }}>

                            <TextView text={"Contact Information"} style={{ textDecorationLine: 'underline' }} />

                        </View>

                        <UserDetailTable
                            labelOne={'Phone Number '}
                            valueOne={customerInfomation?.PhoneNumber}
                            labelTwo={'Mobile Number'}
                            valueTwo={customerInfomation?.MobileNumber}
                        //rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'Email Address'}
                            valueOne={customerInfomation?.EmailAddress}
                            labelTwo={''}
                            rowtwo={true}
                            valueTwo={""}
                        />

                        <UserDetailTable
                            labelOne={'Current Status'}
                            valueOne={customerInfomation?.clientCurrentStatus}
                            labelTwo={'Client Disease'}
                            valueTwo={customerInfomation?.ClientDisease}
                        //rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'Client Health Tests'}
                            valueOne={customerInfomation?.clientHealthTests}
                            labelTwo={''}
                            valueTwo={''}
                            rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'Next Of Kin Name'}
                            valueOne={customerInfomation?.NextOfKinName}
                            labelTwo={'Next Of Kin NICNumber'}
                            valueTwo={customerInfomation?.NextOfKinCNIC}
                        //rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'Next Of Kin Relation'}
                            valueOne={customerInfomation?.NextOfKinRelation}
                            labelTwo={''}
                            valueTwo={''}
                            rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'Is the borrower politically exposed Person?'}
                            valueOne={customerInfomation?.Answer1}
                            labelTwo={''}
                        //rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'Is the borrower non-resident (oversees)?'}
                            valueOne={customerInfomation?.Answer2}
                            labelTwo={''}
                            rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'Is the borrower Beneficial owner?'}
                            valueOne={customerInfomation?.Answer3}
                            labelTwo={' '}
                        //rowtwo={true}
                        />


                        <View style={{ marginTop: 10, alignItems: 'center', marginBottom: 10 }}>

                            <TextView text={"Customer Employment"} style={{ textDecorationLine: 'underline' }} />

                        </View>


                        <UserDetailTable
                            labelOne={'Is Customer Employed?'}
                            valueOne={''}
                            labelTwo={''}
                            rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'Job Card / Salary Slip'}
                            colOneImage={customerInfomation?.JobImagePath}
                            labelTwo={'E-Verisys Verfication'}
                            colTwoImage={customerInfomation?.VerficationImagePath}
                            //rowtwo={true}
                            imageRow={true}
                        />


                        <View style={{ marginTop: 10, alignItems: 'center', marginBottom: 10 }}>

                            <TextView text={"Customer Family Member Information"} style={{ textDecorationLine: 'underline' }} />

                        </View>

                        {customerFamilyMember.map((item, index) => {

                            return (
                                <>

                                    <UserDetailTable
                                        labelOne={'Full Name'}
                                        valueOne={item.FullName}
                                        labelTwo={'NIC Number'}
                                        valueTwo={item.NICNumber}
                                        rowtwo={true}
                                    />

                                    <UserDetailTable
                                        labelOne={'Gender'}
                                        valueOne={item.Gender}
                                        labelTwo={'Education'}
                                        valueTwo={item.Education}
                                    //rowtwo={true}
                                    />

                                    <UserDetailTable
                                        labelOne={'Source Of Income'}
                                        valueOne={item.SourceOfIncome}
                                        labelTwo={'Relation'}
                                        valueTwo={item.RelationshipWithCustomer}
                                        rowtwo={true}
                                    />

                                    <UserDetailTable
                                        labelOne={'Age'}
                                        valueOne={item.Age}
                                        labelTwo={'Monthly Earning'}
                                        valueTwo={item.MonthlyEarning}
                                    //rowtwo={true}
                                    />

                                    <UserDetailTable
                                        labelOne={'Business Address'}
                                        valueOne={item.BusinessAddress}
                                        rowtwo={true}
                                    />

                                </>
                            )


                        })}
                        <View style={{ marginTop: 10, alignItems: 'center', marginBottom: 10 }}>

                            <TextView text={"Customer Assets"} style={{ textDecorationLine: 'underline' }} />

                        </View>

                        {customerAssets.length>0 && customerAssets.map((item,index)=>{
                            return(
                                <View>
                                <UserDetailTable
                                labelOne={'Asset Name'}
                                valueOne={item?.asset?.AssetName}
                                labelTwo={'Asset Quantity'}
                                valueTwo={item?.asset?.AssetQuantity}
                                rowtwo={true}
                            />
    
                            <UserDetailTable
                                labelOne={'Asset Value'}
                                valueOne={item?.asset?.AssetValue}
                                labelTwo={'Asset Owner'}
                                valueTwo={item?.asset?.AssetOwner}
                            //rowtwo={true}
                            />
                            {item?.images?.length>0 && item?.images?.map((item,index)=>{
                                return(
                                    <View>
                                        <Image
                                        style={{resizeMode:'contain',height:height/2,width:width/1.1,alignSelf:'center',margin:10}}
                                        source={{ uri: item }}
                                        ></Image>
                                        </View>
                                )
                            })}
                            </View>
                            )
                        })}

                        <View style={{ marginTop: 10, alignItems: 'center', marginBottom: 10 }}>

                            <TextView text={"Customer Gurantees"} style={{ textDecorationLine: 'underline' }} />

                        </View>

                        {customerGurantees.length > 0 &&  customerGurantees?.map((item, index) => {
                            return (
                                <View>
                                    <UserDetailTable
                                        labelOne={'Full Name'}
                                        valueOne={item?.Address}
                                        labelTwo={'NIC Number'}
                                        valueTwo={item?.NICNumber}
                                        rowtwo={true}
                                    />

                                    <UserDetailTable
                                        labelOne={'Address '}
                                        valueOne={item?.Address}
                                        labelTwo={'Contact Number '}
                                        valueTwo={item?.ContactNumber}
                                    //rowtwo={true}
                                    />

                                    <UserDetailTable
                                        labelOne={'Job Type '}
                                        valueOne={item?.JobType}
                                        labelTwo={'Job Description'}
                                        valueTwo={item?.JobDescription
                                        }
                                        rowtwo={true}
                                    />

                                    <UserDetailTable
                                        labelOne={'Business Address'}
                                        valueOne={item?.BusinessAddress}
                                        labelTwo={'Status'}
                                        valueTwo={item?.Status}
                                    //rowtwo={true}
                                    />

                                    <UserDetailTable
                                        labelOne={'Full Name'}
                                        valueOne={item?.FullName}
                                        labelTwo={'NIC Number'}
                                        valueTwo={item?.NICNumber}
                                        rowtwo={true}
                                    />

                                    <UserDetailTable
                                        labelOne={'Address '}
                                        valueOne={item?.Address}
                                        labelTwo={'Contact Number '}
                                        valueTwo={item?.ContactNumber}
                                    //rowtwo={true}
                                    />

                                    <UserDetailTable
                                        labelOne={'Job Type '}
                                        valueOne={item?.JobType}
                                        labelTwo={'Job Description'}
                                        valueTwo={item?.JobDescription}
                                        rowtwo={true}
                                    />

                                    <UserDetailTable
                                        labelOne={'Business Address'}
                                        valueOne={item?.BusinessAddress}
                                        labelTwo={'Status'}
                                        valueTwo={item?.Status}
                                    //rowtwo={true}
                                    />
                                    <UserDetailTable
                                        labelOne={'Full Name'}
                                        valueOne={item?.FullName}
                                        labelTwo={'NIC Number'}
                                        valueTwo={item?.NICNumber}
                                        rowtwo={true}
                                    />

                                    <UserDetailTable
                                        labelOne={'Address '}
                                        valueOne={item?.Address}
                                        labelTwo={'Contact Number '}
                                        valueTwo={item?.ContactNumber}
                                    //rowtwo={true}
                                    />

                                    <UserDetailTable
                                        labelOne={'Job Type '}
                                        valueOne={item?.JobType}
                                        labelTwo={'Job Description'}
                                        valueTwo={item?.JobDescription}
                                        rowtwo={true}
                                    />

                                    <UserDetailTable
                                        labelOne={'Business Address'}
                                        valueOne={item?.BusinessAddress}
                                        labelTwo={'Status'}
                                        valueTwo={item?.Status}
                                    //rowtwo={true}
                                    />
                                </View>
                            )

                        })}

                        <View style={{ marginTop: 10, alignItems: 'center', marginBottom: 10 }}>

                            <TextView text={"Customer Loan Information"} style={{ textDecorationLine: 'underline' }} />

                        </View>

                        <UserDetailTable
                            labelOne={'CustomerId'}
                            valueOne={loanInformation?.CustomerId}
                            labelTwo={'Is Individual'}
                            valueTwo={loanInformation?.IndividualLoans}
                            rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'Loan Id'}
                            valueOne={loanInformation?.LoanId}
                            labelTwo={'Loan Status'}
                            valueTwo={loanInformation?.LoanStatus}
                        //rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'Loan Term'}
                            valueOne={loanInformation?.LoanTerm}
                            labelTwo={'Loan Type'}
                            valueTwo={loanInformation?.LoanSubType}
                            rowtwo={true}
                        />


                        <UserDetailTable
                            labelOne={'Loan Sub Type'}
                            valueOne={loanInformation?.LoanSubType}
                            labelTwo={'Loan Application Date'}
                            valueTwo={loanInformation?.LoanApplicationDate}
                        //rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'Requested Loan Amount'}
                            valueOne={loanInformation?.RequestedLoanAmount}
                            labelTwo={'Personal Capital In Business'}
                            valueTwo={loanInformation?.PersonalCapitalInBusiness}
                            rowtwo={true}
                        />
                        <UserDetailTable
                            labelOne={'Amount Required For Business'}
                            valueOne={loanInformation?.AmountRequiredForBusiness}
                            labelTwo={'Approved Loan Amount'}
                            valueTwo={loanInformation?.ApprovedLoanAmount}
                        //rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'Top Up Loan'}
                            valueOne={loanInformation?.TopUpLoan}
                            labelTwo={'Debt Ratio'}
                            valueTwo={customerInfomation?.DebtRatio}
                            rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'Repayment Frequency'}
                            valueOne={loanInformation?.RepaymentFrequency}
                            labelTwo={'Total Assets'}
                            valueTwo={loanInformation?.TotalAssets}
                        //rowtwo={true}
                        />

                        <View style={{ marginTop: 10, alignItems: 'center', marginBottom: 10 }}>

                            <TextView text={"Additional Business Information"} style={{ textDecorationLine: 'underline', fontSize: 12 }} />

                        </View>

                        <UserDetailTable
                            labelOne={'Expected Monthly Income From Business'}
                            valueOne={loanInformation?.ExpectedMonthlyIncomeFromBusiness}
                            labelTwo={'Income From Sales	'}
                            valueTwo={loanInformation?.IncomeFromSales}
                            rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'Rental Income / Any Other Income	'}
                            valueOne={loanInformation?.AnyOtherRentalIncome}
                            labelTwo={'Monthly Income	'}
                            valueTwo={loanInformation?.MonthlyIncome}
                        //rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'Monthly Raw / Business Material Purchasing		'}
                            valueOne={loanInformation?.RawMaterialPurchasing}
                            labelTwo={'Utility Expense'}
                            valueTwo={loanInformation?.UtilityExpense}
                            rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'Salaries Wages And Labour	'}
                            valueOne={loanInformation?.SalariesAndLabourCharges}
                            labelTwo={'Other Expense'}
                            valueTwo={loanInformation?.AnyOtherExpense}
                        //rowtwo={true}
                        />


                        <UserDetailTable
                            labelOne={'Monthly Business Expense'}
                            valueOne={loanInformation?.MonthlyExpense}
                            labelTwo={'Any Other Monthly Liability'}
                            valueTwo={loanInformation?.AnyOtherExpense}
                            rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'Monthly Installment From Lender'}
                            valueOne={loanInformation?.MonthlyInstallmentFromLender}
                            labelTwo={'Monthly Business Liability	'}
                            valueTwo={loanInformation?.Liability}
                        //rowtwo={true}
                        />


                        <UserDetailTable
                            labelOne={'Business Address'}
                            valueOne={loanInformation?.BusinessAddress}
                            labelTwo={'Existing Business'}
                            valueTwo={loanInformation?.ExistingBusiness}
                            rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'Experience In Business	'}
                            valueOne={loanInformation?.ExperienceInBusiness}
                            labelTwo={''}
                            valueTwo={''}
                        //rowtwo={true}
                        />


                        <View style={{ marginTop: 10, alignItems: 'center', marginBottom: 10 }}>

                            <TextView text={"House Hold Cash Flow"} style={{ textDecorationLine: 'underline', fontSize: 12 }} />

                        </View>

                        <UserDetailTable
                            labelOne={'Income From Other Income	'}
                            valueOne={'nhn mila'}
                            labelTwo={'Other Family Income'}
                            valueTwo={loanInformation?.OtherFamilyIncome}
                            rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'Any Other Income/Rental Income (If Any)	'}
                            valueOne={loanInformation?.AnyOtherRentalIncome}
                            labelTwo={'Household Monthly Income	'}
                            valueTwo={loanInformation?.Household_MonthlyIncome}
                        //rowtwo={true}
                        />


                        <UserDetailTable
                            labelOne={'Kitchen / Household Expense	'}
                            valueOne={loanInformation?.HouseholdExpense}
                            labelTwo={'Children Education Expense	'}
                            valueTwo={loanInformation?.ChildrenEducationExpense}
                            rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'Other Utility Expenses	'}
                            valueOne={loanInformation?.OtherUtilityExpense}
                            labelTwo={'Any Other Expense	'}
                            valueTwo={loanInformation?.AnyOtherExpense}
                        //rowtwo={true}
                        />


                        <UserDetailTable
                            labelOne={'Household Monthly Expense	'}
                            valueOne={loanInformation?.Household_onthlyExpense}
                            labelTwo={'Monthly Household Liability	'}
                            valueTwo={loanInformation?.HouseholdLiability}
                            rowtwo={true}
                        />

                        <UserDetailTable
                            labelOne={'Net Household Income/Savings	'}
                            valueOne={loanInformation?.Household_Savings}
                            labelTwo={'Business Savings'}
                            valueTwo={loanInformation?.Savings}
                        //rowtwo={true}
                        />


                        <View style={{ marginTop: 10, alignItems: 'center', marginBottom: 10 }}>

                            <TextView text={"AML/CFT Customer Risk Profiling"} style={{ textDecorationLine: 'underline', }} />

                        </View>


                        <CustomerRiskProfileTabel
                            colOneMainHeading={'AML Risks to Microfinance Borrower'}
                            colTwoMainHeading={'AML/CFT Risks'}
                            colThreeMainHeading={'Risk Profiling'}
                            colFourMainHeading={'EDD Comments(For Medium And High Risk Only'}
                            rowOnesubHeading={'Geographic Risk'}
                            rowOneColOne={loanInformation?.GeographicRiskValue}
                            rowOneColTwo={loanInformation?.GeographicRisk == 0 ? "Low" : loanInformation?.GeographicRisk == 0.5 ? "Medium" : "High"}
                            rowOneColThree={loanInformation?.GeographicRiskRemarks}
                            rowTwosubHeading={'Customer & Product Risk'}
                            rowTwoColOne={loanInformation?.CustomerProductRiskValue}
                            rowTwoColTwo={loanInformation?.CustomerProductRisk == 0 ? "Low" : loanInformation?.CustomerProductRisk == 0.5 ? "Medium" : "High"}
                            rowTwoColThree={loanInformation?.CustomerProductRiskRemarks}
                            rowThreesubHeading={'PEP Risk'}
                            rowThreeColOne={loanInformation?.PEPRiskValue}
                            rowThreeColTwo={loanInformation?.PEPRisk == 0 ? "Low" : loanInformation?.PEPRisk == 0.5 ? "Medium" : "High"}
                            rowThreeColThree={loanInformation?.PEPRiskRemarks}
                            rowFoursubHeading={'Loan Utilization Risk (UBO of the loan)'}
                            rowFourColOne={loanInformation?.LoanUtilizationRiskValue}
                            rowFourColTwo={loanInformation?.LoanUtilizationRisk == 0 ? "Low" : loanInformation?.LoanUtilizationRisk == 0.5 ? "Medium" : "High"}
                            rowFourColThree={loanInformation?.LoanUtilizationRiskRemarks}
                        />


                        <View style={{ marginTop: 10, alignItems: 'center', marginBottom: 10 }}>

                            <TextView text={"Poverty Score Card"} style={{ textDecorationLine: 'underline', }} />


                        </View>


                        <UserDetailTable
                            labelOne={"Question 1"}
                            valueOne={GETQuestions[0]?.Question}
                            labelTwo={"Answer"}
                            valueTwo={povertyScoreCard[0]}
                            rowtwo={true}
                        />
                        <UserDetailTable
                            labelOne={"Question 2"}
                            valueOne={GETQuestions[1]?.Question}
                            labelTwo={"Answer"}
                            valueTwo={povertyScoreCard[1]}
                            rowtwo={false}
                        />
                        <UserDetailTable
                            labelOne={"Question 3"}
                            valueOne={GETQuestions[2]?.Question}
                            labelTwo={"Answer"}
                            valueTwo={povertyScoreCard[2]}
                            rowtwo={true}
                        />
                        <UserDetailTable
                            labelOne={"Question 4"}
                            valueOne={GETQuestions[3]?.Question}
                            labelTwo={"Answer"}
                            valueTwo={povertyScoreCard[3]}
                            rowtwo={false}
                        />
                        <UserDetailTable
                            labelOne={"Question 5"}
                            valueOne={GETQuestions[4]?.Question}
                            labelTwo={"Answer"}
                            valueTwo={povertyScoreCard[4]}
                            rowtwo={true}
                        />
                        <UserDetailTable
                            labelOne={"Question 6"}
                            valueOne={GETQuestions[5]?.Question}
                            labelTwo={"Answer"}
                            valueTwo={povertyScoreCard[5]}
                            rowtwo={false}
                        />
                        <UserDetailTable
                            labelOne={"Question 7"}
                            valueOne={GETQuestions[6]?.Question}
                            labelTwo={"Answer"}
                            valueTwo={povertyScoreCard[6]}
                            rowtwo={true}
                        />
                        <UserDetailTable
                            labelOne={"Question 8"}
                            valueOne={GETQuestions[7]?.Question}
                            labelTwo={"Answer"}
                            valueTwo={povertyScoreCard[7]}
                            rowtwo={false}
                        />
                        <UserDetailTable
                            labelOne={"Question 9"}
                            valueOne={GETQuestions[8]?.Question}
                            labelTwo={"Answer"}
                            valueTwo={povertyScoreCard[8]}
                            rowtwo={true}
                        />
                        <UserDetailTable
                            labelOne={"Question 10"}
                            valueOne={GETQuestions[9]?.Question}
                            labelTwo={"Answer"}
                            valueTwo={povertyScoreCard[9]}
                            rowtwo={false}
                        />
                        <UserDetailTable
                            labelOne={"Question 11"}
                            valueOne={GETQuestions[10]?.Question}
                            labelTwo={"Answer"}
                            valueTwo={povertyScoreCard[10]}
                            rowtwo={true}
                        />
                        <UserDetailTable
                            labelOne={"Question 12"}
                            valueOne={GETQuestions[11]?.Question}
                            labelTwo={"Answer"}
                            valueTwo={povertyScoreCard[11]}
                            rowtwo={false}
                        />
                        <UserDetailTable
                            labelOne={"Question 13"}
                            valueOne={GETQuestions[12]?.Question}
                            labelTwo={"Answer"}
                            valueTwo={povertyScoreCard[12]}
                            rowtwo={true}
                        />

                    </View>

                    <View style={{ marginTop: 10, alignItems: 'center', marginBottom: 10 }}>

                        <TextView text={"Customer Document"} style={{ textDecorationLine: 'underline', }} />

                    </View>

                    <View style={{ alignItems: 'center' }}>

                        <FlatList

                            data={customerDocuments}
                            renderItem={({ item, index }) =>
                                <Image source={{ uri: item }} style={{ resizeMode: 'contain', width: width / 1.1, height: height / 2, marginTop: 5 }} />

                            }
                            keyExtractor={(item) => item.id}
                        />

                    </View>

                </ScrollView>}

            {/* </View> */}

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    dataContainer: {

        padding: 10
    },
    table: { marginTop: 10 },
    imageContainer: {
        marginTop: 10,elevation:20,borderRadius:10,backgroundColor:'#FFF',
marginBottom:10    },
    rowOne: { flexDirection: 'row', padding: 8 },
    rowTwo: { flexDirection: 'row', backgroundColor: '#D6EEEE', padding: 8, },
    value: { fontSize: 12, },
    columnOne: { flex: 1, },
    label: { fontSize: 12, color: '#000', fontWeight: 'bold' },
    columnTwo: { flex: 1, },
    addAssetBtn: {
        backgroundColor: Colors.green,
        padding: 10,
        borderRadius: 10,
        elevation: 10,
    },
    row: { flexDirection: 'row', alignItems: "center", justifyContent: 'space-around' }
})

export default UserDetailForZM