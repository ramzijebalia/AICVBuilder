1-
all the components files come from the installation of teh library shadcn
==> Shadcn offers a flexible and efficient way to build modern web applications with React and Next. js. By mastering Shadcn, you can: Speed up your development process by reusing high-quality, pre-built components.
( https://ui.shadcn.com/ )

2-
initialize prisma : npx prisma init  ( create prisma/shema.prisma where w gonne connect our database)
==> we used postgreSQL Database and the provider of the database is VERCEL ( https://vercel.com/ )

3-
In development, the command next dev clears Node.js cache on run. This in turn initializes a new PrismaClient instance each time due to hot reloading that creates a connection to the database. This can quickly exhaust the database connections as each PrismaClient instance holds its own connection pool.
the file code : lib/prisma.ts : https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices


4-
we pushed our new database tabel ( resume) to our postgres database to create it uisng this command : npx prisma db push   , 
the file app/page.tsx is created automatically [ default contenet ( i chnage it during the clerk authentification setup commit)]  ( it called prisma client , it allow us to use prisma in our code , add  , update , delelte , resume ..)