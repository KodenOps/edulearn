import { View, Text } from 'react-native';
import React, { useRef } from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Button from '@/components/Button';
import { router, Router } from 'expo-router';
import LottieView from 'lottie-react-native';

const Welcome = () => {
	const animation = useRef<LottieView>(null);
	return (
		<View className='bg-white p-4 gap-4 w-full justify-center items-center flex-1'>
			{/* Lottie Animation */}
			<Animated.View
				className='w-full '
				entering={FadeInDown.duration(300).springify()}>
				<LottieView
					ref={animation}
					source={require('../assets/animation/learn.json')}
					autoPlay
					loop
					style={{ width: '100%', height: 300 }}
				/>
			</Animated.View>
			{/* Header */}
			<Animated.View
				className='w-full '
				entering={FadeInDown.duration(300).delay(200).springify()}>
				<Text
					className='text-5xl text-center leading-[3.5rem]'
					style={{ fontFamily: 'BarlowExtraBold' }}>
					Discover and improve your skills
				</Text>
			</Animated.View>
			{/* Paragraph */}
			<Animated.View
				className='w-full '
				entering={FadeInDown.duration(300).delay(400).springify()}>
				<Text
					className='text-xl text-center leading-[2rem] capitalize'
					style={{ fontFamily: 'BarlowSemiBold' }}>
					Learn from the best Courses & Tutorials 🚀
				</Text>
			</Animated.View>
			{/* Button */}
			<Animated.View
				className='w-full justify-center items-center mt-8 '
				entering={FadeInDown.duration(300).delay(600).springify()}>
				<Button
					title='Get Started'
					action={() => router.push('/(tabs)')}
				/>
			</Animated.View>
		</View>
	);
};

export default Welcome;
