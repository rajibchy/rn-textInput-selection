import React, { useCallback, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import {
    SafeAreaProvider,
    SafeAreaView,
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';

type Selection = {
    start: number;
    end?: number | undefined;
};

const colors = {
    primary: '#33D49D',
    active: '#2D3748',
    secondary: '#FFFFFF',
    disable: '#A0AEC0',
    border: '#E2E8F0',
    lable: '#B1B1B1',
    red: '#FF6B6B',
    success: '#38A169',
    light: '#EDF2F7',
    yellowgreen: '#a5cc14c7',
    bg: 'white',
    bord: 'white',
    icon: '#2D3748',
    error: '#ff386a'
}

type TestScreenProps = {
    value: string;
    onChangeText: (text: string) => void
}

const TestScreen = React.memo<TestScreenProps>(({
    value, onChangeText
}) => {

    const [selection, setSelection] = useState<Selection | undefined>(undefined);


    const _onSetSelection = useCallback(() => {
        setSelection({
            start: 0, end: value.length
        });
    }, [value]);

    const _onFocus = useCallback(() => {
        setSelection({
            start: 0, end: value.length
        });
    }, [value]);

    const _onChangeText = useCallback(
        (text: string) => {

            onChangeText(text);

            setSelection(s => {
                if (!s) return s;
                return undefined;
            });

        }, [onChangeText]
    );

    console.log(value, selection);

    return (
        <View style={{ flex: 1, flexDirection: 'column', marginHorizontal: 10 }}>
            <TouchableOpacity
                onPress={_onSetSelection}
                style={{
                    backgroundColor: colors.primary,
                    alignItems: 'center',
                    height: 56,
                    borderRadius: 6,
                    justifyContent: 'center'
                }}
            >
                <Text
                    style={{
                        fontSize: 14,
                        textAlign: 'center',
                        color: colors.light
                    }}
                >
                    Set Selection
                </Text>
            </TouchableOpacity>

            <TextInput
                value={value}
                selection={selection}
                onFocus={_onFocus}
                onChangeText={_onChangeText}
                style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    textAlignVertical: 'center'
                }}
            />
        </View>
    );
}, (p, n) => p.value === n.value);

TestScreen.displayName = "TestScreen";

const RootComponent = React.memo(() => {
    const [value, setValue] = useState("12345");
    const _onChangeText = useCallback(
        (text: string) => {

            setValue(text);

        }, []
    );
    return (
        <SafeAreaView
            edges={['top', 'bottom', 'left', 'right']}
            style={{ flex: 1 }}
        >
            <TestScreen
                value={value}
                onChangeText={_onChangeText}
            />
        </SafeAreaView>
    )
}, () => true);

RootComponent.displayName = "RootComponent";
export default RootComponent;