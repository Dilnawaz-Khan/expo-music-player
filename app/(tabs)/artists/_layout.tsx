import { Colors } from '@/constants/Colors'
import { StackScreenWithSearchBar } from '@/constants/layout'
import { defaultStyles } from '@/styles'
import { Stack } from 'expo-router'
import { View, Text } from 'react-native'

const ArtistLayout = () => {
	return (
		<View style={defaultStyles.container}>
			<Stack>
				<Stack.Screen
					name="index"
					options={{ ...StackScreenWithSearchBar, headerTitle: 'Artists' }}
				/>
				<Stack.Screen
					name="[name]"
					options={{
						...StackScreenWithSearchBar,
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

export default ArtistLayout
