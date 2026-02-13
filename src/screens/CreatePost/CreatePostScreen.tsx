import React, { useState, memo, useCallback } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { styles } from './CreatePostScreen.styles';
import { useCreatePost } from '../../hooks/mutations/useCreatePost';
import { ErrorDisplay } from '../../components/ErrorDisplay/ErrorDisplay';
import { Header } from '../../components/Header/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../styles';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
interface CreatePostScreenProps {
  navigation: any;
  route: any;
}

interface FormState {
  title: string;
  body: string;
}

export const CreatePostScreen: React.FC<CreatePostScreenProps> = ({
  navigation,
  route,
}) => {
  const { isOnline } = useNetworkStatus();
  const { communityId } = route.params;
  const [formState, setFormState] = useState<FormState>({
    title: '',
    body: '',
  });
  const [showError, setShowError] = useState(false);

  const { mutate: createPost, isPending, error } = useCreatePost(communityId);

  const handleTitleChange = (title: string) => {
    setFormState(prev => ({ ...prev, title }));
    setShowError(false);
  };

  const handleBodyChange = (body: string) => {
    setFormState(prev => ({ ...prev, body }));
    setShowError(false);
  };

  const validateForm = (): boolean => {
    if (!formState.title.trim()) {
      setShowError(true);
      return false;
    }
    if (!formState.body.trim()) {
      setShowError(true);
      return false;
    }
    return true;
  };

  const handlePublish = () => {
    if (!validateForm()) return;

    createPost(
      {
        title: formState.title,
        body: formState.body,
      },
      {
        onSuccess: () => {
          navigation.goBack();
        },
      },
    );
  };

  const handleCancel = useCallback(() => {
    navigation.goBack();
  }, []);
  const MemomizedHeader = memo(() => (
    <Header
      Title={'Create Post '}
      LeftIcon={
        <Icon name="arrow-back" size={20} color={colors.text.primary} />
      }
      RightIcon={null}
      RightAction={() => {}}
      LeftAction={handleCancel}
    />
  ));
  return (
    <View style={styles.container}>
      <MemomizedHeader />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.formContainer}>
            {error && showError && (
              <ErrorDisplay
                title="Failed to Create Post"
                message={
                  error instanceof Error
                    ? error.message
                    : 'Unable to create post. Please try again.'
                }
                visible={true}
              />
            )}

            <Text style={styles.label}>Post Title</Text>
            <TextInput
              style={styles.titleInput}
              placeholder="Enter title"
              placeholderTextColor="#999"
              maxLength={200}
              value={formState.title}
              onChangeText={handleTitleChange}
              multiline
              editable={!isPending}
            />

            <Text style={[styles.label, styles.bodyLabel]}>Post Body</Text>
            <TextInput
              style={styles.bodyInput}
              placeholder="Enter body"
              placeholderTextColor="#999"
              maxLength={5000}
              value={formState.body}
              onChangeText={handleBodyChange}
              multiline
              textAlignVertical="top"
              editable={!isPending}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>

      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.cancelButton, isPending && styles.disabledButton]}
          onPress={handleCancel}
          disabled={isPending}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.publishButton,
            (!isOnline || isPending || formState.title.trim().length === 0 ||
            formState.body.trim().length === 0) && styles.disabledButton,
          ]}
          onPress={handlePublish}
          disabled={
            !isOnline ||
            isPending ||
            formState.title.trim().length === 0 ||
            formState.body.trim().length === 0
          }
        >
          {isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.publishButtonText}>Publish</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
