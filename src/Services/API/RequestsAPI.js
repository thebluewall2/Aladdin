import apisauce from 'apisauce';

const create = (baseURL = 'https://us-central1-aladdinapp-942fe.cloudfunctions.net') => {
  const api = apisauce.create({
    baseURL,

    timeout: 10000
  });

  const sendNotifications = (data) => {
    const { method, transactionUID, senderName, recipientUserType, recipientUID } = data;

    /*methods:
    CREATE_TRANSACTION
    UPDATE_TRANSACTION
    REVIEW
    PAYMENT
    */
    return api.post(`/sendPushNotification`, {
      method,
      transactionUID,
      senderName,
      recipientUserType,
      recipientUID,
    }, {});
  };

  return {
    sendNotifications,
  };
};

export default { create };
