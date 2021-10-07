import SearchIcon from "lib/Icons/SearchIcon"
import { Flex, Input, InputProps, Sans, useSpace } from "palette"
import React, { RefObject, useRef, useState } from "react"
import { Animated, Easing, LayoutChangeEvent, TextInput, TouchableOpacity, useWindowDimensions } from "react-native"

interface SearchInputProps extends InputProps {
  enableCancelButton?: boolean
  onCancelPress?: () => void
}

export const SearchInput = React.forwardRef<TextInput, SearchInputProps>(
  ({ enableCancelButton, onChangeText, onClear, onCancelPress, ...props }, ref) => {
    const [cancelWidth, setCancelWidth] = useState(0)
    const animationValue = useRef(new Animated.Value(0)).current
    const { width } = useWindowDimensions()
    const space = useSpace()

    console.log("[debug] width", width)

    const animateTo = (toValue: 1 | 0) => {
      Animated.timing(animationValue, {
        toValue,
        easing: Easing.linear,
        duration: 200,
        useNativeDriver: false,
      }).start()
    }

    const handleLayout = (event: LayoutChangeEvent) => {
      setCancelWidth(event.nativeEvent.layout.width)
    }

    return (
      <Flex flexDirection="row">
        <Animated.View
          style={{
            width: enableCancelButton
              ? animationValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [width, width - cancelWidth],
                })
              : width - cancelWidth,
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
          <Flex alignItems="center" onLayout={handleLayout} justifyContent="center" flexDirection="row">
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
          </Flex>
        )}
      </Flex>
    )
  }
)
