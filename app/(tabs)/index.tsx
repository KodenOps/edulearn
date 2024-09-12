import { HelloWave } from '@/components/HelloWave';
import {
	View,
	Text,
	Pressable,
	ScrollView,
	ActivityIndicator,
	FlatList,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import axios from 'axios';
import { password, username } from '@/utils/apikeys';
import { useQuery } from '@tanstack/react-query';
import CourseItem from '@/components/CourseItem';
// category type
interface categoryProp {
	id: string;
	name: string;
	icon: string;
}
// course type
interface Courses {
	id: number;
	title: string;
	subtitle: string;
	image_480x270: string;
	is_paid: boolean;
	price: string;
	num_reviews: number;
}
interface searchResponse {
	results: Courses[];
}
// category data
const categories: categoryProp[] = [
	{
		id: 'business',
		name: 'Business',
		icon: 'briefcase',
	},
	{
		id: 'tech',
		name: 'Tech',
		icon: 'hardware-chip',
	},
	{
		id: 'design',
		name: 'Design',
		icon: 'color-palette',
	},
	{
		id: 'marketing',
		name: 'Marketing',
		icon: 'megaphone',
	},
	{
		id: 'health',
		name: 'Health',
		icon: 'fitness',
	},
	{
		id: 'music',
		name: 'Music',
		icon: 'musical-notes',
	},
	{
		id: 'lifestyle',
		name: 'Lifestyle',
		icon: 'heart',
	},
];
// fetch data
const fetchCourses = async (searchTerm: string): Promise<searchResponse> => {
	const response = await axios.get(`https://www.udemy.com/api-2.0/courses/`, {
		params: {
			search: searchTerm,
		},
		auth: { username: username, password: password },
	});
	return response.data;
};
// fetch recommended course data
const fetchRecommendedCourses = async (): Promise<searchResponse> => {
	const response = await axios.get(`https://www.udemy.com/api-2.0/courses/`, {
		auth: { username: username, password: password },
	});
	return response.data;
};

export default function HomeScreen() {
	const [selectedCategory, setselectedCategory] = useState('business');
	const { data, error, isLoading, refetch } = useQuery({
		queryKey: ['searchCourses', selectedCategory],
		queryFn: () => fetchCourses(selectedCategory),
		enabled: true,
	});
	// recommended courses calls
	const {
		data: recommendedCourses,
		error: recommendedCoursesError,
		isLoading: recommendedCoursesisLoading,
	} = useQuery({
		queryKey: ['recommendedcourses'],
		queryFn: () => fetchRecommendedCourses(),
	});

	// Render Category
	const renderCategory = ({ item }: { item: categoryProp }) => (
		<Pressable
			onPress={() => setselectedCategory(item.id)}
			className='mr-4 p-2 rounded-full items-center flex-col gap-4'>
			<View
				className={`p-4 rounded-full fle-row items-center ${
					selectedCategory === item.id
						? 'border-2 border-blue-700'
						: 'border border-gray-400'
				}`}>
				<Ionicons
					name={item.icon as any}
					size={24}
					color={selectedCategory === item.id ? '#1d4ed8' : 'gray'}
				/>
			</View>
			<Text
				style={{
					fontFamily:
						selectedCategory === item.id ? 'BarlowBold' : 'BarlowMedium',
				}}>
				{item.name}
			</Text>
		</Pressable>
	);

	return (
		<View className='flex-1 bg-white '>
			{/* greetings */}
			<View className=' pt-16 pb-6 px-6 bg-[#2563eb]'>
				<Animated.View className='flex-row justify-between items-center'>
					<View>
						{/* greetings text */}
						<View className='flex-row items-end gap-2'>
							<Text
								className='text-white text-lg'
								style={{ fontFamily: 'BarlowMedium' }}>
								Good Morning
							</Text>
							<View>
								<HelloWave />
							</View>
						</View>
						{/* flex items */}
						<Text
							className='text-white text-2xl'
							style={{ fontFamily: 'BarlowBold' }}>
							Johnson Smith
						</Text>
					</View>
					<View>
						<MaterialCommunityIcons
							name='bell-badge-outline'
							size={30}
							color='white'
						/>
					</View>
				</Animated.View>
				{/* SEARCH AREA */}
				<Pressable onPress={() => router.push('/explore')}>
					<View className='flex-row items-center bg-white/20 rounded-2xl p-4 mt-4'>
						<MaterialCommunityIcons
							name='magnify'
							size={20}
							color='white'
						/>
						<Text
							className='text-white ml-2 '
							style={{ fontFamily: 'BarlowMedium' }}>
							What Do You Want To Learn?
						</Text>
					</View>
				</Pressable>
			</View>
			<ScrollView className='flex-1 bg-white gap-4'>
				<Animated.View
					className='gap-6'
					entering={FadeInDown.duration(500).delay(200).springify()}>
					<View className='flex-row justify-between px-6 pt-4 items-center'>
						<Text
							className='text-xl '
							style={{ fontFamily: 'BarlowBold' }}>
							Explore Topics
						</Text>
						<Text
							className='text-blue-700 '
							style={{ fontFamily: 'BarlowSemiBold' }}>
							See More
						</Text>
					</View>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						className='mb-4 pl-4'>
						{/* Categories List */}
						{categories.map((category) => (
							<View key={category.id}>
								{renderCategory({ item: category })}
							</View>
						))}
					</ScrollView>
				</Animated.View>
				{/* Category Courses */}
				{isLoading ? (
					<View className='flex-1 justify-center items-center'>
						<ActivityIndicator
							size={'large'}
							color='#2563eb'
						/>
					</View>
				) : error ? (
					<Text>Error: {(error as Error).message}</Text>
				) : data?.results ? (
					<FlatList
						horizontal={true}
						data={data.results}
						renderItem={({ item }) => (
							<CourseItem
								course={item}
								customStyle='w-[22rem] pl-6'
							/>
						)}
						keyExtractor={(item) => item.id.toString()}
						showsHorizontalScrollIndicator={false}
					/>
				) : (
					<View className='flex-1 justify-center items-center'>
						<Text>No Result. Try searching for a different course</Text>
					</View>
				)}
				{/* Recommended Courses */}
				<View className='flex-row justify-between px-6 pt-4 items-center'>
					<Text
						className='text-xl '
						style={{ fontFamily: 'BarlowBold' }}>
						Recommended Courses
					</Text>
					<Text
						className='text-blue-700 '
						style={{ fontFamily: 'BarlowSemiBold' }}>
						See More
					</Text>
				</View>
				{recommendedCoursesisLoading ? (
					<View className='flex-1 justify-center items-center pt-8'>
						<ActivityIndicator
							size={'large'}
							color='#2563eb'
						/>
					</View>
				) : recommendedCoursesError ? (
					<Text>Error: {(recommendedCoursesError as Error).message}</Text>
				) : recommendedCourses?.results ? (
					<FlatList
						horizontal={true}
						data={recommendedCourses.results}
						renderItem={({ item }) => (
							<CourseItem
								course={item}
								customStyle='w-[22rem] pl-6'
							/>
						)}
						keyExtractor={(item) => item.id.toString()}
						showsHorizontalScrollIndicator={false}
					/>
				) : (
					<View className='flex-1 justify-center items-center'>
						<Text>No Result. Try searching for a different course</Text>
					</View>
				)}
			</ScrollView>
		</View>
	);
}
