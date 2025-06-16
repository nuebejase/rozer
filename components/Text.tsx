import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

interface TextProps extends RNTextProps {
  variant?: 'body' | 'title' | 'subtitle' | 'caption' | 'button';
}

export default function Text({ variant = 'body', style, children, ...props }: TextProps) {
  const getTextStyle = () => {
    switch (variant) {
      case 'title':
        return styles.title;
      case 'subtitle':
        return styles.subtitle;
      case 'caption':
        return styles.caption;
      case 'button':
        return styles.button;
      default:
        return styles.body;
    }
  };

  return (
    <RNText style={[getTextStyle(), style]} {...props}>
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  body: {
    fontSize: 14,
    color: Colors.light.text,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.text,
  },
  caption: {
    fontSize: 12,
    color: Colors.light.placeholder,
  },
  button: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.tint,
  },
});