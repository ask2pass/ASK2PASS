import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import type { AATAssetProfile } from './aatAssets';

interface Props {
  avatar: AATAssetProfile;
  speaking?: boolean;
  children?: React.ReactNode;
}

export default function AATPresentation({
  avatar,
  speaking = false,
  children,
}: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={avatar.image}
        style={[styles.avatar, speaking && styles.speaking]}
        resizeMode="contain"
      />

      <View style={styles.identity}>
        <Text style={styles.name}>{avatar.name}</Text>
        <Text style={styles.role}>
          {avatar.specialty
            ? `${avatar.role} • ${avatar.specialty}`
            : avatar.role}
        </Text>
      </View>

      <View style={styles.whiteboard}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  avatar: {
    width: '100%',
    height: 320,
  },
  speaking: {
    transform: [{ scale: 1.01 }],
  },
  identity: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
  },
  role: {
    fontSize: 14,
    marginTop: 3,
  },
  whiteboard: {
    flex: 1,
    margin: 12,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    minHeight: 180,
  },
});
