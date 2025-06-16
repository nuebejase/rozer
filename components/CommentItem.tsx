import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import Colors from '../constants/colors';
import { Comment } from '../types/post';

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: comment.avatar }}
        style={styles.avatar}
        contentFit="cover"
        transition={300}
      />
      <View style={styles.commentContent}>
        <Text>
          <Text style={styles.username}>{comment.username}</Text>{' '}
          <Text style={styles.commentText}>{comment.text}</Text>
        </Text>
        <Text style={styles.timestamp}>{comment.timestamp}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  username: {
    fontWeight: '600',
    fontSize: 14,
  },
  commentText: {
    fontSize: 14,
  },
  timestamp: {
    fontSize: 12,
    color: Colors.light.placeholder,
    marginTop: 4,
  },
});