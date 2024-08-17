import { prisma } from '../src/utils/prisma'
import bcrypt from 'bcrypt'

async function seed(){
  const password = 'dialog'
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      id: 'f3d5e75f-3da3-44e4-bdf5-8a34ed984333',
      name: 'teste dialog',
      email: 'teste.dialog@example.com',
      password: hashedPassword
    }
  })
}

seed().then(() => {
  console.log('Database seeded!')
  prisma.$disconnect()
})