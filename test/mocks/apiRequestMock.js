const apiTestData = (() => {
  const key = 'Zl4d7IVkemOTTVg2fUdz';
  const urlRequest = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores`;
  /* eslint-disable */
  const checkData = () => {
    return new Promise((resolve) => {
      fetch(urlRequest)
        .then(response => response.json()
          .then((json) => {
            resolve(json.result);
          }));
    });
  };
  /* eslint-enable */
  return { checkData };
})();

export default apiTestData;