import { Artist, TracksWithPlaylist } from '@/helpers/types'
import { Track } from 'react-native-track-player'
import { create } from 'zustand'

import library from '@/assets/data/library.json'

interface LibraryState {
	tracks: TracksWithPlaylist[]
	toggleTrackFavourite: (track: Track) => void
	addToPlaylist: (track: Track, playlistName: string) => void
}

export const useLibraryStore = create<LibraryState>()((set) => ({
	tracks: library,
	toggleTrackFavourite: () => {},
	addToPlaylist: () => {},
}))

export const useTracks = () => useLibraryStore((state) => state.tracks)

export const useFavourites = () => {
	const favourites = useLibraryStore((state) => state.tracks.filter((track) => track.rating))
	const toggleTrackFavourite = useLibraryStore((state) => state.toggleTrackFavourite)
	return {
		favourites,
		toggleTrackFavourite,
	}
}

export const useArtists = () =>
	useLibraryStore((state) => {
		return state.tracks.reduce((acc, track) => {
			const existingArtist = acc.find((artist) => artist.name === track.artist)
			if (existingArtist) {
				existingArtist.tracks.push(track)
			} else {
				acc.push({
					name: track.artist || 'Unknown',
					tracks: [track],
				})
			}
			return acc
		}, [] as Artist[])
	})
