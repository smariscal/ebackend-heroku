exports.cookieControl = async (req, res, next) => {
  if (req.session){
    if (req.session.cookie.expires===60000){
      res.clearCookie(unnombre);
      return res.redirect('/login');
    }
  }
  return next();
};