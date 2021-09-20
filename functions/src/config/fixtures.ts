// Seeds the Database with sample data
import db from '../database'
import faker from 'faker'

const seedData = () => {
  const collections = Object.keys(seedCollections)

  collections.forEach(col => {
    let data = []

    const colHandle = db.collection(col)
    colHandle.drop() // nuke collection

    for (let i = 0; i < 1000; i++) {
      data.push(seedCollections[col]())
    }

    colHandle.insertMany(data)
  })

  console.log('✅ Seeded database')
}

const seedCollections = {
  'users': () => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    authMethod: faker.random.arrayElement(['email', 'googleSignIn', 'appleSignIn']),
    isActive: faker.datatype.boolean(),
    kycStatus: faker.random.arrayElement(['new', 'verified', 'verificationFailed']),
    rootPortfolioId: 'pf_' + faker.random.alphaNumeric(18),
    autoInvest: faker.datatype.boolean() ? null : { minCashBalance: faker.datatype.number()/50 },
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  }),
  'portfolios': () => ({
    id: 'pf_' + faker.random.alphaNumeric(18),
    title: 'My Main Portfolio',
    userId: 'usr_' + faker.random.alphaNumeric(18),
    type: faker.random.arrayElement(['standard', 'model', 'tracking']),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  })
}

export { seedData }