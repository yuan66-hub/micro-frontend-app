
const filePath = require('./filePath')
const runShell = require('./util').runShell

function runBuild(){
     Object.keys(filePath).forEach(item=>{
          runShell(`cd ${filePath[item]} && npm start`)
     })
}

runBuild()