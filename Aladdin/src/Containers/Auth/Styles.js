import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 25,
    justifyContent: 'space-between',
    flex: 1,
    paddingBottom: 80,
    backgroundColor: 'white'
  },
  quicksandText: {
    fontFamily: 'Quicksand',
    fontSize: 13
  },
  quicksandTitle: {
    fontFamily: 'Quicksand',
    fontSize: 25
  },
  quicksandItalic: {
    fontFamily: 'Quicksand',
    fontStyle: 'italic',
    fontSize: 20
  },
  buttonImage: {
    height: 100,
    width: 100,
    paddingBottom: 40
  },
  buttonCaption: {
    alignSelf: 'center',
    fontFamily: 'Quicksand',
    fontSize: 20,
    paddingTop: 16,
  },
  vendorCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    backgroundColor: 'yellow'
  },
  customerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    backgroundColor: '#00FFFF'
  }
});
