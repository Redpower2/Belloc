process.on('unhandledRejection', (reason, promise) => {
    console.error(reason);
});

process.on('uncaughtException', (err, origin) => {
    console.error(err);
});