import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import moment from 'moment';

const RequestsCard = (props) => {
  const { transaction, userType, onPress } = props;

  const { status, selectedCategory, selectedSubcategory, createdDate } = transaction;
  const nameToDisplay = userType === 'customer' ? transaction.vendorName : transaction.customerName;
  const statusStyle = status === 'Pending' ? styles.pendingStatusStyle : {};
  const dateToDisplay = moment(createdDate).format('ll');

  return (
    <TouchableOpacity style={styles.cardStyle} onPress={() => onPress(transaction)}>
      <View style={{ padding: 5, flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }} >
          <Text>{nameToDisplay}</Text>
          <Text style={statusStyle}>{status}</Text>
        </View>

        <Text style={styles.selectedCategory}>{selectedCategory}</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
          <Text>{selectedSubcategory}</Text>
          <Text>{dateToDisplay}</Text>
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
    color: 'yellow'
  },

  confirmedStatusStyle: {
    color: 'blue'
  },

  completedStatusStyle: {
    color: 'green',
  },

  rejectedStatusStyle: {
    color: 'red',
  },

  selectedCategory: {
    paddingTop: 5
  }
};

export default RequestsCard;
