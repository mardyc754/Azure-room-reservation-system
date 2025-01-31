import { createRequestHandler } from '@react-router/express';
import { drizzle } from 'drizzle-orm/postgres-js';
import express from 'express';
import appInsights from 'applicationinsights';
import postgres from 'postgres';
import 'react-router';

import { DatabaseContext } from '@/db/context';
import * as schema from '@/db/schema';

declare module 'react-router' {
  interface AppLoadContext {
    VALUE_FROM_EXPRESS: string;
  }
}

export const app = express();

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required');

const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client, { schema });
app.use((_, __, next) => DatabaseContext.run(db, next));

appInsights
  .setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING)
  .enableWebInstrumentation(true)
  .setAutoCollectRequests(true)
  .start();

app.use(
  createRequestHandler({
    // @ts-expect-error - virtual module provided by React Router at build time
    build: () => import('virtual:react-router/server-build'),
    getLoadContext() {
      return {
        VALUE_FROM_EXPRESS: 'Hello from Express'
      };
    }
  })
);
