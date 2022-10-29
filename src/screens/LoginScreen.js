import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase'
import { useNavigation } from '@react-navigation/core'
import { LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage"]); // Ignore log notification by message

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Home")
            }
        })
        return unsubscribe
    }, [])
    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Registered with: ', user.email);
            })
            .catch((error) => alert(error.message));
    }
    const handleLogIn = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Loggend in with: ', user.email);
            })
            .catch((error) => alert(error.message));
    }
    return (

        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <Image
                style={styles.image}
                source={{ uri: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d98ceddd-228a-439b-a6f1-3266a6be0e2e/dectbcn-99a7c5c9-1030-4013-a32b-344c1c2f33e4.png/v1/fill/w_1280,h_377,q_80,strp/anime_banner_black_and_white_by_nenexhanako_dectbcn-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9Mzc3IiwicGF0aCI6IlwvZlwvZDk4Y2VkZGQtMjI4YS00MzliLWE2ZjEtMzI2NmE2YmUwZTJlXC9kZWN0YmNuLTk5YTdjNWM5LTEwMzAtNDAxMy1hMzJiLTM0NGMxYzJmMzNlNC5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.7RDbYqmQjUW5jz7sWBWxWvEfsb3QAR3_Qn-8d3O6Ax4" }}
            />
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Sign in to</Text>
                <Text style={styles.titleText2}>Manga Store</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogIn}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>

    )
}
export default LoginScreen
const styles = StyleSheet.create({
    back: {
        backgroundColor: '#150922'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#150922'
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: '#E0DACC',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,

    },
    button: {
        backgroundColor: '#EF3014',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: '#E0DACC',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutline: {
        backgroundColor: '#E0DACC',
        marginTop: 5,
        borderColor: '#EF3014',
        borderWidth: 2,

    },
    buttonOutlineText: {
        color: '#EF3014',
        fontWeight: '700',
        fontSize: 16,
    },
    titleText: {
        color: '#EF3014',
        fontSize: '20px',
    },
    titleText2: {
        color: '#EF3014',
        fontStyle: 'italic',
        fontSize: '40px',
        fontFamily: 'Arial'

    },
    titleContainer: {
        marginBottom: 40,
        justifyContent: 'left',
        alignItems: 'left',
    },
    image: {
        width: '100%',
        height: '15%',
        marginTop: -250,
        marginBottom: 100,
        borderRadius: 10
    }
})