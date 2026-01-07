import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Platform } from 'react-native';
import Colors from '../constants/Colors';

interface Props {
    timeUntilMidnight: string;
}

const DoomsdayClock: React.FC<Props> = ({ timeUntilMidnight }) => {
    const [pulse] = useState(new Animated.Value(1));

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulse, {
                    toValue: 1.1,
                    duration: 1000,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.ease),
                }),
                Animated.timing(pulse, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.ease),
                }),
            ])
        ).start();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.clockOuter}>
                <Animated.View style={[styles.clockInner, { transform: [{ scale: pulse }] }]}>
                    <Text style={styles.timeText}>{timeUntilMidnight.split(' ')[0]}</Text>
                    <Text style={styles.unitText}>{timeUntilMidnight.split(' ').slice(1).join(' ')}</Text>
                </Animated.View>
            </View>
            <View style={styles.warningContainer}>
                <Text style={styles.warningText}>IT IS MIDNIGHT'S EVE</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 40,
    },
    clockOuter: {
        width: 280,
        height: 280,
        borderRadius: 140,
        borderWidth: 2,
        borderColor: Colors.midnight.accent,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 59, 48, 0.05)',
    },
    clockInner: {
        width: 240,
        height: 240,
        borderRadius: 120,
        borderWidth: 8,
        borderColor: Colors.midnight.accent,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.midnight.background,
        shadowColor: Colors.midnight.accent,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
        elevation: 20,
    },
    timeText: {
        fontSize: 72,
        fontWeight: '900',
        color: Colors.midnight.accent,
        fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    },
    unitText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.midnight.text,
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    warningContainer: {
        marginTop: 30,
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: Colors.midnight.accent,
        borderRadius: 4,
    },
    warningText: {
        color: '#000',
        fontWeight: '900',
        fontSize: 14,
        letterSpacing: 4,
    },
});

export default DoomsdayClock;
