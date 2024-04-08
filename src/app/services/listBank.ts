import { formatParams } from '../utils/formatParams'
import { env } from '../../env'

export type Bank = string

type ListBankResponse = {
  success: boolean
  message: string
  banks: Bank[]
}

export const listBank = ({ language }: { language: string }) => {
  return {
    success: true,
    message: 'Data received.',
    banks: [
      'The Bank of East Asia Limited',
      'Shanghai Commercial Bank Limited',
      'Public Bank (Hong Kong) Limited',
      'OCBC Bank (Hong Kong) Limited',
      'The Bank of East Asia Limited',
      'The Hongkong and Shanghai Banking Corporation Limited',
    ],
  }

  return new Promise<ListBankResponse>((resolve, reject) => {
    let xhr = new XMLHttpRequest()

    xhr.open(
      'GET',
      `${
        env.API_BASE_URL
      }/AWTD/api/v1/GetBankLists.php${formatParams({ lan: language })}`
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
