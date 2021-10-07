import SearchIcon from "lib/Icons/SearchIcon"
import { Flex, Input, InputProps, Sans, useSpace } from "palette"
import React, { RefObject } from "react"
import { TextInput, TouchableOpacity, useWindowDimensions } from "react-native"
import Animated, { Easing } from "react-native-reanimated"
import { useAnimatedValue } from "./StickyTabPage/reanimatedHelpers"

interface SearchInputProps extends InputProps {
  enableCancelButton?: boolean
  onCancelPress?: () => void
}

export const SearchInput = React.forwardRef<TextInput, SearchInputProps>(
  ({ enableCancelButton, onChangeText, onClear, onCancelPress, ...props }, ref) => {
    const cancelWidth = useAnimatedValue(0)
    const animationValue = useAnimatedValue(0)
    const { width } = useWindowDimensions()
    const space = useSpace()
    const inputWidth = Animated.sub(width, cancelWidth)

    const animateTo = (toValue: 1 | 0) => {
      Animated.timing(animationValue, {
        toValue,
        easing: Easing.inOut(Easing.ease),
        duration: 180,
      }).start()
    }

    return (
      <Flex flexDirection="row">
        <Animated.View
          style={{
            width: enableCancelButton
              ? animationValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [width, inputWidth],
                })
              : inputWidth,
          }}
        >
          <Input
            ref={ref}
            icon={<SearchIcon width={18} height={18} />}
            autoCorrect={false}
            enableClearButton
            returnKeyType="search"
            onClear={onClear}
            onChangeText={onChangeText}
            {...props}
            onFocus={(e) => {
              animateTo(1)
              props.onFocus?.(e)
            }}
            onBlur={(e) => {
              animateTo(0)
              props.onBlur?.(e)
            }}
          />
        </Animated.View>
        {!!enableCancelButton && (
          <Animated.View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
            onLayout={Animated.event([{ nativeEvent: { layout: { width: cancelWidth } } }])}
          >
            <TouchableOpacity
              onPress={() => {
                ;(ref as RefObject<TextInput>).current?.blur()
                ;(ref as RefObject<TextInput>).current?.clear()
                onCancelPress?.()
              }}
              hitSlop={{ bottom: 40, right: 40, left: 0, top: 40 }}
            >
              <Animated.Text
                style={[
                  {
                    paddingLeft: space(1),
                    opacity: enableCancelButton ? animationValue : 1,
                    transform: [
                      {
                        translateX: enableCancelButton
                          ? animationValue.interpolate({
                              inputRange: [0, 1],
                              outputRange: [cancelWidth, 0],
                            })
                          : 0,
                      },
                    ],
                  },
                ]}
              >
                <Sans size="2" color="black60">
                  Cancel
                </Sans>
              </Animated.Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Flex>
    )
  }
)
