import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { SplashScreen, Stack } from 'expo-router'
import { useSetupTrackPlayer } from '@/hooks/useSetupTrackPlayer'
import { useCallback } from 'react'
import { useLogTrackPlayerState } from '@/hooks/useLogTrackPlayerState'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Colors } from '@/constants/Colors'

SplashScreen.preventAutoHideAsync()

const AppLayout = () => {
	const handleTrackPlayerLoaded = useCallback(() => {
		SplashScreen.hideAsync()
	}, [])
	useSetupTrackPlayer({
		onLoad: handleTrackPlayerLoaded,
	})

	useLogTrackPlayerState()
	return (
		<SafeAreaProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen
						name="player"
						options={{
							presentation: 'card',
							gestureEnabled: true,
							gestureDirection: 'vertical',
							animationDuration: 400,
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="(modals)/addToPlaylist"
						options={{
							presentation: 'modal',
							headerStyle: {
								backgroundColor: Colors.background,
							},
							headerTitle: 'Add to playlist',
							headerTitleStyle: {
								color: Colors.text,
							},
						}}
					/>
				</Stack>
				<StatusBar style="auto" />
			</GestureHandlerRootView>
		</SafeAreaProvider>
	)
}

export default AppLayout
