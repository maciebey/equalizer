
import { gapi } from 'gapi-script'

export const searchRequest = (query, pageToken) => {
  return new Promise((resolve, reject) => {
    const request = gapi.client.request({
      method: 'GET',
      path: 'youtube/v3/search',
      params: {
        part: 'snippet',
        maxResults: 5,
        q: query,
        type: 'video',
        pageToken: pageToken,
        fields: 'items(id(kind,playlistId,videoId),snippet(thumbnails/default,title)),nextPageToken'
      }
    })

    request.execute(function (response) {
      if (response.error) {
        reject(response.error)
      }
      resolve(response)
    })
  })
}
