import Grid from "../grid.js"

async function initializeLogin() {
    document.body.innerHTML = `
        <div class="m-auto">
            <h1 class="text-white text-3xl mb-4">Admin Login</h1>
            <input type="password" id="admin-password" class="bg-stone-300 p-2 mb-4 w-full" placeholder="Enter admin password">
            <button id="login-btn" class="bg-stone-300 p-2 w-full">Login</button>
        </div>
    `
    const loginBtn = document.getElementById("login-btn")
    const passwordInput = document.getElementById("admin-password")

    async function verifyLogin(password) {
        const response = await fetch("http://localhost:3000/admin-login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password: password })
        })
        return (await response.status)
    }

    loginBtn.addEventListener("click", async () => {
        const password = passwordInput.value

        const status = await verifyLogin(password)
        if (status === 200) {
            alert("Login successful!")
            initializeAdmin()
        } else {
            alert("Invalid credentials. Please try again.")
        }
    })
}

async function initializeAdmin() {
    console.log("Admin JS loaded")

    document.body.innerHTML = `
        <div>
            <input type="number" name="" id="num-input" class="bg-stone-300 w-20 p-2">
            <button id="toggle-btn" class="bg-stone-300 p-2">Toggle</button>
        </div>
        <div id="grid" class="rounded p-2 gap-2 grid grid-flow-row absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-[verdana]"></div>
    `

    async function getData() {
        const response = await fetch("http://localhost:3000/get")
        return (await response.json())
    }

    async function alterCell(id) {
        const response = await fetch("http://localhost:3000/toggle", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id })
        })
        return (await response.json())
    }

    const numList = (await getData()).data
    console.log(numList)

    const toggleBtn = document.getElementById("toggle-btn")
    const numInput = document.getElementById("num-input")

    if (numList) {
        Grid(numList).updateGrid()

        toggleBtn.addEventListener("click", async () => {
            const numId = parseInt(numInput.value)
            if (isNaN(numId)) {
                alert("Please enter a valid number ID")
                return
            }
            const result = await alterCell(numId)
            console.log(result)
            const updatedData = (await getData()).data
            Grid(updatedData).updateGrid()
        })
    }
}

initializeLogin()
// initializeAdmin()
