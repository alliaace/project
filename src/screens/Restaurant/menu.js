import { useLinkBuilder } from '@react-navigation/native';
import * as React from 'react';
import { Button, View, Text, StyleSheet, Dimensions, Image, Pressable } from 'react-native';
import { Card, Input } from 'react-native-elements';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import jsonserver from '../../server/jsonServer'
import STyles from '../../styles/style'

function Profile({ route, navigation }) {
    const { data } = route.params;
    const [showReservation, setshowReservation] = React.useState(false)
    const [showDeliveries, setShowDeliveries] = React.useState(false)
    const [history, setHistory] = React.useState([])
    const [restName, setRestName] = React.useState("")
    const [nameOfMenu, setNameOfMenu] = React.useState("")
    const [priceOfMenu, setPriceOfMenu] = React.useState(0)
    const [btnText, setBtnText] = React.useState("ADD")
    const [errorUp, setErrorUp] = React.useState("")
    const [textColor, setTextColor] = React.useState("blue")
    const callReservationHistory = () => {
        // jsonserver.get('/user/Reservation/History/' + datagiven._id)
        //     .then((response) => {
        //         setHistory(response.data)
        //         console.log("history comming ", response.data);
        //     })
        //     .then((error) => {
        //         console.log(error);
        //     })

        setshowReservation(!showReservation)

    }

    const AddMenu = () => {
        // console.log(data._id);

        console.log(nameOfMenu, priceOfMenu);

        jsonserver.post('/resturant/addMenu/' + data._id, {
            name: nameOfMenu,
            price: priceOfMenu
        })
            .then((response) => {
                setErrorUp("Added")
                setTextColor("blue")
                console.log("this is response", response);

            })
            .catch(function (error) {
                console.log("error-------------------->", error);
                setErrorUp(error)
            })
    }


    return (
        <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center', alignContent: "center" }}>
            <View style={styles.innercont}>
                <View style={styles.logoplusinfo}>
                    <Image source={require("../../media/logo.png")} style={{ width: 100, height: 100 }} />
                    <View style={{ marginLeft: 25 }}>
                        <Text style={{ fontSize: 36, color: "white" }}>{data.name}</Text>
                        <Text style={{ fontSize: 20, color: "#e1e1e1" }}>{data.email}</Text>
                        <Text style={{ fontSize: 20, color: "#e1e1e1" }}>0{data.phone}</Text>
                    </View>

                </View>


                <Card.Divider />
                <Pressable style={{ height: 50, flexDirection: "row", alignItems: "center", backgroundColor: "#c18a2c" }} onPress={callReservationHistory}>
                    <Text style={styles.text}>ADD MENU</Text>
                    <Ionicons name="chevron-down-outline" size={20} color="black" style={{ marginLeft: Dimensions.get("window").width - 240 }} />
                </Pressable>

                {showReservation &&
                    <View style={{ marginBottom: 10, alignItems: "center" }}>
                        <Text style={{fontSize:20,color:"white"}}>{errorUp}</Text>
                        <Input  placeholder="Enter Menu Item" leftIcon={{ type: 'font-awesome', name: 'utensils' }} placeholderTextColor="black" containerStyle={styles.input} onChangeText={(namemenu) => setNameOfMenu(namemenu)} />
                        <Input placeholder="Enter Menu Price" leftIcon={{ type: 'font-awesome', name: 'money' }} placeholderTextColor="black" containerStyle={styles.input} onChangeText={(pri) => setPriceOfMenu(pri)} />
                        <Pressable style={STyles.btn} onPress={() => AddMenu()}><Text style={STyles.textbtnprop}>{btnText}</Text></Pressable>
                    </View>
                }

                <Card.Divider />


                <Pressable style={{ height: 50, flexDirection: "row", alignItems: "center", backgroundColor: "#c18a2c" }} onPress={callReservationHistory}>
                    <Text style={styles.text}>Deliveries</Text>
                    <Ionicons name="chevron-down-outline" size={20} color="black" style={{ marginLeft: Dimensions.get("window").width - 212 }} />
                </Pressable>

                {showDeliveries &&
                    <View style={{ marginBottom: 10 }}>


                    </View>
                }

                <Card.Divider />

                <Pressable style={{ height: 50, flexDirection: "row", alignItems: "center", backgroundColor: "#c18a2c" }} onPress={() =>
                    navigation.navigate('LoginUser')
                }>
                    <Text style={styles.text}>LogOut</Text>
                    <Ionicons name="log-out-outline" size={20} color="black" style={{ marginLeft: Dimensions.get("window").width - 187 }} />
                </Pressable>
















            </View>

        </ScrollView>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",


    },
    input: {
        height: 50,
        width: 250,
        borderRadius: 15,
        paddingLeft: 15,
        fontSize: 16,
        marginTop: 15,
        color: "black"
    },
    innercont: {
        width: Dimensions.get("window").width - 50,
        backgroundColor: "#feb334",
        marginTop: 20,
        borderRadius: 10

    },
    logoplusinfo: {
        flexDirection: "row",
        marginVertical: 5,
        marginLeft: 15

    },
    text: {
        fontSize: 26,
        color: "white",
        paddingLeft: 15

    }
})

export default Profile;