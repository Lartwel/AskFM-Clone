
const checkAuth = async (req, res, next) => {
  try{
    if(!req.session || !req.session.email || !req.session.userID){
      throw new Error()
    }
    next()
  } catch(e) {
    res.status(401).send('Please Authenticate')
  }
}

module.exports = checkAuth;