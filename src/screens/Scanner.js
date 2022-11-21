import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
import back_icon from './assets/img/back.png'
import { useNavigation } from '@react-navigation/core'
export default function Scanner() {
    const navigation = useNavigation();
    function renderNavBar() {
        return (
            <View style={{ paddingHorizontal: 20, height: 80, paddingVertical: 60 }}>
                <TouchableOpacity
                    style={{ marginLeft: 14 }}
                    onPress={() => navigation.replace("Home")}
                >
                    <Image
                        source={back_icon}
                        resizeMode="contain"
                        style={{ width: 25, height: 25, tintColor: '#E0DACC' }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
    
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [text, setText] = useState('Not yet scanned')

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [author, setAuthor] = useState('')
    const [publisher, setPublisher] = useState("")
    const [language, setLanguage] = useState("")
    const [pages, setPages] = useState('')
    const [isbn, setIsbn] = useState('')
    const [description, setDescription] = useState("")
    const [uri, setUri] = useState("")
    const [blogs, setBlogs] = useState([])

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        let lines = data.split('^');
        setTitle(lines[0])
        setPrice(lines[1])
        setAuthor(lines[2])
        setPublisher(lines[3])
        setLanguage(lines[4])
        setPages(lines[5])
        setIsbn(lines[6])
        setDescription(lines[7])
        setUri(lines[8])
        setBlogs({
            title: title,
            price: price,
            author: author,
            publisher: publisher,
            language: language,
            pages: pages,
            isbn: isbn,
            description: description,
            uri: uri
        })
        console.log(blogs.title)

        if (typeof blogs.title == 'undefined' || blogs.title == ''){
            setText("Please rescan")
        } else {
            setText(blogs.title)
            setShowButton(true)
        }

    };
    if (hasPermission === null) {
        return <Text>Requesting for Camera Permission</Text>
    }
    if (hasPermission === false) {
        return <Text>No Access to Camera</Text>
    }
    return (
        <>
            <View style={{ backgroundColor: '#1E1B26' }}>
                {renderNavBar()}
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1E1B26' }}>

                <View style={{ alignItems: 'center', justifyContent: 'center', height: 300, width: 300, overflow: 'hidden', borderRadius: 30, backgroundColor: 'tomato', marginTop: -100 }}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={{ width: 400, height: 400 }} />
                </View>
                {scanned &&
                    <TouchableOpacity
                        onPress={() => {
                            setScanned(false)
                            setText('Not yet scanned')

                        }}
                    >
                        <Text style={{ marginTop: 15, color: '#F96D41', fontSize: 22 }}>Tap to Scan Again</Text>
                    </TouchableOpacity>}
                <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 22, color: "#E0DACC", fontFamily: 'KohinoorBangla-Semibold' }}>Book title: </Text>
                    <Text style={{ marginTop: 10, fontSize: 16, color: "#E0DACC", fontFamily: 'KohinoorBangla-Regular' }}>{text}</Text>
                </View>
                <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
                    {showButton &&
                        <TouchableOpacity
                            style={{ backgroundColor: "#F96D41", borderRadius: 12, alignItems: 'center', justifyContent: 'center', width: 200, height: 50 }}
                            onPress={() => navigation.navigate("ScannedBook", blogs)}
                        >
                            <Text style={{ fontFamily: 'KohinoorBangla-Semibold', fontSize: 16, color: '#E0DACC' }}>Book details</Text>
                        </TouchableOpacity>}
                </View>
            </View>
        </>

    )

}