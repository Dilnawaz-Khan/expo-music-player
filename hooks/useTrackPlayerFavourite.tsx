import { useFavourites } from '@/store/library'
import { useCallback } from 'react'
import TrackPlayer, { useActiveTrack } from 'react-native-track-player'

export const useTrackPlayerFavorite = () => {
	const activeTrack = useActiveTrack()

	const { favourites, toggleTrackFavourite } = useFavourites()

	const isFavorite = favourites.find((track) => track.url === activeTrack?.url)?.rating === 1

	//updating track player and application internal state
	const toggleFavorite = useCallback(async () => {
		const id = await TrackPlayer.getActiveTrackIndex()

		if (id == null) return

		//updating track player internal state
		await TrackPlayer.updateMetadataForTrack(id, {
			rating: isFavorite ? 0 : 1,
		})

		// application internal state
		if (activeTrack) {
			toggleTrackFavourite(activeTrack)
		}
	}, [isFavorite, toggleTrackFavourite, activeTrack])
	return {
		isFavorite,
		toggleFavorite,
	}
}
