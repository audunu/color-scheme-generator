const inputElement = document.querySelector('input')
const selectElement = document.querySelector('select')
const mainContainer = document.querySelector('.main')
const footerContainer = document.querySelector('.footer')
let colorArray = []

document.querySelector('button').addEventListener('click', () => {
    colorArray = []
    const selectedColor = inputElement.value.substring(1)
    const selectedStyle = selectElement.value
    console.log(selectedStyle)
    fetch(`https://www.thecolorapi.com/scheme?hex=${selectedColor}&mode=${selectedStyle}`)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < 5; i++) {
                colorArray.push(data.colors[i].hex.value)
            }
            render()
        })


})



function render() {
    mainContainer.innerHTML = colorArray.map(color => (
        `<div style="background-color: ${color}" class="bar"></div>`
    )).join('')

    footerContainer.innerHTML = colorArray.map(color => (`
    <div class="foot">${color}</div>`
    )).join('')
}




