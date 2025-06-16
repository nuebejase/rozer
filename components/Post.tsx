import React from 'react';
import { View, StyleSheet, Share, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import PostHeader from './PostHeader';
import PostCarousel from './PostCarousel';
import PostFooter from './PostFooter';
import { Post as PostType } from '../types/post';  


interface PostProps {
  post: PostType;
  onLikeToggle: (postId: string) => void;
  onSaveToggle: (postId: string) => void;
}

export default function Post({ post, onLikeToggle, onSaveToggle }: PostProps) {
  const router = useRouter();

  const handleDoubleTap = () => {
    if (!post.liked) {
      onLikeToggle(post.id);
    }
  };

  const handleLikePress = () => {
    onLikeToggle(post.id);
  };

  const handleCommentPress = () => {
    router.push(`/comments/${post.id}`);
  };

  const handleSharePress = async () => {
    try {
      if (Platform.OS === 'web') {
        alert('Sharing is not available on web');
        return;
      }
      
      await Share.share({
        message: `Check out this post by ${post.user.username}: ${post.caption}`,
        url: post.images[0], // This works on iOS but not on Android
      });
    } catch (error) {
      console.error('Error sharing post:', error);
    }
  };

  const handleSavePress = () => {
    onSaveToggle(post.id);
  };

  return (
    <View style={styles.container}>
      <PostHeader
        username={post.user.username}
        avatar={post.user.avatar}
        location={post.location}
      />
      <PostCarousel
        images={post.images}
        onDoubleTap={handleDoubleTap}
      />
      <PostFooter
        caption={post.caption}
        username={post.user.username}
        likes={post.likes}
        comments={post.commentCount}
        timestamp={post.timestamp}
        liked={post.liked}
        saved={post.saved}
        onLikePress={handleLikePress}
        onCommentPress={handleCommentPress}
        onSharePress={handleSharePress}
        onSavePress={handleSavePress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'skyblue',
    marginBottom: 8,
  },
});