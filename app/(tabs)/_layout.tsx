import FloatingPlayer from '@/components/FloatingPlayer'
import { Colors } from '@/constants/Colors'
import { FontSize } from '@/constants/Fonts'
import { FontAwesome, FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { Tabs } from 'expo-router'
import { Fragment } from 'react'
import { StyleSheet } from 'react-native'

const TabLayout = () => {
	return (
		<Fragment>
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: Colors.primary,
					tabBarLabelStyle: {
						fontSize: FontSize.sm,
						fontWeight: '500',
					},
					headerShown: false,
					tabBarStyle: {
						position: 'absolute',
						borderTopLeftRadius: 20,
						borderTopRightRadius: 20,
						borderTopWidth: 0,
						paddingTop: 8,
					},
					tabBarBackground: () => (
						<BlurView
							intensity={95}
							style={{
								...StyleSheet.absoluteFillObject,
								overflow: 'hidden',
								borderTopLeftRadius: 20,
								borderTopRightRadius: 20,
							}}
						/>
					),
				}}
			>
				<Tabs.Screen
					name="favourites"
					options={{
						title: 'Favourites',
						tabBarIcon: ({ color, focused, size }) => (
							<FontAwesome name="heart" size={20} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="playlist"
					options={{
						title: 'Playlists',
						tabBarIcon: ({ color, focused, size }) => (
							<MaterialCommunityIcons name="playlist-play" size={28} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="(songs)"
					options={{
						title: 'Songs',
						tabBarIcon: ({ color, focused, size }) => (
							<Ionicons name="musical-notes-sharp" size={24} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="artists"
					options={{
						title: 'Artists',
						tabBarIcon: ({ color, focused, size }) => (
							<FontAwesome6 name="users-line" size={20} color={color} />
						),
					}}
				/>
			</Tabs>
			<FloatingPlayer
				style={{
					position: 'absolute',
					left: 8,
					right: 8,
					bottom: 78,
				}}
			/>
		</Fragment>
	)
}

export default TabLayout
