export default {
  Character: {
    create: jest.fn((foo) =>
      Promise.resolve({ dataValues: { id: 1, ...foo } })
    ),
    findOne: jest.fn(() => Promise.resolve({ dataValues: {} }))
  }
}
