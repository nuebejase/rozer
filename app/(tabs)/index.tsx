import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Post from '../../components/Post';
import { usePostStore } from '../../hooks/usePostStore';
import Colors from '../../constants/colors';

export default function FeedScreen() {
  const { posts, toggleLike, toggleSave } = usePostStore();

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Post 
            post={item} 
            onLikeToggle={toggleLike} 
            onSaveToggle={toggleSave}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});