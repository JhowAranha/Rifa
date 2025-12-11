import Grid from "./grid.js"
import { createConnection } from "./sockets.js"

createConnection()

async function getData() {
    const response = await fetch("https://rifa-diik.onrender.com/get")
    return (await response.json())
}

export async function update() {
    const numList = (await getData()).data
    console.log(numList)

    if (numList) {
        Grid(numList).updateGrid()
    }
}

update()
