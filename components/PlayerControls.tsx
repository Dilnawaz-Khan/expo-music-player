import { Colors } from '@/constants/Colors'
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons'
import { View, ViewStyle, TouchableOpacity, StyleSheet } from 'react-native'

import TrackPlayer, { useIsPlaying } from 'react-native-track-player'

type PlayerControlsProps = {
	style?: ViewStyle
}

type PlayerButtonProp = {
	style?: ViewStyle
	iconSize?: number
}

export const PlayPauseButton = ({ style, iconSize = 48 }: PlayerButtonProp) => {
	const { playing } = useIsPlaying()

	return (
		<View style={[{ height: iconSize }, style]}>
			<TouchableOpacity
				onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
				activeOpacity={0.85}
			>
				<FontAwesome6 name={playing ? 'pause' : 'play'} size={iconSize} color={Colors.text} />
			</TouchableOpacity>
		</View>
	)
}

export const SkipToNextButton = ({ iconSize = 30 }: PlayerButtonProp) => {
	const handleSkipToNext = () => TrackPlayer.skipToNext()
	return (
		<TouchableOpacity activeOpacity={0.7} onPress={handleSkipToNext}>
			<FontAwesome6 name="forward" size={iconSize} color={Colors.text} />
		</TouchableOpacity>
	)
}

export const SkipToPreviousButton = ({ iconSize = 30 }: PlayerButtonProp) => {
	const handleSkipToPrevious = () => TrackPlayer.skipToPrevious()
	return (
		<TouchableOpacity activeOpacity={0.7} onPress={handleSkipToPrevious}>
			<FontAwesome6 name="backward" size={iconSize} color={Colors.text} />
		</TouchableOpacity>
	)
}

export const PlayerControls = ({ style }: PlayerControlsProps) => {
	return (
		<View style={[styles.container, style]}>
			<View style={styles.row}>
				<SkipToPreviousButton />
				<PlayPauseButton />
				<SkipToNextButton />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
})
