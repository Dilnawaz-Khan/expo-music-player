import PlaylistsList from '@/components/PlaylistsList'
import { ScreenPadding } from '@/constants/Fonts'
import { playlistNameFilter } from '@/helpers/filter'
import { Playlist } from '@/helpers/types'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { usePlaylist } from '@/store/library'
import { defaultStyles } from '@/styles'
import { useRouter } from 'expo-router'
import { useMemo } from 'react'
import { View, Text, ScrollView } from 'react-native'

const PlaylistScreen = () => {
	const router = useRouter()
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in playist',
		},
	})

	const { playlist, addToPlaylist } = usePlaylist()

	const filteredPlaylist = useMemo(() => {
		return playlist.filter(playlistNameFilter(search))
	}, [search, playlist])

	const handlePlaylistPress = (playlist: Playlist) => {
		router.push(`/(tabs)/playlist/${playlist.name}`)
	}
	return (
		<View style={defaultStyles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: ScreenPadding.horizontal }}
			>
				<PlaylistsList
					scrollEnabled={false}
					playlists={filteredPlaylist}
					onPlaylistPress={handlePlaylistPress}
				/>
			</ScrollView>
		</View>
	)
}

export default PlaylistScreen
