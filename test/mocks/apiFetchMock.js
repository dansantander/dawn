async function saveData(name, score) {
  const key = 'Zl4d7IVkemOTTVg2fUdz';
  const urlRequest = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores`;

  /* eslint-disable */
  const jsonObj = {
    user: name,
    score: score,
  };
  try {
    const response = await fetch(urlRequest, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonObj),
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      return 'Everything is working just fine!';
    }
    throw new Error('Request Failed');
  } catch (error) {
    return 'Error found';
  }
}

export { saveData };