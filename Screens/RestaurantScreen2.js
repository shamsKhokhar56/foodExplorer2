import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight, ImageBackground, TextInput, KeyboardAvoidingView, Image, ScrollView } from 'react-native';

import firebase from '../Firebase/fire';

import Loading from '../components/Loading';
import Card from '../components/Card';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Restaurant from '../data/Restaurant';
import LocationSelection from './LocationSelection';

const RestaurantScreen = ({ navigation, route }) => {

    const [resData, setResData] = useState();
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('')
    const [location, setLocation] = useState('Islamabad')
    const [locationCheck, setLocationCheck] = useState(false)

    // const getData = async () => {
    //     const ref = firebase.firestore().collection('Restaurant')
    //     await ref.get().then((item) => {
    //         const items = await item.docs.map((doc) => doc.data());
    //         setResData(items);
    //         setLoading(false);
    //     })

    // }
    // useEffect(() => {
    //     getData();
    // }, [location]);

    return (
        <View style={styles.container} >
            <View style={styles.upperDashboard}>
                <Card style={styles.selectLocationView}>
                    <TouchableHighlight underlayColor='white'>
                        <View style={styles.locationInnerView}>
                            <View style={styles.locationIconView}>
                                <EvilIcons name="location" size={36} color={Colors.primary} />
                            </View>
                            <View style={[styles.locationIconView, { width: '85%', alignItems: 'flex-start', paddingLeft: 20 }]}>
                                <Text style={styles.locationTextStyles}>
                                    {location}
                                </Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                </Card>
                <View style={styles.modalStyles}>
                </View>
            </View>
            <View style={styles.searchView}>
                <Card style={styles.searchCard}>
                    <View style={styles.searchIcon}>
                        <FontAwesome name="search" size={30} color={Colors.primary} />
                    </View>
                    <View style={styles.searchInput}>
                        <TextInput
                            placeholder='Search Restaurant'
                            onChangeText={text => { setSearch(text) }}
                            value={search}
                        />
                    </View>
                </Card>
            </View>
            {
                loading ? (
                    <Loading />
                ) : (
                    <View style={styles.restaurantsMainView}>
                        <ScrollView>
                            {
                                Restaurant.map(
                                    (item) => {
                                        if (item.city === location) {
                                            if (item.restaurantName.toLowerCase().includes(search.toLowerCase()) || search == '') {
                                                return (
                                                    <View style={styles.restaurantView} key={item.restaurantId}>
                                                        <TouchableHighlight activeOpacity={0.6} underlayColor={'white'}
                                                            onPress={() => {
                                                                navigation.navigate('RestaurantDetail', {
                                                                    restId: item.restaurantId,
                                                                    name: item.restaurantName,
                                                                    linkNumber: item.linkNumber,
                                                                    cityCode: item.cityCode,
                                                                    rating: item.restaurantRating,
                                                                    openTime: item.openingTime,
                                                                    closeTime: item.closingTime,
                                                                    address: item.restaurantAddress,
                                                                    latitude: item.latitude,
                                                                    longitude: item.longitude,
                                                                    image: item.restaurantImage,
                                                                    city: item.city

                                                                })
                                                            }}>
                                                            <View>
                                                                <Image style={styles.imageStyles} source={{ uri: item.restaurantImage }} />
                                                                <View style={styles.restaurantDetails}>
                                                                    <Text style={styles.textStyles}>
                                                                        {item.restaurantName}
                                                                    </Text>
                                                                    <View style={styles.ratingStyles}>
                                                                        <Entypo name="star" size={20} color={Colors.primary} />
                                                                        <Text style={styles.textStyles}>
                                                                            {item.restaurantRating.slice(0, -5)}
                                                                        </Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </TouchableHighlight>
                                                    </View>
                                                )
                                            }
                                        }
                                    }
                                )
                            }
                        </ScrollView>
                    </View>
                )
            }
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    },
    modalStyles: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchView: {
        height: '10%',
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: '10%'
    },
    upperDashboard: {
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectLocationView: {
        width: '90%',
        height: '75%',
        overflow: 'hidden'
    },
    locationInnerView: {
        height: '100%',
        width: '100%',
        flexDirection: 'row',
    },
    locationIconView: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    locationTextStyles: {
        color: 'black',
        fontSize: 20
    },
    searchCard: {
        width: '100%',
        height: '75%',
        flexDirection: 'row'
    },
    searchIcon: {
        height: '100%',
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchInput: {
        width: '85%',
        height: '100%',
        justifyContent: 'center',
    },
    restaurantsMainView: {
        height: '90%',
        // width: '95%'
    },
    restaurantView: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        margin: 10,
        // padding: 20,
        // height: '20%',
        // width: '100%',
        overflow: 'hidden'
        // alignItems: 'flex-start'
    },
    imageStyles: {
        height: 200,
        width: 400,
    },
    restaurantDetails: {
        padding: 5,
        height: 60,
        // flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textStyles: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    ratingStyles: {
        flexDirection: 'row'
    },
})

export default RestaurantScreen