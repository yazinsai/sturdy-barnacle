// Seeds the Database with sample data
import db from '../database'
import faker from 'faker'

const MAX_SEED_ROWS = 10
const seedIds = {}
const seedData = async () => {
  const collections = Object.keys(seedCollections)

  // Use a for-loop so it gets executed sequentially
  for(let i = 0; i < collections.length; i++) {
    const col = collections[i]
    let data = []
    seedIds[col] = []

    const colHandle = db.collection(col)
    await colHandle.deleteMany({}) // nuke collection

    for (let i = 0; i < MAX_SEED_ROWS; i++) {
      const newData = Object.assign(seedCollections[col](i), { 
        _id: col + '_' + faker.random.alphaNumeric(18) })
      data.push(newData)
      seedIds[col].push(newData._id)
    }

    await colHandle.insertMany(data)
  }

  console.log('✅ Seeded database')
}

const seedCollections = {
  'users': () => ({
    _id: 'usr_' + faker.random.alphaNumeric(18),
    name: faker.name.findName(),
    email: faker.internet.email(),
    authMethod: faker.random.arrayElement(['email', 'googleSignIn', 'appleSignIn']),
    isActive: faker.datatype.boolean(),
    kycStatus: faker.random.arrayElement(['new', 'verified', 'verificationFailed']),
    rootPortfolioId: 'pf_' + faker.random.alphaNumeric(18),
    autoInvest: faker.datatype.boolean() ? null : { minCashBalance: faker.datatype.number({ min: 1, max: 1000}) },
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  }),
  'portfolios': () => ({
    _id: 'pf_' + faker.random.alphaNumeric(18),
    title: 'My ' + faker.random.word() +' Portfolio',
    userId: seedIds['users'][faker.datatype.number({min: 0, max: MAX_SEED_ROWS})],
    type: faker.random.arrayElement(['standard', 'model', 'tracking']),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  })
}

export { seedData }