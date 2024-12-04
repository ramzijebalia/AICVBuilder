// thsi cdode is used to create a singleton instance of the prisma client
// Avoid Multiple Instances of PrismaClient 
// that mean when we reload our app in development all the time it does not create a new instance of the PrismaClient over and over again 
// instead it uses the same instance that was created the first time the app was loaded.


// the code is from teh documentation of prisma :
// https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices

import {PrismaClient} from '@prisma/client';

const prismaClientSingleton = () => {
    return new PrismaClient();
}

declare const globalThis : {
    prismaModel : ReturnType<typeof prismaClientSingleton>
} & typeof global;

const prisma = globalThis.prismaModel ?? prismaClientSingleton();

export default prisma;

if ( process.env.NODE_ENV !== 'production' ) {
    globalThis.prismaModel = prisma;
}