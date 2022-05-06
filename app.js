const inputElement = document.querySelector('input')
const selectElement = document.querySelector('select')
const mainContainer = document.querySelector('.main')
const footerContainer = document.querySelector('.footer')
const popup = document.querySelector('.popup')
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
    


    mainContainer.innerHTML = colorArray.map((color, index) => (
        `<div style="background-color: ${color}" class="bar bar${index}"></div>`
    )).join('')

    footerContainer.innerHTML = colorArray.map(color => (`
    <div class="foot">${color}</div>`
    )).join('')

    for (let i = 0; i < 5; i++) {
        document.querySelector(`.bar${i}`).addEventListener('click', copyToClipboard)
    }
}

function copyToClipboard(e) {
    const bar = e.target
    const bgColor = window.getComputedStyle(bar).backgroundColor
    const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
    const bgColorhex = rgb2hex(bgColor)
    const text = document.createElement('textarea')
    document.body.appendChild(text)
    text.value = bgColorhex
    text.select()
    document.execCommand('copy')
    document.body.removeChild(text)
    renderPopup(e)
}


function renderPopup(e) {
    popup.style.display="block"
    popup.style.left=`${e.pageX}px`
    popup.style.top=`${e.pageY}px`
    console.log(popup, e.pageX)
    setTimeout(() => popup.style.display="none", 3000)
}