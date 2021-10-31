module.exports = {
    async redirects() {
        return [
            {
                source: "/docs",
                destination: "/docs/getting-started/installation",
                permanent: true,
            },
        ];
    },
};
