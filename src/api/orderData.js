const { default: Axios } = require("axios");

async function getOrderData(orderNumber) {
  const url = `${process.env.REACT_APP_ORDER_API_URL}?orderNumber=${orderNumber}`
  const getOrderDataFromApi = () => Axios.get(url, { headers: { 'Ocp-Apim-Subscription-Key': process.env.REACT_APP_ORDER_API_KEY }});
  const res = await getOrderDataFromApi();

  return res.data;
}

export default getOrderData;