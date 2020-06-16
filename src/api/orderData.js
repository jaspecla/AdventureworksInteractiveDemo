const { default: Axios } = require("axios");

async function getOrderData(orderNumber) {
  const url = `https://adventureworks-apim.azure-api.net/adventureworksdemo-functions/OrderDetail?orderNumber=${orderNumber}`
  const getOrderDataFromApi = () => Axios.get(url, { headers: { 'Ocp-Apim-Subscription-Key': '64ce9a56e857476b93da8e23381c5da4'}});
  const res = await getOrderDataFromApi();

  return res.data;
}

export default getOrderData;