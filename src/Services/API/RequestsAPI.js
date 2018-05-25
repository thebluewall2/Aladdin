import apisauce from 'apisauce';

const create = (baseURL = 'https://us-central1-aladdinapp-942fe.cloudfunctions.net') => {
  const api = apisauce.create({
    baseURL,

    timeout: 10000
  });

  const sendNotifications = (data) => {
    const { transactionUID, senderName, recipientUserType, receipientUID } = data;

    return api.post(`/sendPushNotification`, {
      method: 'UPDATE_TRANSACTION',
      transactionUID,
      senderName,
      recipientUserType,
      receipientUID,
    }, {});
  };

  return {
    sendNotifications,
  };
};

export default { create };
