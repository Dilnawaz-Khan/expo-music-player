import { useEffect } from 'react'
import Animated, {
	StyleProps,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withRepeat,
	withTiming,
	Easing,
	cancelAnimation,
} from 'react-native-reanimated'

export type MovingTextProps = {
	text: string
	animationThreshold: number
	style?: StyleProps
}

const MovingText = ({ text, animationThreshold, style }: MovingTextProps) => {
	const translateX = useSharedValue(0)
	const shouldAnimate = text.length >= animationThreshold

	const textWidth = text.length * 3

	useEffect(() => {
		if (!shouldAnimate) return
		translateX.value = withDelay(
			1000,
			withRepeat(
				withTiming(-textWidth, {
					duration: 5000,
					easing: Easing.linear,
				}),
				-1,
				true,
			),
		)

		return () => {
			cancelAnimation(translateX)
			translateX.value = 0
		}
	}, [textWidth, translateX, text, animationThreshold, shouldAnimate])

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: translateX.value,
				},
			],
		}
	})
	return (
		<Animated.Text
			numberOfLines={1}
			style={[
				style,
				animatedStyle,
				shouldAnimate && {
					width: 9999, //preventing from ellipsis from appearing
					paddingLeft: 16, //avoid initial characters barely visible
				},
			]}
		>
			{text}
		</Animated.Text>
	)
}

export default MovingText
