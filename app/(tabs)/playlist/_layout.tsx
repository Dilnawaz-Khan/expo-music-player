import { Colors } from '@/constants/Colors'
import { StackScreenWithSearchBar } from '@/constants/layout'
import { defaultStyles } from '@/styles'
import { Stack } from 'expo-router'
import { View, Text } from 'react-native'

const PlaylistLayout = () => {
	return (
		<View style={defaultStyles.container}>
			<Stack>
				<Stack.Screen
					name="index"
					options={{ ...StackScreenWithSearchBar, headerTitle: 'Playlist' }}
				/>
				<Stack.Screen
					name="[name]"
					options={{
						headerTitle: '',
						headerBackVisible: true,
						headerStyle: {
							backgroundColor: Colors.background,
						},
						headerTintColor: Colors.primary,
					}}
				/>
			</Stack>
		</View>
	)
}

export default PlaylistLayout
