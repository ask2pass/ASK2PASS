import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  content?: string;
  action?: 'WRITE' | 'DRAW' | 'HIGHLIGHT' | 'DEMONSTRATE';
  saveAsNote?: boolean;
}

export default function AATWhiteboard({
  content,
  action = 'WRITE',
  saveAsNote = false,
}: Props) {
  return (
    <View style={styles.board}>
      <Text style={styles.action}>{action}</Text>
      {content ? <Text style={styles.content}>{content}</Text> : null}
      {saveAsNote ? <Text style={styles.note}>Saved as student note</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    flex: 1,
    minHeight: 220,
    borderWidth: 1,
    borderRadius: 12,
    padding: 18,
  },
  action: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 12,
  },
  content: {
    fontSize: 20,
    lineHeight: 30,
  },
  note: {
    marginTop: 16,
    fontSize: 12,
  },
});
