import { validationResult } from 'express-validator'

import models from '../models'
import BaseController from './base'
import { getCharacters, searchCharacter } from '../services/characters'
import { reduceCharacter } from '../utils/reduce'

export default class CharacterController extends BaseController {
  CharacterController () {}

  async index (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return super.ErrorBadRequest(res, { errors: errors.array() })
    }

    const N = Number(req.query.N)

    const { info, results, error } = await getCharacters()

    if (error) {
      return super.InternalError(res, 'something went wrong')
    }

    if (info.count < N) {
      return super.ErrorBadRequest(
        res,
        {
          errors: [
            {
              value: N,
              msg: `the maximum number of characters is ${info.count}`,
              param: 'N',
              location: 'query'
            }
          ]
        }
      )
    }

    if (N <= results.length) {
      return super.Success(res, results.slice(0, N))
    }

    const allCharacters = [...results]
    let nextUrl = info.next
    let remaining = N - allCharacters.length

    while (remaining !== 0) {
      const { info: newInfo, results: newResults, error: newError } = await getCharacters(nextUrl)

      if (newError) {
        return super.InternalError(res, 'something went wrong')
      }

      if (remaining > newResults.length) {
        allCharacters.push(...newResults)
        remaining -= newResults.length
      } else {
        allCharacters.push(...newResults.slice(0, remaining))
        remaining = 0
      }

      nextUrl = newInfo.next
    }

    return super.Success(res, allCharacters)
  }

  async create (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return super.ErrorBadRequest(res, { errors: errors.array() })
    }

    const { name, status, species, origin } = req.body

    let result
    try {
      result = await models.Character.create({
        name,
        status,
        species,
        origin
      })
    } catch (error) {
      console.log(error)
      return super.InternalError(res, 'something went wrong')
    }

    return super.Success(res, reduceCharacter(result.dataValues))
  }

  async show (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return super.ErrorBadRequest(res, { errors: errors.array() })
    }

    const { name } = req.query

    const result = await models.Character.findOne({
      where: {
        name
      }
    })

    if (result !== null) {
      return super.Success(res, reduceCharacter(result.dataValues))
    }

    const { results, error } = await searchCharacter(name)

    if (error) {
      return super.NotFound(res, 'there is no character with the given name')
    }

    return super.Success(res, results[0])
  }
}
