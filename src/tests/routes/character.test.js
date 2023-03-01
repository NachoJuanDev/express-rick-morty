import mockAxios from 'axios'

import { server } from '../../index'
import mockModels from '../../models'
import {
  api,
  apiCharacterResponse,
  apiSearchResponse,
  dbCharacterResponse,
  characterKeys,
  rick
} from './helpers'

jest.mock('../../models')

describe('get /character', () => {
  mockAxios.get.mockImplementation(() =>
    Promise.resolve({
      data: apiCharacterResponse
    })
  )

  test('Get 21 character', async () => {
    const result = await api
      .get('/character')
      .query({ N: 21 })
      .expect(200)
      .expect('Content-type', /application\/json/)

    expect(result.body).toHaveLength(21)
    expect(Object.keys(result.body[0])).toEqual(characterKeys)
  })

  test('Respond with error if N = 0', async () => {
    const result = await api
      .get('/character')
      .query({ N: 0 })
      .expect(400)
      .expect('Content-type', /application\/json/)

    expect(result.body.errors).toBeDefined()

    const error = result.body.errors.filter((b) => b.param === 'N')[0]

    expect(error).toBeDefined()
    expect(error.msg).toBeDefined()
    expect(error.param).toBeDefined()
    expect(error.location).toBeDefined()
  })

  test('Respond with error with N >> 9999999', async () => {
    const result = await api
      .get('/character')
      .query({ N: 9999999 })
      .expect(400)
      .expect('Content-type', /application\/json/)

    expect(result.body.errors).toBeDefined()

    const error = result.body.errors.filter((b) => b.param === 'N')[0]

    expect(error).toBeDefined()
    expect(error.msg).toBeDefined()
    expect(error.param).toBeDefined()
    expect(error.location).toBeDefined()
  })
})

describe('post /character', () => {
  test('Create a character', async () => {
    const character = { ...dbCharacterResponse }
    delete character.id

    const result = await api
      .post('/character')
      .send(character)
      .expect(200)
      .expect('Content-type', /application\/json/)

    expect(result.body).toEqual(character)
  })

  test('Respond with error if an attribute body is invalid', async () => {
    const character = {}

    const result = await api
      .post('/character')
      .send(character)
      .expect(400)
      .expect('Content-type', /application\/json/)

    expect(result.body.errors).toBeDefined()
    expect(result.body.errors.length).toBeGreaterThanOrEqual(4)

    const error = result.body.errors.filter((b) => b.param === 'name')[0]

    expect(error).toBeDefined()
    expect(error.msg).toBeDefined()
    expect(error.param).toBeDefined()
    expect(error.location).toBeDefined()
  })
})

describe('get /character/search', () => {
  mockAxios.get.mockImplementation(() =>
    Promise.resolve({
      data: apiSearchResponse
    })
  )

  mockModels.Character.findOne
    .mockImplementationOnce(() => Promise.resolve(null))
    .mockImplementationOnce(() =>
      Promise.resolve({
        dataValues: dbCharacterResponse
      })
    )

  test('Get character from API', async () => {
    const result = await api
      .get('/character/search')
      .query({ name: rick.name })
      .expect(200)
      .expect('Content-type', /application\/json/)

    expect(result.body).toBeDefined()
    expect(Object.keys(result.body)).toEqual(characterKeys)
    expect(result.body.name).toEqual(rick.name)
  })

  test('Get character from DB', async () => {
    const result = await api
      .get('/character/search')
      .query({ name: dbCharacterResponse.name })
      .expect(200)
      .expect('Content-type', /application\/json/)

    expect(result.body).toBeDefined()
    expect(Object.keys(result.body)).toEqual(characterKeys)
    expect(result.body.name).toEqual(dbCharacterResponse.name)
  })

  test('Responde with error if name is invalid', async () => {
    const result = await api
      .get('/character/search')
      .query({ name: null })
      .expect(400)
      .expect('Content-type', /application\/json/)

    expect(result.body.errors).toBeDefined()

    const error = result.body.errors.filter((b) => b.param === 'name')[0]

    expect(error).toBeDefined()
    expect(error.msg).toBeDefined()
    expect(error.param).toBeDefined()
    expect(error.location).toBeDefined()
  })
})

beforeAll(() => {
  server.close()
})
