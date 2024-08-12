import { View, Text } from 'react-native'
import { defaultStyles } from '@/styles'
import { Stack } from 'expo-router'

import { StackScreenWithSearchBar } from '@/constants/layout'

const SongLayout = () => {
	return (
		<View style={defaultStyles.container}>
			<Stack>
				<Stack.Screen
					name="index"
					options={{
						...StackScreenWithSearchBar,
						headerTitle: 'Songs',
					}}
				/>
			</Stack>
		</View>
	)
}

export default SongLayout
