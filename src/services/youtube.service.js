
import { gapi } from 'gapi-script'

export const searchRequest = (query) => {
  return new Promise((resolve, reject) => {
    const request = gapi.client.request({
      method: 'GET',
      path: 'youtube/v3/search',
      params: { part: 'snippet', maxResults: 5, q: query, fields: 'items(id(kind,playlistId,videoId),snippet(thumbnails/default,title)),kind' }
    })

    request.execute(function (response) {
      if (response.error) {
        reject(response.error)
      }
      resolve(response)
    })
  })
}
