// reducers/locationReducer.js

const initialState = {
    userLocation: null,
  };
  
  const locationReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
      case 'UPDATE_LOCATION':
        return {
          ...state,
          userLocation: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default locationReducer;
  