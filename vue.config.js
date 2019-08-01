
// This is here because github deploys to /musicrecs, so assets need to serve from that url instead of root

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/musicrecs/'
        : '/'
}