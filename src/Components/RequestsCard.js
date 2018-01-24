import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import moment from 'moment';

const RequestsCard = (props) => {
  const { transaction, userType, onPress } = props;

  const { status, selectedCategory, selectedSubcategory, createdDate } = transaction;
  const nameToDisplay = userType === 'customer' ? transaction.vendorName : transaction.customerName;
  let statusStyle;

  switch (status) {
    case 'Pending': {
      statusStyle = styles.pendingStatusStyle;
      break;
    }
    case 'Confirmed': {
      statusStyle = styles.confirmedStatusStyle;
      break;
    }
    case 'Completed': {
      statusStyle = styles.completedStatusStyle;
      break;
    }
    case 'Rejected': {
      statusStyle = styles.rejectedStatusStyle;
      break;
    }
    case 'Awaiting payment': {
      statusStyle = styles.awaitingPaymentStatusStyle;
      break;
    }
    default: {
      statusStyle = {};
    }
  }
  const dateToDisplay = moment(createdDate).format('ll');

  return (
    <TouchableOpacity style={styles.cardStyle} onPress={() => onPress(transaction)}>
      <View style={{ padding: 10, flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }} >
          <Text style={styles.nameTextStyle}>{nameToDisplay}</Text>
          <Text style={statusStyle}>{status}</Text>
        </View>

        <Text style={styles.selectedCategory}>{selectedCategory}</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
          <Text style={styles.descriptionTextStyle}>{selectedSubcategory}</Text>
          <Text style={styles.descriptionTextStyle}>{dateToDisplay}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  cardStyle: {
    borderBottomWidth: 1,
    borderColor: "#002b7a",
    padding: 5,
    justifyContent: "space-between",
    flexDirection: "row",
  },

  pendingStatusStyle: {
    color: '#fad049',
    fontFamily: "quicksand-bold",
    fontSize: 17,
  },

  confirmedStatusStyle: {
    color: '#19528c',
    fontFamily: "quicksand-bold",
    fontSize: 17,
  },

  completedStatusStyle: {
    color: '#198c8c',
    fontFamily: "quicksand-bold",
    fontSize: 17,
  },

  rejectedStatusStyle: {
    color: '#C00000',
    fontFamily: "quicksand-bold",
    fontSize: 17,
  },

  awaitingPaymentStatusStyle: {
    color: '#800080',
    fontFamily: "quicksand-bold",
    fontSize: 17,
  },

  selectedCategory: {
    paddingTop: 5,
    fontFamily: "quicksand",
    fontSize: 13
  },

  nameTextStyle: {
    fontFamily: "quicksand-bold",
    fontSize: 15
    },

    descriptionTextStyle: {
      fontFamily: "quicksand",
      fontSize: 13,
      paddingTop: 5
    }
};

export default RequestsCard;
