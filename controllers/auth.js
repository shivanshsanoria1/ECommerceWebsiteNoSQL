exports.getLogin = (req, res, next) => {
    const cookiesArray = req.get('Cookie').split(';');
    const isLoggedInIndex = cookiesArray.findIndex((item) => item.split('=')[0] === 'loggedIn');
    if(isLoggedInIndex === -1){
        return res.redirect('/404');
    }
    const isLoggedIn = cookiesArray[isLoggedInIndex].split('=')[1] ? true : false;
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: isLoggedIn
    });
};

exports.postLogin = (req, res, next) => {
    res.setHeader('Set-Cookie', 'loggedIn=true');
    res.redirect('/');
};