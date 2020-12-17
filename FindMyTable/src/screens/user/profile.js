import { useLinkBuilder } from '@react-navigation/native';
import * as React from 'react';
import { Button, View, Text, StyleSheet, Dimensions, Image, Pressable } from 'react-native';
import { Card } from 'react-native-elements';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import jsonserver from '../../server/jsonServer'



function Profile({ route, navigation }) {
    const { data } = route.params;
    const [showReservation, setshowReservation] = React.useState(false)
    const [showDeliveries, setShowDeliveries] = React.useState(false)
    const [history, setHistory] = React.useState([])
    const [restName, setRestName] = React.useState("")


    const callReservationHistory = () => {

        jsonserver.get('/resturant/Reservetion/Completed/' + data._id)
            .then((response) => {

                setHistory(response.data)
                console.log("history comming ", response.data);


            })
            .then((error) => {
                console.log(error);
            })

        setshowReservation(!showReservation)

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
                    <Text style={styles.text}>Reservations</Text>
                    <Ionicons name="chevron-down-outline" size={20} color="black" style={{ marginLeft: Dimensions.get("window").width - 240 }} />
                </Pressable>

                {showReservation &&
                    <View style={{ marginBottom: 10 }}>

                        <Card style={{ marginBottom: 25 }}>
                            <Card.Title>Reservated Resturant</Card.Title>
                            <Card.Divider />
                            <ScrollView >
                                {

                                    history.map((a) => {

                                        return (
                                            <View>
                                                <Text>
                                                    Name of Resturant: {

                                                        () => {
                                                            jsonserver.get('/resturant/' + a.resturantId)
                                                                .then((response) => {

                                                                    console.log(response.data)
                                                                    setRestName(response.data)


                                                                    // setRestName(response.data)

                                                                })
                                                                .then((error) => {
                                                                    console.log(error);
                                                                })
                                                        }

                                                    }{restName}
                                                </Text>
                                                <Text>
                                                    No of Persons: {a.noOfPersons}
                                                </Text>
                                                <Text>
                                                    Date of Reservation: {a.dateOfReservation}
                                                </Text>
                                                <View>
                                                    {
                                                        a.order.map((b) => {
                                                            return (
                                                                <View style={{ flexDirection: "row" }}>
                                                                    <Text>Menu name: {b.name}</Text>
                                                                    <Text>Price is: {b.price}</Text>
                                                                </View>
                                                            )
                                                        })
                                                    }
                                                </View>
                                                <Card.Divider />
                                            </View>
                                        )

                                    })
                                }
                            </ScrollView>
                        </Card>

                    </View>
                }

                <Card.Divider />


                <Pressable style={{ height: 50, flexDirection: "row", alignItems: "center", backgroundColor: "#c18a2c" }} onPress={callReservationHistory}>
                    <Text style={styles.text}>Deliveries</Text>
                    <Ionicons name="chevron-down-outline" size={20} color="black" style={{ marginLeft: Dimensions.get("window").width - 212 }} />
                </Pressable>

                {showDeliveries &&
                    <View style={{ marginBottom: 10 }}>

                        {/* <FlatList
                            data={history}
                            renderItem={({ item }) => <Card style={{ marginBottom: 25 }}>
                                <Card.Title>Reservated Resturant</Card.Title>
                                <Card.Divider />
                                <ScrollView >
                                    <View>
                                        <Text>
                                            Number of Persons: {item.noOfPersons}
                                        </Text>
                                        <Text>
                                            Date of Reservation: {item.dateOfReservation}
                                        </Text>
                                        <Text>
                                            Time of Reservation: {item.timeOfReservation}
                                        </Text>
                                    </View>
                                </ScrollView>
                            </Card>}
                        /> */}

                        {/* {
                            history.map((a) => {
                                return (
                                    <Card style={{ marginBottom: 25 }}>
                                        <Card.Title>Reservated Resturant</Card.Title>
                                        <Card.Divider />
                                        <ScrollView >
                                            <View>
                                                <Text>
                                                    Number of Persons: {a.noOfPersons}
                                                </Text>
                                                <Text>
                                                    Date of Reservation: {a.dateOfReservation}
                                                </Text>
                                                <Text>
                                                    Time of Reservation: {a.timeOfReservation}
                                                </Text>
                                            </View>
                                        </ScrollView>
                                    </Card>
                                );
                            })
                        } */}





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