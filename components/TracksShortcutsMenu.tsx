import { useFavourites } from '@/store/library'
import { useQueue } from '@/store/queue'
import { MenuView } from '@react-native-menu/menu'
import { useRouter } from 'expo-router'
import { PropsWithChildren } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import TrackPlayer, { Track } from 'react-native-track-player'
import { match } from 'ts-pattern'

type TracksShortcutsMenuProps = PropsWithChildren<{ track: Track }>

const TracksShortcutsMenu = ({ track, children }: TracksShortcutsMenuProps) => {
	const router = useRouter()
	const isFavourite = track.rating === 1

	const { toggleTrackFavourite } = useFavourites()
	const { activeQueueId } = useQueue()

	const handlePressAction = (id: string) => {
		match(id)
			.with('add-to-favourites', async () => {
				toggleTrackFavourite(track)
				//if the track is favourite then  add in favourite queue
				if (activeQueueId?.startsWith('favourites')) {
					await TrackPlayer.add(track)
				}
			})
			.with('remove-from-favourites', async () => {
				toggleTrackFavourite(track)

				//if the track is un-favourite then  removew from favourite queue
				if (activeQueueId?.startsWith('favourites')) {
					const queue = await TrackPlayer.getQueue()
					const trackToRemove = queue.findIndex((queueTrack) => queueTrack.url === track.url)
					await TrackPlayer.remove(trackToRemove)
				}
			})
			.with('add-to-playlist', () => {
				router.push({
					pathname: '/(modals)/addToPlaylist',
					params: {
						trackUrl: track.url,
					},
				})
			})
			.otherwise(() => console.warn(`unknown menu action: ${id}`))
	}

	return (
		<MenuView
			onPressAction={({ nativeEvent: { event } }) => handlePressAction(event)}
			actions={[
				{
					id: isFavourite ? 'remove-from-favourites' : 'add-to-favourites',
					title: isFavourite ? 'Remove from favourites' : 'Add to favourites',
					image: isFavourite ? 'star.fill' : 'star',
				},
				{
					id: 'add-to-playlist',
					title: 'Add to playlist',
					image: 'plus',
				},
			]}
		>
			{children}
		</MenuView>
	)
}

export default TracksShortcutsMenu

const styles = StyleSheet.create({})
