import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { GeoPosition } from 'react-native-geolocation-service';
import axios from 'axios';
import { URI } from '../../redux/URI';

const MapScreen = () => {
 const [userLocation, setUserLocation] = useState<GeoPosition | null>(null);
 const [searchText, setSearchText] = useState('');

 useEffect(() => {
    if (Geolocation) {
      Geolocation.getCurrentPosition(
        (geoPosition) => {
          setUserLocation({
            latitude: geoPosition.coords.latitude,
            longitude: geoPosition.coords.longitude,
            accuracy: geoPosition.coords.accuracy,
            altitude: geoPosition.coords.altitude,
            altitudeAccuracy: geoPosition.coords.altitudeAccuracy,
            heading: geoPosition.coords.heading,
            speed: geoPosition.coords.speed,
          } as unknown as GeoPosition);
        },
        (error) => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } else {
      console.error('Geolocation is not available.');
    }
 }, []); // Run this effect only once on component mount

 const updateLocation = async () => {
  if (userLocation) {
    try {
      await axios.post(`${URI}/update-location`, {
        userId: 'token', 
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      });
      console.log('Location updated successfully');
    } catch (error) {
      console.error('Error updating location:', error.message);
    }
  }
};

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
        <Button title="Refresh" onPress={updateLocation} />
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
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
            title="Your Location"
            description="You are here"
          />
        )}

        <Marker
            coordinate={{
              latitude: 14.8425,
              longitude: 120.2851,
            }}
            title="Your Friends Location"
            description="Your Friends are here"
          />

          <Marker
            coordinate={{
              latitude: 14.8289,
              longitude: 120.2867,
            }}
            title="Your Friends Location"
            description="Your Friends are here"
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#f7f7f7',
 },
 searchInput: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e3e3e3',
 },
 map: {
    flex: 1,
 },
});

export default MapScreen;