import axios from 'axios';
import {URI} from '../URI';
import {Dispatch} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// actions/locationActions.js

export const updateLocation = (latitude: any, longitude: any) => {
    return {
      type: 'UPDATE_LOCATION',
      payload: { latitude, longitude },
    };
  };
  