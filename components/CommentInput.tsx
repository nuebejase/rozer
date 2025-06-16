import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Image } from 'expo-image';
import Colors from '../constants/colors';
import { useAuthStore } from '../hooks/useAuthStore';

interface CommentInputProps {
  onSubmit: (text: string) => void;
}

export default function CommentInput({ onSubmit }: CommentInputProps) {
  const [comment, setComment] = useState('');
  const { user } = useAuthStore();

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment.trim());
      setComment('');
    }
  };

  if (!user) return null;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user.avatar }}
        style={styles.avatar}
        contentFit="cover"
        transition={300}
        
      />
      <TextInput
        style={styles.input}
        placeholder="Add a comment..."
        placeholderTextColor={Colors.light.placeholder}
        value={comment}
        onChangeText={setComment}
        multiline
      />
      <TouchableOpacity 
        onPress={handleSubmit}
        disabled={!comment.trim()}
        style={[styles.postButton, !comment.trim() && styles.disabledButton]}
      >
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    backgroundColor: Colors.light.background,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: Colors.light.text,
    maxHeight: 80,
  },
  postButton: {
    marginLeft: 12,
  },
  postButtonText: {
    color: Colors.light.tint,
    fontWeight: '600',
    fontSize: 14,
  },
  disabledButton: {
    opacity: 0.5,
  },
});