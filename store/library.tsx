import { Artist, Playlist, TracksWithPlaylist } from '@/helpers/types'
import { Track } from 'react-native-track-player'
import { create } from 'zustand'

import library from '@/assets/data/library.json'
import { unknownTrackImageUri } from '@/constants/images'

interface LibraryState {
	tracks: TracksWithPlaylist[]
	toggleTrackFavourite: (track: Track) => void
	addToPlaylist: (track: Track, playlistName: string) => void
}

export const useLibraryStore = create<LibraryState>()((set) => ({
	tracks: library,
	toggleTrackFavourite: (track) =>
		set((state) => ({
			tracks: state.tracks.map((curTrack) => {
				if (curTrack.url === track.url) {
					return {
						...curTrack,
						rating: curTrack.rating === 1 ? 0 : 1,
					}
				}
				return curTrack
			}),
		})),
	addToPlaylist: (track, playlistName) =>
		set((state) => ({
			tracks: state.tracks.map((curTrack) => {
				if (curTrack.url === track.url) {
					return {
						...curTrack,
						playlist: [...(curTrack.playlist ?? []), playlistName],
					}
				}
				return curTrack
			}),
		})),
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

export const usePlaylist = () => {
	const playlist = useLibraryStore((state) => {
		return state.tracks.reduce((acc, track) => {
			track.playlist?.forEach((playlistName) => {
				const existingPlaylist = acc.find((playlist) => playlist.name === playlistName)
				if (existingPlaylist) {
					existingPlaylist.tracks.push(track)
				} else {
					acc.push({
						name: playlistName,
						tracks: [track],
						artworkPreview: track.artwork ?? unknownTrackImageUri,
					})
				}
			})

			return acc
		}, [] as Playlist[])
	})

	const addToPlaylist = useLibraryStore((state) => state.addToPlaylist)

	return { playlist, addToPlaylist }
}
