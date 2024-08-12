import { Colors } from '@/constants/Colors'
import { useTrackPlayerVolume } from '@/hooks/useTrackPlayerVolume'
import { utilsStyles } from '@/styles'
import { Ionicons } from '@expo/vector-icons'
import { View, Text, ViewProps } from 'react-native'
import { Slider } from 'react-native-awesome-slider'
import { useSharedValue } from 'react-native-reanimated'
import TrackPlayer from 'react-native-track-player'

const PlayerVolumeBar = ({ style }: ViewProps) => {
	const { volume, updateVolume } = useTrackPlayerVolume()
	const progrss = useSharedValue(0)
	const min = useSharedValue(0)
	const max = useSharedValue(1)

	progrss.value = volume ?? 0
	return (
		<View style={style}>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<Ionicons name="volume-low" color={Colors.icon} size={20} style={{ opacity: 0.8 }} />
				<View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 10 }}>
					<Slider
						progress={progrss}
						minimumValue={min}
						maximumValue={max}
						containerStyle={utilsStyles.slider}
						thumbWidth={0}
						renderBubble={() => null}
						theme={{
							maximumTrackTintColor: Colors.maximumTrackTintColor,
							minimumTrackTintColor: Colors.minimumTrackTintColor,
						}}
						onValueChange={async (value) => {
							updateVolume(value)
						}}
					/>
				</View>
				<Ionicons name="volume-high" color={Colors.icon} size={20} style={{ opacity: 0.8 }} />
			</View>
		</View>
	)
}

export default PlayerVolumeBar
