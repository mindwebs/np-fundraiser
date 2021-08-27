const RenderHomePage = (req, res) => {
    res.render('index');
};

const RenderSuccessPage = (req, res) => {
    res.render('success');
};

const RenderFailurePage = (req, res) => {
    res.render('failure');
};

module.exports = {
    RenderHomePage,
    RenderSuccessPage,
    RenderFailurePage,
}