exports.getOverview = (req, res, next) => {
    res.status(200).render('base');
};

exports.getLoginForm = async (req, res, next) => {
    res.status(200).render('login');
};