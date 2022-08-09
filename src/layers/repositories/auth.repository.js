const join = (userDto) => {

    return `
        INSERT INTO user (nickname, password) 
            VALUES ("${userDto.nickname}", "${userDto.password}");`;
}

const login = (userDto) => {

    return `
        SELECT nickname FROM user
            WHERE nickname = "${userDto.nickname}" AND password = "${userDto.password}";`;
}

module.exports = {
    join,
    login
}