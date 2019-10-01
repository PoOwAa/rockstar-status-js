const axios = require('axios');

console.log('Fetching RockStar games server status');

axios
  .get(
    'https://support.rockstargames.com/services/status.json?tz=Europe%2FWarsaw&fbclid=IwAR1aVIM09ZtkDJSwMM-MbDfDQ_aSf9KUOo5dHCK1SqSkR6LatGqRRtyQVCQ',
  )
  .then(axiosResult => {
    if (axiosResult.status === 200) {
      const statuses = axiosResult.data.statuses;
      for (const status of statuses) {
        if (status.tag === 'gtao') {
          for (const gtaStatus of status.services_platforms) {
            console.log(
              `${gtaStatus.name} status: ${
                gtaStatus.service_status_id === 1 ? 'UP' : 'DOWN'
              }`,
            );
          }
        }
      }
    }
  })
  .catch(e => {
    console.error(e);
    throw e;
  });
