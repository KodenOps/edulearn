import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useColorScheme } from '@/hooks/useColorScheme';
// Import your global CSS file
import '../global.css';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();
export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
		BarlowBold: require('../assets/fonts/Barlow-Bold.ttf'),
		BarlowRegular: require('../assets/fonts/Barlow-Regular.ttf'),
		BarlowSemiBold: require('../assets/fonts/Barlow-SemiBold.ttf'),
		BarlowExtraBold: require('../assets/fonts/Barlow-ExtraBold.ttf'),
		BarlowMedium: require('../assets/fonts/Barlow-Medium.ttf'),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
				<Stack
					screenOptions={{
						headerShown: false,
					}}>
					<Stack.Screen name='index' />
					<Stack.Screen
						name='(tabs)'
						options={{ headerShown: false }}
					/>
					<Stack.Screen name='+not-found' />
				</Stack>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
