import React, { useState } from 'react'
import { View, Text, Button, Pressable, StatusBar, TextInput, StyleSheet, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import DashboardScreen from './user/dashboardUser'

import ProcessSignup from '../routes/DashBoardGetter'
import jsonserver from '../server/jsonServer'
import styles from '../styles/style'
import { Input } from 'react-native-elements';


const Stack = createStackNavigator();

const SignupRender = ({ navigation }) => {


    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [pass, setPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [errorUp, setErrorUp] = useState("")
    const [btnValue, setBtnValue] = useState("SIGNUP")

    const processSignUp = () => {

        let check = true;

        if (name == "" || email == "" || phone == "" || pass == "") {


            setErrorUp("All field are required")
            check = false
            console.log(errorUp)

        }
        if (check) {

            if (pass === confirmPass) {
                setBtnValue("Wait...")
                console.log("working signup");
                jsonserver.post('/user/SignUp', {
                    name: name,
                    phone: phone,
                    email: email,
                    password: pass
                })
                    .then((response) => {
                        console.log(response);
                        navigation.navigate('LoginUser'
                            )
                    })
                    .catch(function (error) {
                        console.log(error);
                        setErrorUp(error.message)
                        setBtnValue("SIGNUP")
                    })
            }else{
                setErrorUp("Password did'nt match")
            }

        }





    }






    return (

        <ScrollView>
            <View style={styles.mainContainer}>
                <View style={styles.upperRound}>
                    <Image source={require('../media/logo.png')} style={styles.logo} />
                </View>
                <View style={styles.formcontainer}>
                    <StatusBar translucent backgroundColor="#feb334" hidden />
                    <Text style={styles.labeltext}>USER</Text>
                    <Text style={{ color: "red" }}>{errorUp}</Text>
                    <Input leftIcon={{ type: 'font-awesome', name: 'user' }} placeholder="Enter Your Name" containerStyle={styles.input} placeholderTextColor="black" onChangeText={(text) => setName(text)} />
                    <Input leftIcon={{ type: 'font-awesome', name: 'envelope' }} placeholder="Enter Your Email" containerStyle={styles.input} placeholderTextColor="black" onChangeText={(em) => setEmail(em)} />
                    <Input keyboardType="numeric" leftIcon={{ type: 'font-awesome', name: 'phone' }} placeholder="Enter Your Phone" containerStyle={styles.input} placeholderTextColor="black" onChangeText={(ph) => setPhone(ph)} />
                    <Input leftIcon={{ type: 'font-awesome', name: 'lock' }} placeholder="Enter Your Password" containerStyle={styles.input} secureTextEntry placeholderTextColor="black" onChangeText={(ps) => setPass(ps)} />
                    <Input leftIcon={{ type: 'font-awesome', name: 'lock' }} placeholder="Confirm Password" containerStyle={styles.input} secureTextEntry placeholderTextColor="black" onChangeText={(cps) => setConfirmPass(cps)} />
                    <Pressable style={styles.btn} onPress={processSignUp}><Text style={styles.textbtnprop}>{btnValue}</Text></Pressable>
                    <Pressable style={styles.txt} onPress={() => navigation.navigate("LoginUser")}><Text style={styles.navigatortext}>Already have an account? SignIn</Text></Pressable>

                </View>
                <View style={{ flexDirection: "row" }}>
                    <Pressable style={styles.opt} onPress={() => navigation.navigate("SignUpRest")}><Text style={styles.black}>Restaurant?</Text></Pressable>
                    <Pressable style={styles.opt} onPress={() => navigation.navigate("SignUpRider")}><Text style={styles.black}>Rider?</Text></Pressable>
                </View>
                <Text></Text><Text></Text>


            </View>
        </ScrollView>
    );
}






export default SignupRender;

