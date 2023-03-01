import app from 'express'
import asyncHandler from 'express-async-handler'
import { body, query } from 'express-validator'

import CharacterController from '../controllers/character_controller'

const routes = app.Router()

/** Get */

routes.get(
  '/',
  query('N')
    .custom((value) => {
      if (isNaN(value) || value <= 0) {
        throw new Error()
      }
      return true
    })
    .withMessage('must be a number greater than 0'),
  asyncHandler(new CharacterController().index)
)
routes.get(
  '/search',
  query('name').isLength({ min: 1 }).withMessage('must be a valid name'),
  asyncHandler(new CharacterController().show)
)

/** Post */

routes.post(
  '/',
  body('name').isLength({ min: 1 }).withMessage('must be a valid name'),
  body('status').isLength({ min: 1 }).withMessage('must be a valid status'),
  body('species').isLength({ min: 1 }).withMessage('must be a valid species'),
  body('origin').isLength({ min: 1 }).withMessage('must be a valid origin'),
  asyncHandler(new CharacterController().create)
)

export default routes
