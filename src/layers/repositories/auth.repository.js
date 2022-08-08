const join = (userDto) => {

    return `
        INSERT INTO user (nickname, password) 
            VALUES ("${userDto.nickname}", "${userDto.password}");`;
}



module.exports = {
    join
}