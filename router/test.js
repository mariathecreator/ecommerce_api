app.use('/home',(req,res,next)=>{
const error = new Error('not found')
error.status=404
next(error)
})

app.use((err,req,res,next)=>{
    res.status(error.status||500).json({message:})
})