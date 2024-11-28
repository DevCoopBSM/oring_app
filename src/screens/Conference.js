import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import Emoji from './assets/conference_oring.svg'; // SVG를 컴포넌트로 불러오기
import RNFS from 'react-native-fs';

const Finish = () => {
  const handleDownload = async () => {
    const pdfUrl =
      'https://school.busanedu.net/common/nttFileDownload.do?fileKey=f63d731e5b45746ad4c59de84c4d1ced';
    const path = RNFS.DocumentDirectoryPath + '/conference-material.pdf'; // Path where the PDF will be saved

    try {
      // Step 1: Fetch the PDF content
      const response = await fetch(pdfUrl);

      if (!response.ok) {
        throw new Error('Failed to download the file');
      }

      const blob = await response.blob();

      // Step 2: Convert the blob to a file
      await RNFS.writeFile(path, blob, 'utf8');

      // Step 3: Notify the user that the file has been downloaded
      Alert.alert('성공', 'PDF 다운로드가 완료되었습니다!');
    } catch (err) {
      console.error('PDF 다운로드 실패:', err);
      Alert.alert('실패', 'PDF 다운로드에 실패했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Emoji width={100} height={100} style={styles.logo} />
      <Text style={styles.title}>총회가 준비 중이에요!</Text>
      <Text style={styles.text}>시작 전, 총회 자료집 PDF를 읽어주세요.</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.SendBtn} onPress={handleDownload}>
          <Text style={styles.SendBtnText}>PDF 다운로드</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginBottom: 16,
  },
  text: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'NanumSquareOTF',
    fontWeight: '400',
    lineHeight: 20,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  title: {
    marginTop: 16,
    marginBottom: 8,
    color: 'black',
    fontSize: 22,
    fontFamily: 'NanumSquareOTF',
    fontWeight: '800',
    lineHeight: 28,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 28,
    flexDirection: 'row',
    gap: 8,
  },
  SendBtn: {
    backgroundColor: '#F49E15',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 4,
  },
  SendBtnText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'NanumSquareOTF',
    fontWeight: '400',
    lineHeight: 16,
    textAlign: 'center',
  },
  HomeBtn: {
    borderWidth: 2,
    borderColor: '#B9BBB9',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  HomeBtnText: {
    color: 'black',
    fontSize: 12,
    fontFamily: 'NanumSquareOTF',
    fontWeight: '400',
    lineHeight: 16,
    textAlign: 'center',
  },
});

export default Finish;
