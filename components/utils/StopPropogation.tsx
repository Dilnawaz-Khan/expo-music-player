import { View, Text } from 'react-native'
import { PropsWithChildren } from 'react'

const StopPropogation = ({ children }: PropsWithChildren) => {
	return (
		<View onStartShouldSetResponder={() => true} onTouchEnd={(e) => e.stopPropagation()}>
			{children}
		</View>
	)
}

export default StopPropogation
