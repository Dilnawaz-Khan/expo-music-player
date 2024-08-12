import TracksList from '@/components/TracksList'
import { ScreenPadding } from '@/constants/Fonts'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import { View, Text, ScrollView } from 'react-native'

import { trackTitleFilter } from '@/helpers/filter'
import { useMemo } from 'react'
import { useTracks } from '@/store/library'
import { generateTracksListId } from '@/helpers/miscellaneous'

const SongScreen = () => {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in songs',
		},
	})

	const tracks = useTracks()

	const filteredTracks = useMemo(() => {
		if (!search) return tracks

		return tracks.filter(trackTitleFilter(search))
	}, [search, tracks])

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: ScreenPadding.horizontal }}
			>
				<TracksList
					id={generateTracksListId('songs', search)}
					tracks={filteredTracks}
					scrollEnabled={false}
				/>
			</ScrollView>
		</View>
	)
}

export default SongScreen
