import { View, Text, FlatList, FlatListProps } from 'react-native'

import library from '@/assets/data/library.json'
import TrackListItem from './TrackListItem'
import { utilsStyles } from '@/styles'
import TrackPlayer, { Track } from 'react-native-track-player'
import FastImage from 'react-native-fast-image'
import { unknownTrackImageUri } from '@/constants/images'
import { useQueue } from '@/store/queue'
import { useRef } from 'react'

export type TracksListProps = Partial<FlatListProps<Track>> & {
	id: string
	tracks: Track[]
}

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

const TracksList = ({ id, tracks, ...flatlistProps }: TracksListProps) => {
	const queueOffset = useRef(0)
	const { activeQueueId, setActiveQueueId } = useQueue()
	const handleTrackSelect = async (selectedTrack: Track) => {
		const trackIndex = tracks.findIndex((track) => track.url == selectedTrack.url)
		if (trackIndex === -1) return

		const isChangingQueue = id !== activeQueueId

		if (isChangingQueue) {
			const beforeTracks = tracks.splice(0, trackIndex)
			const afterTracks = tracks.splice(trackIndex + 1)

			//reset the queue
			await TrackPlayer.reset()

			//construct the new queue
			await TrackPlayer.add(selectedTrack)
			await TrackPlayer.add(afterTracks)
			await TrackPlayer.add(beforeTracks)

			// play the currently selected song
			await TrackPlayer.play()

			//updating the offset
			queueOffset.current = trackIndex

			//update store queue id
			setActiveQueueId(id)
		} else {
			const nextTrackIndex =
				trackIndex - queueOffset.current < 0
					? tracks.length + trackIndex - queueOffset.current
					: trackIndex - queueOffset.current
			await TrackPlayer.skip(nextTrackIndex)
			await TrackPlayer.play()
		}
	}
	return (
		<FlatList
			data={tracks}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 108 }}
			renderItem={({ item: track }) => (
				<TrackListItem track={track} onTrackSelect={handleTrackSelect} />
			)}
			ItemSeparatorComponent={ItemDivider}
			ListFooterComponent={ItemDivider}
			ListEmptyComponent={
				<View>
					<Text style={utilsStyles.emptyContentText}>No Song Found</Text>
					<FastImage
						source={{
							uri: unknownTrackImageUri,
							priority: FastImage.priority.normal,
						}}
						style={utilsStyles.emptyContentImage}
					/>
				</View>
			}
			{...flatlistProps}
		/>
	)
}

export default TracksList
