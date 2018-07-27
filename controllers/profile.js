const getProfile = (knex) => (req, res) => {
    const { id } = req.params;
    knex.select('*').from('users').where({id})
        .then(user => {
            if (user.length) {
                res.json(user[0]);
            } else {
                res.json('user not found')
            }
        })
        .catch(err => console.log('error finding user!'))
};

module.exports = {
    getProfile: getProfile
};