export default function Grid(numList) {
    function updateGrid() {
        const gridDOM = document.getElementById("grid")
        gridDOM.innerHTML = "";

        gridDOM.classList.add(`grid-cols-${Math.sqrt(numList.length)}`)

        for (let i = 0; i < numList.length + 1; i++) {
            for (const cell of numList) {
                if (cell.id == i) {
                    const colSize = "12"
                    const col = `<div class="w-${colSize} h-${colSize} flex text-center ${cell.checked == true ? "bg-stone-500" : "bg-stone-300"} text-center border rounded items-center"><span class="text-center m-auto">${cell.id}</span></div>`

                    gridDOM.innerHTML += col
                }
            }
        }
    }
    
    return {
        updateGrid
    }
}