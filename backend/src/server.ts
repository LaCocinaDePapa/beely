import app from "./app"

const PORT = process.env.LOCAL_PORT || 5000

app.listen(PORT, () => {
    console.log('Server runing on http://localhost:',PORT)
})
