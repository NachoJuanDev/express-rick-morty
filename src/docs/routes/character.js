/**
 * @openapi
 * components:
 *  schemas:
 *    Character:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          example: Rick Sanchez
 *        status:
 *          type: string
 *          example: Alive
 *        species:
 *          type: string
 *          example: Human
 *        origin:
 *          type: string
 *          example: Earth (C-137)
 *
 *    Error:
 *      type: object
 *      properties:
 *        errors:
 *          type: array
 *          items:
 *            type object:
 *            properties:
 *              value:
 *                type: string
 *                example: value (optional)
 *              msg:
 *                type: string
 *                example: message explaining the error
 *              param:
 *                type: string
 *                example: param
 *              location:
 *                type: string
 *                example: query
 *
 * paths:
 *  /character:
 *    get:
 *      description: Return N character.
 *      parameters:
 *        - in: query
 *          name: N
 *          schema:
 *            type: integer
 *            example: 3
 *      responses:
 *        200:
 *          description: List of character
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Character'
 *        400:
 *          description: Error message
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        500:
 *          description: Internal Server Error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: something went wrong
 *
 *    post:
 *      description: Create a character and return it.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Character'
 *      responses:
 *        200:
 *          description: The character created.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Character'
 *        400:
 *          description: Error message
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
*        500:
 *          description: Internal Server Error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: something went wrong
 *
 *  /character/search:
 *    get:
 *      description: Search a character by their name.
 *      parameters:
 *        - in: query
 *          name: name
 *          schema:
 *            type: string
 *            minLength: 1
 *            example: Rick Sanchez
 *      responses:
 *        200:
 *          description: Return the searched character.
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Character'
 *        400:
 *          description: Error message
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        404:
 *          description: Not Found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *                    example: there is no character with the given name
 */
