import { Colors } from '@/constants/Colors'
import { FontSize } from '@/constants/Fonts'
import { formatSecondsToMinutes } from '@/helpers/miscellaneous'
import { defaultStyles, utilsStyles } from '@/styles'
import { View, Text, ViewProps, StyleSheet } from 'react-native'
import { Slider } from 'react-native-awesome-slider'
import { useSharedValue } from 'react-native-reanimated'
import TrackPlayer, { useProgress } from 'react-native-track-player'

const PlayerProgressBar = ({ style }: ViewProps) => {
	const { duration, position } = useProgress(250)

	const isSliding = useSharedValue(false)
	const progrss = useSharedValue(0)
	const min = useSharedValue(0)
	const max = useSharedValue(1)

	const trackElpsedTime = formatSecondsToMinutes(position)
	const timeRemaing = formatSecondsToMinutes(duration - position)

	if (!isSliding.value) {
		progrss.value = duration > 0 ? position / duration : 0
	}
	return (
		<View style={style}>
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
				onSlidingStart={() => (isSliding.value = true)}
				onValueChange={async (value) => {
					await TrackPlayer.seekTo(value * duration)
				}}
				onSlidingComplete={async (value) => {
					//if user is not sliding then we don't update cur position
					if (!isSliding.value) return

					isSliding.value = false
					await TrackPlayer.seekTo(value * duration)
				}}
			/>
			<View style={styles.timeRow}>
				<Text style={styles.timeText}>{trackElpsedTime}</Text>
				<Text style={styles.timeText}>
					{'-'}
					{timeRemaing}
				</Text>
			</View>
		</View>
	)
}

export default PlayerProgressBar

const styles = StyleSheet.create({
	timeRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'baseline',
		marginTop: 20,
	},
	timeText: {
		...defaultStyles.text,
		color: Colors.text,
		opacity: 0.75,
		fontSize: FontSize.xs,
		letterSpacing: 0.7,
		fontWeight: '500',
	},
})
