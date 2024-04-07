import { formatParams } from '../utils/formatParams'
import { env } from '../../env'

export const deleteAtm = ({ id }: { id: string }) => {
  return new Promise<void>((resolve, reject) => {
    let xhr = new XMLHttpRequest()

    xhr.open(
      'DELETE',
      `${env.API_BASE_URL}/AWTD/api/v1/RemoveItemById.php${formatParams({
        item_id: id,
      })}`
    )
    xhr.responseType = 'json'

    xhr.send()

    xhr.onload = function () {
      if (xhr.status != 200) {
        reject(xhr.response)
      } else {
        resolve(xhr.response)
      }
    }

    xhr.onerror = function () {
      reject('XHR Error')
    }
  })
}
