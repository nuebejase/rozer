import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Grid, Settings } from 'lucide-react-native';
import Button from '../../components/Button';
import Colors from '../../constants/colors';
import { useAuthStore } from '../../hooks/useAuthStore';
import { usePostStore } from '../../hooks/usePostStore';

const { width } = Dimensions.get('window');
const numColumns = 3;
const tileSize = width / numColumns;

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const { posts } = usePostStore();
  const router = useRouter();

  // Filter posts by current user
  const userPosts = user ? posts.filter(post => post.user.id === user.id) : [];

  const handleEditProfile = () => {
    router.push('./edit-profile');
  };

  const handleLogout = () => {
    logout();
  };

  if (!user) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{user.username}</Text>
        <TouchableOpacity>
          <Settings size={24} color={Colors.light.text} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.profileSection}>
        <Image
          source={{ uri: user.avatar }}
          style={styles.profileImage}
          contentFit="cover"
          transition={300}
        />
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userPosts.length}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.bioSection}>
        <Text style={styles.fullName}>{user.fullName}</Text>
        {user.bio && <Text style={styles.bio}>{user.bio}</Text>}
      </View>
      
      <View style={styles.actionButtons}>
        <Button
          title="Edit Profile"
          onPress={handleEditProfile}
          variant="secondary"
          style={styles.editButton}
        />
        
        <Button
          title="Log Out"
          onPress={handleLogout}
          variant="outline"
          style={styles.logoutButton}
        />
      </View>
      
      <View style={styles.postsSection}>
        <View style={styles.postsHeader}>
          <Grid size={24} color={Colors.light.text} />
        </View>
        
        <FlatList
          data={userPosts}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.postTile}
              onPress={() => {}}
            >
              <Image
                source={{ uri: item.images[0] }}
                style={styles.postTileImage}
                contentFit="cover"
              />
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No posts yet</Text>
              <Button
                title="Create First Post"
                onPress={() => router.push('/(tabs)/create')}
                style={styles.createButton}
              />
            </View>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
  },
  profileSection: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '600',
  },
  statLabel: {
    fontSize: 12,
    color: Colors.light.placeholder,
  },
  bioSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  fullName: {
    fontSize: 14,
    fontWeight: '600',
  },
  bio: {
    fontSize: 14,
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  editButton: {
    flex: 1,
    marginRight: 8,
  },
  logoutButton: {
    flex: 1,
    marginLeft: 8,
  },
  postsSection: {
    flex: 1,
  },
  postsHeader: {
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    paddingVertical: 8,
    alignItems: 'center',
  },
  postTile: {
    width: tileSize,
    height: tileSize,
    padding: 1,
  },
  postTileImage: {
    width: '100%',
    height: '100%',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.light.placeholder,
    marginBottom: 16,
  },
  createButton: {
    width: 200,
  },
});