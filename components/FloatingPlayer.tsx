import { unknownTrackImageUri } from '@/constants/images'
import { defaultStyles } from '@/styles'
import { Fragment } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ViewProps } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Track, useActiveTrack } from 'react-native-track-player'
import { PlayPauseButton, SkipToNextButton } from '@/components/PlayerControls'
import { useLastActiveTrack } from '@/hooks/useLastActiveTrack'
import MovingText from './MovingText'
import { useRouter } from 'expo-router'

const FloatingPlayer = ({ style }: ViewProps) => {
	const router = useRouter()
	const activeTrack = useActiveTrack()
	const lastActiveTrack = useLastActiveTrack()

	const displayTrack = activeTrack ?? lastActiveTrack

	const handlePress = () => {
		router.navigate('/player')
	}

	if (!displayTrack) return null
	return (
		<TouchableOpacity onPress={handlePress} activeOpacity={0.9} style={[styles.container, style]}>
			<Fragment>
				<FastImage
					source={{
						uri: displayTrack.artwork ?? unknownTrackImageUri,
					}}
					style={styles.trackArtWorkImage}
				/>
				<View style={styles.trackTitleContainer}>
					<MovingText
						style={styles.trackTitle}
						text={displayTrack.title ?? ''}
						animationThreshold={22}
					/>
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
