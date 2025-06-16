import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react-native';
import Colors from '../constants/colors';

interface PostFooterProps {
  caption: string;
  username: string;
  likes: number;
  comments: number;
  timestamp: string;
  liked: boolean;
  saved: boolean;
  onLikePress: () => void;
  onCommentPress: () => void;
  onSharePress: () => void;
  onSavePress: () => void;
}

export default function PostFooter({
  caption,
  username,
  likes,
  comments,
  timestamp,
  liked,
  saved,
  onLikePress,
  onCommentPress,
  onSharePress,
  onSavePress,
}: PostFooterProps) {
  // Function to highlight hashtags in caption
  const renderCaption = () => {
    const words = caption.split(' ');
    return words.map((word, index) => {
      if (word.startsWith('#')) {
        return (
          <Text key={index} style={styles.hashtag}>
            {word}{' '}
          </Text>
        );
      }
      return <Text key={index}>{word} </Text>;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity onPress={onLikePress} style={styles.actionButton}>
            <Heart
              size={24}
              color={liked ? Colors.light.red : Colors.light.text}
              fill={liked ? Colors.light.red : 'transparent'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={onCommentPress}>
            <MessageCircle size={24} color={Colors.light.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={onSharePress}>
            <Send size={24} color={Colors.light.text} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onSavePress}>
          <Bookmark 
            size={24} 
            color={Colors.light.text} 
            fill={saved ? Colors.light.text : 'transparent'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.likesContainer}>
        <Text style={styles.likes}>{likes.toLocaleString()} likes</Text>
      </View>

      <View style={styles.captionContainer}>
        <Text>
          <Text style={styles.username}>{username}</Text> {renderCaption()}
        </Text>
      </View>

      {comments > 0 && (
        <TouchableOpacity style={styles.commentsButton} onPress={onCommentPress}>
          <Text style={styles.commentsText}>
            View all {comments} comments
          </Text>
        </TouchableOpacity>
      )}

      <Text style={styles.timestamp}>{timestamp}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: 6,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  leftActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: 16,
  },
  likesContainer: {
    marginBottom: 6,
  },
  likes: {
    fontWeight: '600',
    fontSize: 14,
  },
  captionContainer: {
    marginBottom: 8,
  },
  username: {
    fontWeight: '600',
    fontSize: 14,
  },
  hashtag: {
    color: Colors.light.tint,
  },
  commentsButton: {
    marginBottom: 6,
  },
  commentsText: {
    color: Colors.light.placeholder,
    fontSize: 14,
  },
  timestamp: {
    fontSize: 12,
    color: Colors.light.placeholder,
    marginBottom: 12,
  },
});