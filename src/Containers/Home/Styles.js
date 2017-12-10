import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  homePageContainer: {
    flexDirection: 'column',
    flex: 1,
    paddingTop: 100
  },

  homePageCategories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    alignContent: 'center'
  },

  homePageWelcomeText: {
    fontFamily: 'Quicksand-bold',
    fontSize: 15,
    paddingTop: 10,
    paddingBottom: 20
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
  }
});
