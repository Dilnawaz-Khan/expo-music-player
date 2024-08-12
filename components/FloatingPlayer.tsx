import { unknownTrackImageUri } from '@/constants/images'
import { defaultStyles } from '@/styles'
import { Fragment } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ViewProps } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Track, useActiveTrack } from 'react-native-track-player'
import { PlayPauseButton, SkipToNextButton } from '@/components/PlayerControls'

const FloatingPlayer = ({ style }: ViewProps) => {
	const activeTrack = useActiveTrack()

	const displayTrack: Track = activeTrack ?? {
		title: 'This is just a song',
	}

	if (!displayTrack) return null
	return (
		<TouchableOpacity activeOpacity={0.9} style={[styles.container, style]}>
			<Fragment>
				<FastImage
					source={{
						uri: displayTrack.artwork ?? unknownTrackImageUri,
					}}
					style={styles.trackArtWorkImage}
				/>
				<View style={styles.trackTitleContainer}>
					<Text style={styles.trackTitle}>{displayTrack.title}</Text>
				</View>
				<View style={styles.trackControlsContainer}>
					<PlayPauseButton iconSize={24} />
					<SkipToNextButton iconSize={22} />
				</View>
			</Fragment>
		</TouchableOpacity>
	)
}

export default FloatingPlayer

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#252525',
		padding: 8,
		borderRadius: 12,
		paddingVertical: 10,
	},
	trackArtWorkImage: {
		borderRadius: 8,
		height: 40,
		width: 40,
	},
	trackTitle: {
		...defaultStyles.text,
		fontSize: 18,
		fontWeight: '800',
		paddingLeft: 10,
	},
	trackTitleContainer: {
		flex: 1,
		overflow: 'hidden',
		marginLeft: 10,
	},
	trackControlsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 20,
		marginRight: 16,
		paddingLeft: 16,
	},
})
