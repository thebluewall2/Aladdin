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

  errorTextStyle: {
    color: 'red',
    fontFamily: 'quicksand-bold',
    fontSize: 15,
    paddingTop: 10
  },

  selectAddressContainerStyle: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10
  },

  selectAddressTitleStyle: {
    fontFamily: 'quicksand-Regular',
    fontSize: 20
  },

  selectAddressSubTitleStyle: {
    fontFamily: 'quicksand',
    fontSize: 15
  },

  buttonContainerStyle: {
    flex: 1,
    paddingTop: 140,
    justifyContent: 'space-between'
  },

  buttonTextStyle: {
    color: '#FFFFFF',
    fontFamily: 'Quicksand-Regular',
    fontSize: 15
  },
  buttonStyle: {
    backgroundColor: '#37474F',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: 270,
    borderRadius: 10,
  },

  addressNextButtonStyle: {
    backgroundColor: '#198c8c',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: 270,
    borderRadius: 10,
  },

  addressNextButtonContainerStyle: {
     flex: 1,
     paddingTop: 50,
     justifyContent: 'space-between'
  },

  addressButtonViewContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 10
  },

  addressDropdownBoxStyle: {
    height: 35,
    width: 350,
    borderWidth: 0.5
  },

  addNewAddressContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 90,
    flex: 1,
    paddingBottom: 10,
  },

  vendorListViewContainer: {
    flex: 1
  },

  vendorListTitleStyle: {
    fontFamily: 'quicksand-Regular',
    fontSize: 20,
    paddingLeft: 10,
    color: '#FFFFFF'
  },

  vendorListContentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 10
  },

  vendorListTitleContainer: {
    backgroundColor: '#002b7a',
    justifyContent: "flex-start",
    paddingTop: 80,
    paddingBottom: 15
  },

  vendorDataContainerViewStyle: {
    flex: 1,
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 20
  },

  vendorDataTitleTextStyle: {
    fontFamily: 'Quicksand-bold',
    fontSize: 18,
    color: "#002b7a"
  },

  vendorDataContentTextStyle: {
    fontFamily: 'Quicksand-regular',
    fontSize: 15
  },

  timeTitleTextStyle: {
    fontFamily: "quicksand-regular",
    fontSize: 15,
    paddingBottom: 10,
    paddingTop: 10
  },

  chooseTimeButtonViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },

  chooseTimeButtonStyle: {
    backgroundColor: '#0d1d56',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    borderRadius: 5
  },

  chooseClearButtonStyle: {
    backgroundColor: '#59687d',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    borderRadius: 5
  },

  chooseConfirmButtonStyle: {
    backgroundColor: '#198c8c',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    borderRadius: 5
  },

});
