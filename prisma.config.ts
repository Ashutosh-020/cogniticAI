import "dotenv/config";
import { defineConfig, env } from "prisma/config";
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: { url: env("DATABASE_URL") },
});

// This is the Prisma configuration file that defines the database connection and schema location for the Prisma client
// It uses the defineConfig function from the prisma/config module to create a configuration object
// The schema property specifies the path to the Prisma schema file, which defines the data models and database structure
// The datasource property specifies the database connection URL, which is read from an environment variable called DATABASE_URL
// You can customize this configuration as needed for your project, such as adding additional datasources, generators, or other settings
// To use this configuration, make sure to install the Prisma CLI and run the appropriate commands to generate the Prisma client and manage your database schema
// For example, you can run `npx prisma generate` to generate the Prisma client based on the schema defined in this configuration file
// You can also run `npx prisma migrate dev` to create and apply database migrations based on changes to your Prisma schema
// Note: Make sure to keep your DATABASE_URL environment variable secure and do not commit it to version control, as it contains sensitive information about your database connection.
// You can use a .env file or other secure methods to manage your environment variables in development and production environments.