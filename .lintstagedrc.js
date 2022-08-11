module.exports = {
    'src/**.js': files => {
      console.log(files) // Getting called 3 times
      return `eslint ${files}`
    }
  }
  