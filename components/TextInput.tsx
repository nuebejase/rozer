import React, { useState } from 'react';
import { 
  View, 
  TextInput as RNTextInput, 
  Text, 
  StyleSheet, 
  StyleProp, 
  ViewStyle,
  TextStyle,
  TouchableOpacity
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import Colors from '../constants/colors';

interface TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  multiline?: boolean;
  numberOfLines?: number;
}

export default function TextInput({
  value,
  onChangeText,
  placeholder,
  label,
  error,
  secureTextEntry = false,
  autoCapitalize = 'none',
  keyboardType = 'default',
  style,
  inputStyle,
  multiline = false,
  numberOfLines = 1,
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[
        styles.inputContainer,
        isFocused && styles.focusedInput,
        error && styles.errorInput
      ]}>
        <RNTextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.light.placeholder}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          style={[
            styles.input,
            inputStyle,
            multiline && { height: 24 * numberOfLines }
          ]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
        {secureTextEntry && (
          <TouchableOpacity 
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.eyeIcon}
          >
            {isPasswordVisible ? (
              <EyeOff size={20} color={Colors.light.placeholder} />
            ) : (
              <Eye size={20} color={Colors.light.placeholder} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: Colors.light.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 4,
    backgroundColor: Colors.light.lightGray,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    color: Colors.light.text,
    fontSize: 14,
  },
  focusedInput: {
    borderColor: Colors.light.tint,
  },
  errorInput: {
    borderColor: Colors.light.red,
  },
  errorText: {
    color: Colors.light.red,
    fontSize: 12,
    marginTop: 4,
  },
  eyeIcon: {
    padding: 10,
  },
});