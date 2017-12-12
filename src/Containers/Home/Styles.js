import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  homePageContainer: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#FBFBFB'
  },

  homePageCategoriesContainer: {
    flex: 1,
    paddingBottom: 40
  },

  homePageCategoriesViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    alignContent: 'center'
  },

  homePageWelcomeTextContainer: {
    alignItems: 'center',
    backgroundColor: '#0057B8',
    paddingTop: 65,
    padding: 43
  },

  homePageWelcomeText: {
    fontFamily: 'Quicksand-regular',
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 15,
    paddingTop: 15,

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
  }
});
