const app = require('./app')

app.listen(app.get('port'),() => {
    console.log("servidor funcionado", app.get("port") )
    
})