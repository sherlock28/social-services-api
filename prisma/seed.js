import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const months = await prisma.Month.createMany({
        data: [
            { month: 'Enero' },
            { month: 'Febrero' },
            { month: 'Marzo' },
            { month: 'Abril' },
            { month: 'Mayo' },
            { month: 'Junio' },
            { month: 'Julio' },
            { month: 'Agosto' },
            { month: 'Septiembre' },
            { month: 'Octubre' },
            { month: 'Noviembre' },
            { month: 'Diciembre' },
        ]
    })

    console.log({ months })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })