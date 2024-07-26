export default () => ({
    wsUrl: process.env.WS_URL,
    database: {
        host: process.env.DATABASE_HOST || "localhost",
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        username: process.env.DATABASE_USERNAME || "postgres",
        password: process.env.DATABASE_PASSWORD || "postgres",
        databaseName: process.env.DATABASE_NAME || "chain-adapters",
    },
});
