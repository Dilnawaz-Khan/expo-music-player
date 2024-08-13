import PlaylistsList from '@/components/PlaylistsList'
import { Playlist } from '@/helpers/types'
import { usePlaylist, useTracks } from '@/store/library'
import { useQueue } from '@/store/queue'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TrackPlayer, { Track } from 'react-native-track-player'
import { useHeaderHeight } from '@react-navigation/elements'
import { defaultStyles } from '@/styles'
import { ScreenPadding } from '@/constants/Fonts'

const AddToPlaylistModal = () => {
	const headerHeight = useHeaderHeight()
	const router = useRouter()
	const { activeQueueId } = useQueue()
	const { trackUrl } = useLocalSearchParams<{ trackUrl: Track['url'] }>()
	const { playlist: playlists, addToPlaylist } = usePlaylist()
	const tracks = useTracks()

	const track = tracks.find((currentTrack) => currentTrack.url === trackUrl)

	//track not found
	if (!track) return null

	const availablePlaylists = playlists.filter(
		(playlist) => !playlist.tracks.some((playlistTrack) => playlistTrack.url === trackUrl),
	)

	const handlePlaylistPress = async (playlist: Playlist) => {
		addToPlaylist(track, playlist.name)

		router.dismiss()

		//if the current queue is the playlist where we are adding
		//to, add the track at the end of track-queue
		if (activeQueueId?.startsWith(playlist.name)) {
			await TrackPlayer.add(track)
		}
	}
	return (
		<SafeAreaView style={[styles.modalContainer, { paddingTop: headerHeight }]}>
			<PlaylistsList playlists={availablePlaylists} onPlaylistPress={handlePlaylistPress} />
		</SafeAreaView>
	)
}

export default AddToPlaylistModal

const styles = StyleSheet.create({
	modalContainer: {
		...defaultStyles.container,
		paddingHorizontal: ScreenPadding.horizontal,
	},
})
