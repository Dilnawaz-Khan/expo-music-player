import TracksList from '@/components/TracksList'
import { defaultStyles } from '@/styles'
import { View, Text, ScrollView } from 'react-native'

import library from '@/assets/data/library.json'
import { ScreenPadding } from '@/constants/Fonts'
import { useMemo } from 'react'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useFavourites } from '@/store/library'
import { trackTitleFilter } from '@/helpers/filter'
import { generateTracksListId } from '@/helpers/miscellaneous'

const FavouriteScreen = () => {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in songs',
		},
	})
	const favouriteTracks = useFavourites().favourites

	const filteredFavouritesTracks = useMemo(() => {
		if (!search) return favouriteTracks
		return favouriteTracks.filter(trackTitleFilter(search))
	}, [search])

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				style={{ paddingHorizontal: ScreenPadding.horizontal }}
				contentInsetAdjustmentBehavior="automatic"
			>
				<TracksList
					id={generateTracksListId('favourites', search)}
					scrollEnabled={false}
					tracks={filteredFavouritesTracks}
				/>
			</ScrollView>
		</View>
	)
}

export default FavouriteScreen
