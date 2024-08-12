import { ArtistTracksList } from '@/components/ArtistTrackList'
import { ScreenPadding } from '@/constants/Fonts'
import { useArtists } from '@/store/library'
import { defaultStyles } from '@/styles'
import { Redirect, useLocalSearchParams } from 'expo-router'
import { View, Text, ScrollView } from 'react-native'

const ArtistDetail = () => {
	const { name: artistName } = useLocalSearchParams<{ name: string }>()
	const artists = useArtists()
	const artist = artists.find((artist) => artist.name === artistName)

	if (!artist) {
		console.warn(`Alert: ${artistName} not found`)
		return <Redirect href={'/(tabs)/artists'} />
	}

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: ScreenPadding.horizontal }}
			>
				<ArtistTracksList artist={artist} />
			</ScrollView>
		</View>
	)
}

export default ArtistDetail
