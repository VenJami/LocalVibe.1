import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { GeoPosition } from 'react-native-geolocation-service';
import axios from 'axios';
import { URI } from '../../redux/URI';
import { useSelector } from 'react-redux';

const MapScreen = () => {
 const [userLocation, setUserLocation] = useState<GeoPosition | null>(null);
 const [watchID, setWatchID] = useState<number | null>(null);
 const [searchText, setSearchText] = useState('');
 const {user} = useSelector((state: any) => state.user);

 useEffect(() => {
  if (Geolocation) {
    const success = (geoPosition: { coords: { latitude: any; longitude: any; accuracy: any; altitude: any; altitudeAccuracy: any; heading: any; speed: any; }; }) => {
      setUserLocation({
        latitude: geoPosition.coords.latitude,
        longitude: geoPosition.coords.longitude,
        accuracy: geoPosition.coords.accuracy,
        altitude: geoPosition.coords.altitude,
        altitudeAccuracy: geoPosition.coords.altitudeAccuracy,
        heading: geoPosition.coords.heading,
        speed: geoPosition.coords.speed,
      } as unknown as GeoPosition);
    };

    const error = (error: { code: any; message: any; }) => {
      console.log(error.code, error.message);
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
    };

    setWatchID(Geolocation.watchPosition(success, error, options));
  } else {
    console.error('Geolocation is not available.');
  }

  return () => {
    if (watchID) {
      Geolocation.clearWatch(watchID);
    }
  };
}, []); // Run this effect only once on component mount

//  const updateLocation = async () => {
//   if (userLocation) {
//     try {
//       await axios.post(`${URI}/update-location`, {
//         userId: 'token', 
//         latitude: userLocation.latitude,
//         longitude: userLocation.longitude,
//       });
//       console.log('Location updated successfully');
//     } catch (error) {
//       console.error('Error updating location:', error.message);
//     }
//   }
// };

 const refresh = () => {
    // Add logic to refresh your data
 };

 return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search here..."
          value={searchText}
          onChangeText={setSearchText}
        />
        {/* <Button title="Refresh" onPress={updateLocation} /> */}
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        showsUserLocation
        showsMyLocationButton
        customMapStyle={[
          {
             elementType: 'geometry',
             stylers: [
               {
                 color: '#F1FFF8',
               },
             ],
          },
          {
             elementType: 'labels.text.fill',
             stylers: [
               {
                 color: '#017E5E',
               },
             ],
          },
          {
             featureType: 'administrative.locality',
             elementType: 'labels.text.fill',
             stylers: [
               {
                 color: '#017E5E',
               },
             ],
          },
          {
             featureType: 'road',
             elementType: 'geometry',
             stylers: [
               {
                 color: '#04c292',
               },
             ],
          },
          {
             featureType: 'road',
             elementType: 'labels.text.fill',
             stylers: [
               {
                 color: '#017E5E',
               },
             ],
          },
          {
             featureType: 'road.highway',
             elementType: 'geometry',
             stylers: [
               {
                 color: '#017E5E',
               },
             ],
          },
          {
             featureType: 'road.highway',
             elementType: 'labels.text.fill',
             stylers: [
               {
                 color: '#017E5E',
               },
             ],
          },
          {
             featureType: 'transit',
             elementType: 'geometry',
             stylers: [
               {
                 color: '#2f3948',
               },
             ],
          },
          {
             featureType: 'transit.station',
             elementType: 'labels.text.fill',
             stylers: [
               {
                 color: '#d59563',
               },
             ],
          },
          {
             featureType: 'water',
             elementType: 'geometry',
             stylers: [
               {
                 color: '#B3E0FF',
               },
             ],
          },
          {
             featureType: 'water',
             elementType: 'labels.text.fill',
             stylers: [
               {
                 color: '#515c6d',
               },
             ],
          },
          {
             featureType: 'water',
             elementType: 'labels.text.stroke',
             stylers: [
               {
                 color: '#17263c',
               },
             ],
          },
         ]}
        region={{
          latitude: userLocation ? userLocation.latitude : 37.7749,
          longitude: userLocation ? userLocation.longitude : -122.4194,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
       }}
      >
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            image={require('../assets/maps/pin.png')}
          >
            <Callout tooltip>
              <View>
                <View style={styles.bubble}>
                    <View className="relative">
              <Image
                source={{uri: user?.avatar.url}}
                height={80}
                width={80}
                borderRadius={100}
              />
              {user.role === 'Admin' && (
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828640.png',
                  }}
                  width={18}
                  height={18}
                  className="ml-2 absolute bottom-0 left-0"
                />
              )}
            </View>
                  <Text style={styles.name}>{user?.name}</Text>
                </View>
                <View style={styles.arrowBorder} />
                <View style={styles.arrow} />
              </View>
            </Callout>
          </Marker>
          
        )}
        <Marker
            coordinate={{
              latitude: 14.8425,
              longitude: 120.2851,
            }}
            title="Your Friends Location"
            description="Your Friends are here"
            image={require('../assets/maps/pin.png')}
          />

          <Marker
            coordinate={{
              latitude: 14.8289,
              longitude: 120.2867,
            }}
            title="Your Friends Location"
            description="Your Friends are here"
            image={require('../assets/maps/pin.png')}
          />
      </MapView>
    </View>
 );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
 },
 searchBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginRight: 80,
    marginTop: 12,
    position: 'absolute',
    zIndex: 1,
 },
 searchInput: {
    flex: 1,
    height: 38,
    paddingLeft: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#e3e3e3',
    backgroundColor: "#ffffff"
 },
 map: {
    flex: 1,
 },
 bubble: {
  flexDirection: "row",
  alighSelf: 'flex-start',
  backgroundColor: '#fff',
  borderRadius: 6,
  borderColor: '#ccc',
  borderWidth: 0.5,
  padding: 15,
  width: 150, 
 },
 name: {
  fontSize: 16,
  color: 'black',
  marginBottom: 5,
  paddingRight: 20,
 },
 arrow: {
  backgroundColor: "transparent",
  borderColor: 'transparent',
  borderWidth: 16,
  alignSelf: 'center',
  marginTop: -32,
 },
arrowBorder: {
  backgroundColor: 'transparent',
  borderColor: 'transparent',
  borderTopColor: '#007a87',
  borderwidth: 16,
  alignSelf: 'center',
  marginTop: -0.5,
  marginBottom: -15
},
image: {
  width: 50,
  height: 50,
  zIndex: 1,
},
});

export default MapScreen;

function setWatchID(arg0: number) {
  throw new Error('Function not implemented.');
}
