import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { Camera, X } from 'lucide-react-native';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Colors from '../../constants/colors';
import { usePostStore } from '../../hooks/usePostStore';

export default function CreatePostScreen() {
  const [images, setImages] = useState<string[]>([]);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { createPost } = usePostStore();
  const router = useRouter();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const newImages = result.assets.map(asset => asset.uri);
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = () => {
    if (images.length === 0) {
      alert('Please select at least one image');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // We don't need to pass the user property as it's handled inside createPost
      createPost({
        images,
        caption,
        location: location || undefined,
      });
      
      // Navigate back to feed
      router.push('/(tabs)');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <X size={24} color={Colors.light.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Post</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.imageSection}>
        {images.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {images.map((image, index) => (
              <View key={index} style={styles.imageContainer}>
                <Image
                  source={{ uri: image }}
                  style={styles.image}
                  contentFit="cover"
                />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeImage(index)}
                >
                  <X size={20} color="Black" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        ) : (
          <TouchableOpacity style={styles.imagePlaceholder} onPress={pickImage}>
            <Camera size={40} color={Colors.light.placeholder} />
            <Text style={styles.imagePlaceholderText}>Add Photos</Text>
          </TouchableOpacity>
        )}
        
        {images.length > 0 && (
          <Button
            title="Add More Photos"
            onPress={pickImage}
            variant="secondary"
            style={styles.addMoreButton}
          />
        )}
      </View>
      
      <View style={styles.formSection}>
        <TextInput
          value={caption}
          onChangeText={setCaption}
          placeholder="Write a caption..."
          multiline
          numberOfLines={4}
          style={styles.captionInput}
        />
        
        <TextInput
          value={location}
          onChangeText={setLocation}
          placeholder="Add location"
          style={styles.locationInput}
        />
        
        <Button
          title="Share"
          onPress={handleSubmit}
          isLoading={isSubmitting}
          disabled={images.length === 0}
          style={styles.shareButton}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  imageSection: {
    padding: 16,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.lightGray,
  },
  imagePlaceholderText: {
    marginTop: 8,
    color: Colors.light.placeholder,
    fontSize: 16,
  },
  addMoreButton: {
    marginTop: 12,
  },
  formSection: {
    padding: 16,
  },
  captionInput: {
    marginBottom: 16,
  },
  locationInput: {
    marginBottom: 24,
  },
  shareButton: {
    marginTop: 8,
  },
});