/* eslint-disable react/jsx-no-bind */
import React from 'react';
import {
  Text, StyleSheet, TouchableOpacity, Alert,
} from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import firebase from 'firebase';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigation } from '@react-navigation/native';
import { func, shape } from 'prop-types';

export default function LogOutButton(props) {
  const { cleanupFuncs } = props;
  const navigation = useNavigation();

  function handlePress() {
    Alert.alert('ログアウトします', 'よろしいですか？', [
      {
        text: 'キャンセル',
        onPress: () => {},
      },
      {
        text: 'OK',
        onPress: () => {
          cleanupFuncs.memos();
          cleanupFuncs.auth();
          firebase
            .auth()
            .signOut()
            .then(() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'MemoList' }],
              });
            })
            .catch(() => {
              Alert.alert('ログアウトに失敗しました');
            });
        },
      },
    ]);
  }

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Text style={styles.label}>ログアウト</Text>
    </TouchableOpacity>
  );
}

LogOutButton.propTypes = {
  cleanupFuncs: shape({
    auth: func,
    memos: func,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  label: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});
