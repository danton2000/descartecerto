const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")
const locationButton = document.querySelector("#find-location")

buttonSearch.addEventListener("click", event => {
    event.preventDefault()
    modal.classList.remove("hide")
})

close.addEventListener("click", event => {
    event.preventDefault()
    modal.classList.add("hide")
})

if (locationButton) {
    locationButton.addEventListener("click", event => {
        event.preventDefault()

        if (!navigator.geolocation) {
            alert("Seu navegador não oferece suporte à localização.")
            return
        }

        locationButton.disabled = true
        locationButton.textContent = "Localizando..."

        navigator.geolocation.getCurrentPosition(
            getLocation,
            showError,
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            }
        )
    })
}

async function getLocation(position) {
    const lat = position.coords.latitude
    const lon = position.coords.longitude

    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse` +
            `?format=jsonv2&lat=${lat}&lon=${lon}&addressdetails=1`
        )

        if (!response.ok) {
            throw new Error("Não foi possível consultar sua localização.")
        }

        const data = await response.json()
        const address = data.address || {}

        const city =
            address.city ||
            address.town ||
            address.village ||
            address.municipality ||
            address.county

        if (!city) {
            throw new Error("Não foi possível identificar sua cidade.")
        }

        window.location.href =
            `/search?search=${encodeURIComponent(city)}` +
            `&lat=${encodeURIComponent(lat)}` +
            `&lon=${encodeURIComponent(lon)}`

    } catch (error) {
        console.error(error)
        alert(error.message)

        resetLocationButton()
    }
}

function showError(error) {
    let message = "Não foi possível obter sua localização."

    switch (error.code) {
        case error.PERMISSION_DENIED:
            message = "Você não permitiu o acesso à localização."
            break

        case error.POSITION_UNAVAILABLE:
            message = "Sua localização não está disponível."
            break

        case error.TIMEOUT:
            message = "A busca pela localização demorou demais."
            break
    }

    alert(message)
    resetLocationButton()
}

function resetLocationButton() {
    if (!locationButton) return

    locationButton.disabled = false
    locationButton.textContent = "Usar minha localização"
}