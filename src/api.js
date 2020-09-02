const apiData = (() => {
  const key = 'Zl4d7IVkemOTTVg2fUdz';
  const urlRequest = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores`;

  async function getData() {
    try {
      const scores = await fetch(
        urlRequest,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      return scores.json();
    } catch (error) {
      return error.json();
    }
  }


  /* const getData = () => new Promise((resolve, reject) => {
    fetch(urlRequest, { mode: 'no-cors' })
      .then(response => response.json()
        .then((json) => {
          resolve(json.result);
        }))
      .catch(reject);
  });
 */
  const storeData = async (name, score) => {
    const jsonObj = {
      name, // user: name,
      score, // score: score;
    };
    const result = await fetch(urlRequest, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // should return a 'json'
      body: JSON.stringify(jsonObj),
    });
    return result.json();
  };

  return {
    getData,
    storeData,
  };
})();

export default apiData;
