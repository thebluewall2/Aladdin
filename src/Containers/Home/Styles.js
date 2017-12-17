import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  homePageContainer: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#102027'
  },

  homePageCategoriesContainer: {
    flex: 1,
    paddingBottom: 50,
    paddingTop: 20
  },

  homePageCategoriesViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    alignContent: 'center',
    padding: 3
  },

  homePageWelcomeTextContainer: {
    alignItems: 'center',
    backgroundColor: '#002b7a',
    paddingTop: 10,
    padding: 15
  },

  homePageWelcomeText: {
    fontFamily: 'Quicksand-regular',
    textAlign: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontSize: 15,
    paddingTop: 30,

  },

  selectSubcategoryViewStyle: {
    flex: 1,
    paddingTop: 80,
    paddingLeft: 5,
    paddingRight: 5,
  },

  homePageTitle: {
    fontFamily: 'Quicksand-regular',
    justifyContent: 'flex-start',
    paddingLeft: 10,
    fontSize: 20
  },

  selectSubcategoryTextStyle: {
    fontFamily: 'Quicksand-regular',
    fontSize: 20,
    paddingLeft: 5,
    paddingTop: 20
  },

  addAddressTextFieldStyle: {
    height: 30,
    width: 330,
    fontFamily: 'Quicksand-light'
  },
});
