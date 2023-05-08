export const index = (req,res)=>{
    res.sendFile("./views/index.html",{root:"."})
}