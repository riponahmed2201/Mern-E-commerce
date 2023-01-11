
const getPagination = async (req, minimumLimit) => {

    const pageParsed = typeof req.query.page === 'number' ? req.query.page : ((typeof req.query.page === 'string') ? Number.parseInt(req.query.page.toString()) : NaN);
    const limitParsed = typeof req.query.limit === 'number' ? req.query.limit : ((typeof req.query.limit === 'string') ? Number.parseInt(req.query.limit.toString()) : NaN);

    const defaultLimit = typeof minimumLimit === 'number' ? minimumLimit : ((typeof minimumLimit === 'string') ? Number.parseInt(minimumLimit.toString()) : 20);

    const page = Number.isInteger(pageParsed) && pageParsed > 0 ? pageParsed : 1;
    const limit = Number.isInteger(limitParsed) && limitParsed > 0 ? Math.min(limitParsed, defaultLimit) : defaultLimit;
    const skip = Number.isInteger(page) && page > 0 ? (limit * (page - 1)) : 0;

    const sort = { createdAt: -1 };

    return { skip, limit, sort };
};

module.exports = getPagination;