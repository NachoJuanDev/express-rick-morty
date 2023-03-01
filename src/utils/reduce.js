/**
 * @typedef {Object} Character
 * @property {String} name - Name of the character
 * @property {String} status - Status of the character
 * @property {String} species - Species of the character
 * @property {String} origin - Origin of the character
 */

/**
 * Reduce the content of a Character
 * @param {Object} character
 * @returns {Character} Character
 */
export function reduceCharacter (character) {
  const { name, status, species, origin } = character
  return {
    name,
    status,
    species,
    origin: origin.name || origin
  }
}
