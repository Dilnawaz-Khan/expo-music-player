import { ScreenPadding } from '@/constants/Fonts'
import { unknownArtistImageUri } from '@/constants/images'
import { artistNameFilter } from '@/helpers/filter'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useArtists } from '@/store/library'
import { defaultStyles, utilsStyles } from '@/styles'
import { Link } from 'expo-router'
import { Fragment, useMemo } from 'react'
import { View, Text, ScrollView, FlatList, TouchableHighlight, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'

const ItemSeparatorComponent = () => {
	return <View style={[utilsStyles.itemSeparator, { marginLeft: 50, marginVertical: 12 }]} />
}

const ArtistsScreen = () => {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in artist',
		},
	})

	const artists = useArtists()

	const filteredArtists = useMemo(() => {
		if (!search) return artists

		return artists.filter(artistNameFilter(search))
	}, [artists, search])
	return (
		<View style={defaultStyles.container}>
			<ScrollView
				style={{ paddingHorizontal: ScreenPadding.horizontal }}
				contentInsetAdjustmentBehavior="automatic"
			>
				<FlatList
					contentContainerStyle={{ paddingTop: 10, paddingBottom: 120 }}
					scrollEnabled={false}
					data={filteredArtists}
					ItemSeparatorComponent={() => <ItemSeparatorComponent />}
					ListFooterComponent={() => <ItemSeparatorComponent />}
					ListEmptyComponent={() => (
						<View>
							<Text style={utilsStyles.emptyContentText}>No Artist Found</Text>
							<FastImage
								source={{ uri: unknownArtistImageUri, priority: FastImage.priority.normal }}
								style={utilsStyles.emptyContentImage}
							/>
						</View>
					)}
					renderItem={({ item: artisit }) => (
						<Link href={`/artists/${artisit.name}`} asChild>
							<TouchableHighlight activeOpacity={0.8}>
								<View style={styles.artistItemContainer}>
									<View>
										<FastImage
											source={{
												uri: unknownArtistImageUri,
												priority: FastImage.priority.normal,
											}}
											style={styles.artistImage}
										/>
									</View>
									<View style={{ width: '100%' }}>
										<Text numberOfLines={1} style={styles.artistNameText}>
											{artisit.name}
										</Text>
									</View>
								</View>
							</TouchableHighlight>
						</Link>
					)}
				/>
			</ScrollView>
		</View>
	)
}

export default ArtistsScreen

const styles = StyleSheet.create({
	artistItemContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
	},
	artistImage: {
		borderRadius: 32,
		width: 40,
		height: 40,
	},
	artistNameText: {
		...defaultStyles.text,
		fontSize: 17,
		maxWidth: '80%',
	},
})
