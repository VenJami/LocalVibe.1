import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  FlatList,
  Animated,
  Easing,
  RefreshControl,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import { getAllPosts } from '../../redux/actions/postAction';
import PostCard from '../components/PostCard';
import Loader from '../common/Loader';
import { getAllUsers } from '../../redux/actions/userAction';
import Lottie from 'lottie-react-native'
const loader = require('../assets/newsfeed/animation_lkbqh8co.json');


type Props = {
  navigation: any;
};

const HomeScreen = ({navigation}: Props) => {
  const {user} = useSelector((state: any) => state.user);
  const {posts, isLoading} = useSelector((state: any) => state.post);
  const dispatch = useDispatch();
  const [offsetY, setOffsetY] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [extraPaddingTop] = useState(new Animated.Value(0));
  const refreshingHeight = 100;
  const lottieViewRef = useRef<Lottie>(null);

  let progress = 0;
  if (offsetY < 0 && !isRefreshing) {
    const maxOffsetY = -refreshingHeight;
    progress = Math.min(offsetY / maxOffsetY, 1);
  }

  function onScroll(event: any) {
    const {nativeEvent} = event;
    const {contentOffset} = nativeEvent;
    const {y} = contentOffset;
    setOffsetY(y);
  }

  function onRelease() {
    if (offsetY <= -refreshingHeight && !isRefreshing) {
      setIsRefreshing(true);
      setTimeout(() => {
        getAllPosts()(dispatch);
        setIsRefreshing(false);
      }, 3000);
    }
  }

  function onScrollEndDrag(event: any) {
    const { nativeEvent } = event;
    const { contentOffset } = nativeEvent;
    const { y } = contentOffset;
    setOffsetY(y);
  
    if (y <= -refreshingHeight && !isRefreshing) {
      setIsRefreshing(true);
      setTimeout(() => {
        getAllPosts()(dispatch);
        setIsRefreshing(false);
      }, 3000);
    }
  }

  useEffect(() => {
    getAllPosts()(dispatch);
    getAllUsers()(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (isRefreshing) {
      Animated.timing(extraPaddingTop, {
        toValue: refreshingHeight,
        duration: 0,
        useNativeDriver: false,
      }).start();
      lottieViewRef.current?.play();
    } else {
      Animated.timing(extraPaddingTop, {
        toValue: 0,
        duration: 400,
        easing: Easing.elastic(1.3),
        useNativeDriver: false,
      }).start();
    }
  }, [isRefreshing]);

  return (
    <SafeAreaView className="flex-1 bg-green-50">
      <StatusBar animated={true} backgroundColor={"#fff"} barStyle={"dark-content"} showHideTransition={'fade'}/>

      <View className="flex flex-row p-2 justify-between bg-white">
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image source={require('../assets/wordlogo.png')} />
          </TouchableOpacity>
        </View>

        <View className="flex flex-row p-2 justify-between">
          <TouchableOpacity onPress={() => navigation.navigate('Search')} className="rounded-full p-2 mx-2 bg-green-50">
            <Image source={require('../assets/newsfeed/search.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image
              source={{uri: user.avatar.url}}
              style={{width: 40, height: 40}}
              borderRadius={100}
            />
          </TouchableOpacity>
        </View>
      </View>


      <View className="flex-1 my-1 mb-[43px]">
        <TouchableOpacity
          className="w-full bg-white items-center p-2 pb-[30px]"
          onPress={() => navigation.navigate('Post')}
        >
          <Image source={require('../assets/newsfeed/post.png')} />
        </TouchableOpacity>
      </View>

      <>
      {isLoading ? (
        <Loader />
      ) : (
        <SafeAreaView>
          <Lottie
            ref={lottieViewRef}
            style={{
              height: refreshingHeight,
              display: isRefreshing ? 'flex' : 'none',
              position: 'absolute',
              top: 15,
              left: 0,
              right: 0,
            }}
            loop={false}
            source={loader}
            progress={progress}
          />
          {/* custom loader not working in android that's why I used here built in loader for android and custom loader for android but both working perfectly */}
         {
          Platform.OS === 'ios' ? (
            <FlatList
            data={posts}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <PostCard navigation={navigation} item={item} />
            )}
            onScroll={onScroll}
            onScrollEndDrag={onScrollEndDrag}
            onResponderRelease={onRelease}
            ListHeaderComponent={
              <Animated.View
                style={{
                  paddingTop: extraPaddingTop,
                }}
              />
            }
          />
          ) : (
            <FlatList
            data={posts}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <PostCard navigation={navigation} item={item} />
            )}
            onScroll={onScroll}
            onScrollEndDrag={onScrollEndDrag}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  getAllPosts()(dispatch);
                  getAllUsers()(dispatch).then(() => {
                    setRefreshing(false);
                  });
                }}
                progressViewOffset={refreshingHeight}
              />
            }
            onResponderRelease={onRelease}
            ListHeaderComponent={
              <Animated.View
                style={{
                  paddingTop: extraPaddingTop,
                }}
              />
            }
          />
          )
         }
        </SafeAreaView>
      )}
    </>
    </SafeAreaView>
  );
};

export default HomeScreen;
