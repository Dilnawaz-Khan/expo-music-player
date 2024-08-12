import { Colors } from '@/constants/Colors'
import { useTrackRepeatMode } from '@/hooks/useTrackRepeatMode'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ComponentProps } from 'react'
import { View, Text } from 'react-native'
import { RepeatMode } from 'react-native-track-player'
import { match } from 'ts-pattern'

type IconProps = Omit<ComponentProps<typeof MaterialCommunityIcons>, 'name'>
type IconName = ComponentProps<typeof MaterialCommunityIcons>['name']

const repeatOrder = [RepeatMode.Off, RepeatMode.Track, RepeatMode.Queue] as const

const PlayerRepeatToggle = ({ ...props }: IconProps) => {
	const { repeatMode, changeRepeatMode } = useTrackRepeatMode()

	const toggleRepeatMode = () => {
		if (repeatMode == null) return

		const curIndex = repeatOrder.indexOf(repeatMode)
		const nextIndex = (curIndex + 1) % repeatOrder.length
		changeRepeatMode(repeatOrder[nextIndex])
	}

	const icon = match(repeatMode)
		.returnType<IconName>()
		.with(RepeatMode.Off, () => 'repeat-off')
		.with(RepeatMode.Track, () => 'repeat-once')
		.with(RepeatMode.Queue, () => 'repeat')
		.otherwise(() => 'repeat-off')
	return (
		<MaterialCommunityIcons name={icon} onPress={toggleRepeatMode} color={Colors.icon} {...props} />
	)
}

export default PlayerRepeatToggle
