const handleRegister = (req, res, knex, bcrypt) => {
    const {email, name, password} = req.body;

    const hash = bcrypt.hashSync(password);

    if (!email || !name || !password) {
        return(res.status(400).json("Please fill in all fields!"));
    }

    knex.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email,
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                name: name,
                email: loginEmail[0],
                joined: new Date(),
            }).then(user => {
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => {
        res.status(400).json('This user cannot be registered!');
    });

}

module.exports = {
    handleRegister: handleRegister
}