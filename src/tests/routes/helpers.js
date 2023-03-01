import supertest from 'supertest'
import { app } from '../../index'

export const api = supertest(app)

export const characterKeys = ['name', 'status', 'species', 'origin']

export const rick = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth',
    url: 'https://rickandmortyapi.com/api/location/1'
  },
  location: {
    name: 'Earth',
    url: 'https://rickandmortyapi.com/api/location/20'
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2'
  ],
  url: 'https://rickandmortyapi.com/api/character/1',
  created: '2017-11-04T18:48:46.250Z'
}

export const apiCharacterResponse = {
  info: {
    count: 826,
    pages: 42,
    next: 'https://rickandmortyapi.com/api/character/?page=2',
    prev: null
  },
  results: Array(20).fill(rick)
}

export const dbCharacterResponse = {
  id: 1,
  name: 'No existo en la api',
  status: 'Alive',
  species: 'Human',
  origin: 'Earth'
}

export const apiSearchResponse = {
  info: {
    count: 107,
    pages: 6,
    next: 'https://rickandmortyapi.com/api/character/?page=2&name=rick',
    prev: null
  },
  results: Array(20).fill(rick)
}
