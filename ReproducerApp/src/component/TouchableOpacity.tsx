/*
* Copyright FSys Tech Limited [FSys]. All rights reserved.
*
* This software owned by FSys Tech Limited [FSys] and is protected by copyright law
* and international copyright treaties.
*
* Access to and use of the software is governed by the terms of the applicable FSys Software
* Services Agreement (the Agreement) and Customer end user license agreements granting
* a non-assignable, non-transferable and non-exclusive license to use the software
* for it's own data processing purposes under the terms defined in the Agreement.
*
* Except as otherwise granted within the terms of the Agreement, copying or reproduction of any part
* of this source code or associated reference material to any other location for further reproduction
* or redistribution, and any amendments to this copyright notice, are expressly prohibited.
*
* Any reproduction or redistribution for sale or hiring of the Software not in accordance with
* the terms of the Agreement is a violation of copyright law.
*/
// @ts-check

// by rajib chy
// 1:03 PM 5/16/2026

import React, { useCallback } from 'react';
import { Pressable, PressableProps, PressableStateCallbackType } from 'react-native-gesture-handler';

/**
 * # TouchableOpacity
 * Cross-platform `TouchableOpacity` component.
 * 
 * - On **Android**, uses the native `TouchableOpacity` from `react-native`.
 * - On **iOS**, uses `Pressable` from `react-native-gesture-handler`, aliased as `TouchableOpacity`.
 */
// export const TouchableOpacity = Pressable;

/**
 * Base iOS `TouchableOpacity` component.
 * 
 * This always refers to `Pressable` from `react-native-gesture-handler`, regardless of platform.
 * Useful if you need direct access to the iOS-specific version.
 */
export { Pressable as TouchableOpacityBase };

type TouchableOpacityProps = PressableProps & {
    readonly activeOpacity?: number;
    readonly withFeedback?: boolean;
}

const TouchableOpacity: React.FC<TouchableOpacityProps> = ({
    style,
    children,
    withFeedback = true,
    activeOpacity = 1,
    ...props
}) => {

    const _styleCallback = useCallback((state: PressableStateCallbackType) => {
        const baseStyle =
            typeof style === 'function'
                ? style(state)
                : style;

        if (!withFeedback) {
            return [
                baseStyle, {
                    opacity: activeOpacity,
                },
            ];
        }

        return [
            baseStyle, {
                opacity: state.pressed ? 0.5 : activeOpacity,
            },
        ];
    }, [activeOpacity, style]);

    return (
        <Pressable
            {...props}
            style={_styleCallback}
        >
            {children}
        </Pressable>
    );
}

TouchableOpacity.displayName = "PressableTouchableOpacity";

export { TouchableOpacity };