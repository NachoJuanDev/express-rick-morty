import axios from 'axios'

import { reduceCharacter } from '../utils/reduce'

const urlDefault = 'https://rickandmortyapi.com/api/character/'

/**
 * @typedef {Object} InfoApiResponse
 * @property {Number} count - The length of the response
 * @property {Number} pages - The amount of pages
 * @property {?String} next - Link to the next page (if it exists)
 * @property {?String} prev - Link to the previous page (if it exists)
 */

/**
 * @typedef {Object} ResponseCharacter
 * @property {InfoApiResponse} info - Info about the api response
 * @property {Character[]} results - The characters
 */

/**
 * Fetch a characters from Rick and Morty Api
 * @param {string} url - Url to the api
 * @returns {ResponseCharacter} Response
 */
export async function getCharacters (url = urlDefault) {
  let response
  try {
    response = await axios.get(url)
  } catch (error) {
    return error.response.data
  }

  const { info, results } = response.data
  return {
    info,
    results: results.map(reduceCharacter)
  }
}

/**
 * Search characters in Rick and Morty Api by their name
 * @param {string} name - Character name to search
 * @returns {ResponseCharacter} Response
 */
export async function searchCharacter (name) {
  let response
  try {
    response = await axios.get(urlDefault, {
      params: {
        name
      }
    })
  } catch (error) {
    return error.response.data
  }

  const { info, results } = response.data

  return {
    info,
    results: results.map(reduceCharacter)
  }
}
