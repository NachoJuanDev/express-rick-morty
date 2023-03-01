import swaggerJSDoc from 'swagger-jsdoc'
import { serve, setup } from 'swagger-ui-express'

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'Pinflag', version: '1.0.0' }
  },
  apis: ['src/docs/routes/*.js']
})

const swaggerDocs = (app, port) => {
  app.use('/docs', serve, setup(swaggerSpec))

  console.log(`API docs running on http://127.0.0.1:${port}/docs`)
}

export default swaggerDocs
