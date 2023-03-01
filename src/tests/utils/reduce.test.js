import { reduceCharacter } from '../../utils/reduce'

const characterBase = {
  id: 1,
  name: 'test',
  status: 'test',
  species: 'test',
  origin: { name: 'test' },
  foo: 'test'
}

describe('Reduce utils', () => {
  describe('reduceCharacter', () => {
    test('Reduce character from Api', () => {
      const character = { ...characterBase }

      const result = reduceCharacter(character)
      const { name, status, species, origin } = result

      expect(Object.keys(result)).toHaveLength(4)
      expect(name).toBeDefined()
      expect(name).toEqual(character.name)
      expect(status).toBeDefined()
      expect(status).toEqual(character.status)
      expect(species).toBeDefined()
      expect(species).toEqual(character.species)
      expect(origin).toBeDefined()
      expect(origin).toEqual(character.origin.name)
    })

    test('Reduce character from Database', () => {
      const character = { ...characterBase }
      character.origin = character.origin.name

      const result = reduceCharacter(character)
      const { name, status, species, origin } = result

      expect(Object.keys(result)).toHaveLength(4)
      expect(name).toBeDefined()
      expect(name).toEqual(character.name)
      expect(status).toBeDefined()
      expect(status).toEqual(character.status)
      expect(species).toBeDefined()
      expect(species).toEqual(character.species)
      expect(origin).toBeDefined()
      expect(origin).toEqual(character.origin)
    })
  })
})
