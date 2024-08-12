import { unknownTrackImageUri } from '@/constants/images'
import { playlistNameFilter } from '@/helpers/filter'
import { Playlist } from '@/helpers/types'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { utilsStyles } from '@/styles'
import { useMemo } from 'react'
import { FlatList, FlatListProps, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { PlaylistListItem } from './PlaylistListItem'

type PlaylistsListProps = {
	playlists: Playlist[]
	onPlaylistPress: (playlist: Playlist) => void
} & Partial<FlatListProps<Playlist>>

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginLeft: 80, marginVertical: 12 }} />
)

const PlaylistsList = ({ playlists, onPlaylistPress, ...props }: PlaylistsListProps) => {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in playlist',
		},
	})

	const filteredPlaylist = useMemo(() => {
		return playlists.filter(playlistNameFilter(search))
	}, [search, playlists])
	return (
		<FlatList
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 120 }}
			data={filteredPlaylist}
			ItemSeparatorComponent={ItemDivider}
			ListFooterComponent={ItemDivider}
			ListEmptyComponent={
				<View>
					<Text style={utilsStyles.emptyContentText}>No playlist found</Text>

					<FastImage
						source={{ uri: unknownTrackImageUri, priority: FastImage.priority.normal }}
						style={utilsStyles.emptyContentImage}
					/>
				</View>
			}
			renderItem={({ item: playlist }) => (
				<PlaylistListItem playlist={playlist} onPress={() => onPlaylistPress(playlist)} />
			)}
			{...props}
		/>
	)
}

export default PlaylistsList

const styles = StyleSheet.create({})
