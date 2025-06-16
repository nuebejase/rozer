import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { Camera } from 'lucide-react-native';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Colors from '../constants/colors';
import { useAuthStore } from '../hooks/useAuthStore';

export default function EditProfileScreen() {
  const { user, updateProfile } = useAuthStore();
  const router = useRouter();
  
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [username, setUsername] = useState(user?.username || '');
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!username.trim() || !fullName.trim()) {
      alert('Username and full name are required');
      return;
    }

    setIsSubmitting(true);
    
    try {
      updateProfile({
        username,
        fullName,
        bio,
        avatar,
      });
      
      router.back();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarSection}>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: avatar }}
              style={styles.avatar}
              contentFit="cover"
              transition={300}
            />
            <View style={styles.changeAvatarButton}>
              <Camera size={20} color="Black" />
            </View>
          </View>
        </TouchableOpacity>
        <Text style={styles.changePhotoText}>Change profile photo</Text>
      </View>
      
      <View style={styles.formSection}>
        <TextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        
        <TextInput
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
          style={styles.input}
        />
        
        <TextInput
          label="Bio"
          value={bio}
          onChangeText={setBio}
          multiline
          numberOfLines={3}
          style={styles.input}
        />
        
        <Button
          title="Save"
          onPress={handleSave}
          isLoading={isSubmitting}
          style={styles.saveButton}
          fullWidth
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  avatarSection: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changeAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.light.tint,
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changePhotoText: {
    color: Colors.light.tint,
    fontWeight: '600',
    marginTop: 10,
  },
  formSection: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  saveButton: {
    marginTop: 16,
  },
});