const childProcess = require('child_process')

const filePath = require('./filePath')


function runBuild(){
     Object.keys(filePath).forEach(item=>{
          childProcess.spawn(`cd ${filePath[item]} && npm start`,{
              stdio:'inherit',
              shell:true
          })
     })
}

runBuild()