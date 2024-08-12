import { Colors } from '@/constants/Colors'
import { FontSize } from '@/constants/Fonts'
import { unknownTrackImageUri } from '@/constants/images'
import { defaultStyles } from '@/styles'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Track } from 'react-native-track-player'

export interface TrackListItemProps {
	track: Track
}

const TrackListItem = ({ track }: TrackListItemProps) => {
	const isActiveTrack = false
	return (
		<TouchableHighlight>
			<View style={styles.playlistItemContainer}>
				<View>
					<FastImage
						source={{
							uri: track.artwork ?? unknownTrackImageUri,
							priority: FastImage.priority.normal,
						}}
						style={{
							...styles.trackArtWorkImage,
							opacity: isActiveTrack ? 0.6 : 1,
						}}
					/>
				</View>
				{/* track title and artist */}
				<View style={{ width: '100%' }}>
					<Text
						numberOfLines={1}
						style={{
							...styles.trackTitleText,
							color: isActiveTrack ? Colors.primary : Colors.text,
						}}
					>
						{track.title}
					</Text>
					{track?.artist && (
						<Text numberOfLines={1} style={styles.trackArtistText}>
							{track.artist}
						</Text>
					)}
				</View>
			</View>
		</TouchableHighlight>
	)
}

export default TrackListItem

const styles = StyleSheet.create({
	playlistItemContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
		paddingRight: 90,
	},
	trackArtWorkImage: {
		borderRadius: 8,
		height: 50,
		width: 50,
	},
	trackTitleText: {
		...defaultStyles.text,
		fontSize: FontSize.sm,
		fontWeight: '600',
		maxWidth: '90%',
	},
	trackArtistText: {
		...defaultStyles.text,
		color: Colors.textMuted,
		fontSize: 14,
		marginTop: 4,
	},
})
