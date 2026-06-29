import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  GestureResponderEvent,
  Platform,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

type MotionDirection = 'up' | 'down' | 'left' | 'right' | 'none';

type MotionViewProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  animateKey?: string | number | boolean;
  delay?: number;
  distance?: number;
  duration?: number;
  from?: MotionDirection;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const useNativeMotionDriver = Platform.OS !== 'web';

function offsetForDirection(direction: MotionDirection, distance: number) {
  switch (direction) {
    case 'up':
      return { x: 0, y: distance };
    case 'down':
      return { x: 0, y: -distance };
    case 'left':
      return { x: distance, y: 0 };
    case 'right':
      return { x: -distance, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
}

export function MotionView({
  children,
  style,
  animateKey = 'mount',
  delay = 0,
  distance = 18,
  duration = 420,
  from = 'up',
}: MotionViewProps) {
  const progress = useRef(new Animated.Value(0)).current;
  const offset = offsetForDirection(from, distance);

  useEffect(() => {
    progress.stopAnimation();
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      delay,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: useNativeMotionDriver,
    }).start();
  }, [animateKey, delay, duration, progress]);

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [offset.x, 0],
  });
  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [offset.y, 0],
  });
  const scale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.985, 1],
  });

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: progress,
          transform: [{ translateX }, { translateY }, { scale }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

type PressableScaleProps = PressableProps & {
  activeScale?: number;
  style?: StyleProp<ViewStyle>;
};

export function PressableScale({
  activeScale = 0.97,
  disabled,
  onPressIn,
  onPressOut,
  style,
  children,
  ...props
}: PressableScaleProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressTo = (toValue: number) => {
    Animated.spring(scale, {
      toValue,
      speed: 24,
      bounciness: 5,
      useNativeDriver: useNativeMotionDriver,
    }).start();
  };

  const handlePressIn = (event: GestureResponderEvent) => {
    if (!disabled) {
      pressTo(activeScale);
    }
    onPressIn?.(event);
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    pressTo(1);
    onPressOut?.(event);
  };

  return (
    <AnimatedPressable
      {...props}
      disabled={disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        style,
        {
          opacity: disabled ? 0.72 : 1,
          transform: [{ scale }],
        },
      ]}
    >
      {children}
    </AnimatedPressable>
  );
}

export function FloatingView({
  children,
  style,
  distance = 5,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  distance?: number;
}) {
  const float = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(float, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: useNativeMotionDriver,
        }),
        Animated.timing(float, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: useNativeMotionDriver,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [float]);

  const translateY = float.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -distance],
  });

  return (
    <Animated.View style={[style, { transform: [{ translateY }] }]}>
      {children}
    </Animated.View>
  );
}

export function SpinningView({
  children,
  style,
  duration = 1100,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  duration?: number;
}) {
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: useNativeMotionDriver,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [duration, spin]);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[style, { transform: [{ rotate }] }]}>
      {children}
    </Animated.View>
  );
}
