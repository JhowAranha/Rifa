import { GetData, ToggleNumber, getAdminHashes, loginAdmin } from "./db-functions.js"
import express from "express"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

console.log(await getAdminHashes())

// app.get('/get', async (req, res) => { 
//     res.json(await GetData())
// })

app.post('/toggle', async (req, res) => {
    const data = req.body
    console.log("Dados do front: ", data)

    const id = await ToggleNumber(data.id)

    res.status(200).json({ message: "Success", id: id })
})

app.post('/admin-login', async (req, res) => {
    const data = req.body
    const isAuthenticated = await loginAdmin(data.password);

    if (isAuthenticated) {  
        res.status(200).json({ message: "Login successful" });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
