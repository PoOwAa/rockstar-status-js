const axios = require('axios');

console.log('Fetching RockStar games server status');

/**
 * Get status from the official JSON
 *
 * @returns
 */
async function getStatus() {
  return axios
    .get('https://support.rockstargames.com/services/status.json', {
      params: {
        tz: 'Europe/Warsaw',
      },
    })
    .then(axiosResult => {
      if (axiosResult.status === 200) {
        return axiosResult.data.statuses;
      } else {
        // TODO: handle bad request
      }
    })
    .catch(e => {
      console.error(e);
      throw e;
    });
}

getStatus().then(statuses => {
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
});
