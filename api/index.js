var port =process.env.PORT || 8001;
var app=require('./app');

app.listen(port,()=>
{
    console.log(`server listening at ${port}`)
})