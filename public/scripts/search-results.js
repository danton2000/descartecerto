const detailsModal = document.querySelector("#details-modal")
const closeDetailsButton = document.querySelector("#close-details")
const detailsButtons = document.querySelectorAll(".details-button")

const detailsName = document.querySelector("#details-name")
const detailsCity = document.querySelector("#details-city")
const detailsState = document.querySelector("#details-state")
const detailsAddress = document.querySelector("#details-address")
const detailsNumber = document.querySelector("#details-number")
const detailsItems = document.querySelector("#details-items")

let detailsMap = null
let detailsMarker = null

for (const button of detailsButtons) {
    button.addEventListener("click", function () {
        const name = button.dataset.name
        const city = button.dataset.city
        const state = button.dataset.state
        const address = button.dataset.address
        const number = button.dataset.number
        const items = button.dataset.items
        const latitude = Number(button.dataset.latitude)
        const longitude = Number(button.dataset.longitude)

        detailsName.textContent = name
        detailsCity.textContent = city || "Não informado"
        detailsState.textContent = state || "Não informado"
        detailsAddress.textContent = address || "Não informado"
        detailsNumber.textContent = number || "Sem número"
        detailsItems.textContent = items || "Não informado"

        detailsModal.classList.remove("hide")

        showDetailsMap(latitude, longitude, name)
    })
}

function showDetailsMap(latitude, longitude, name) {
    const hasCoordinates =
        Number.isFinite(latitude) &&
        Number.isFinite(longitude)

    if (!hasCoordinates) {
        return
    }

    if (!detailsMap) {
        detailsMap = L.map("details-map").setView(
            [latitude, longitude],
            16
        )

        L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                attribution: "&copy; OpenStreetMap contributors",
                maxZoom: 19
            }
        ).addTo(detailsMap)

        detailsMarker = L.marker([
            latitude,
            longitude
        ]).addTo(detailsMap)
    } else {
        detailsMap.setView(
            [latitude, longitude],
            16
        )

        detailsMarker.setLatLng([
            latitude,
            longitude
        ])
    }

    detailsMarker
        .bindPopup(name)
        .openPopup()

    setTimeout(() => {
        detailsMap.invalidateSize()
    }, 150)
}

function closeDetailsModal() {
    detailsModal.classList.add("hide")
}

closeDetailsButton.addEventListener(
    "click",
    closeDetailsModal
)

detailsModal.addEventListener("click", function (event) {
    if (event.target === detailsModal) {
        closeDetailsModal()
    }
})

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeDetailsModal()
    }
})

function calculateDistance(
    latitude1,
    longitude1,
    latitude2,
    longitude2
) {
    const earthRadiusKm = 6371

    const toRadians = degrees =>
        degrees * Math.PI / 180

    const latitudeDifference =
        toRadians(latitude2 - latitude1)

    const longitudeDifference =
        toRadians(longitude2 - longitude1)

    const firstLatitude =
        toRadians(latitude1)

    const secondLatitude =
        toRadians(latitude2)

    const a =
        Math.sin(latitudeDifference / 2) ** 2 +
        Math.cos(firstLatitude) *
        Math.cos(secondLatitude) *
        Math.sin(longitudeDifference / 2) ** 2

    const c =
        2 * Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        )

    return earthRadiusKm * c
}

function showDistances() {
    const userLocation = window.userLocation || {}

    if (
        userLocation.latitude === null ||
        userLocation.longitude === null ||
        userLocation.latitude === undefined ||
        userLocation.longitude === undefined
    ) {
        return
    }

    const userLatitude = Number(userLocation.latitude)
    const userLongitude = Number(userLocation.longitude)

    const cards = document.querySelectorAll(".card")

    for (const card of cards) {
        const distanceElement =
            card.querySelector(".distance")

        if (!distanceElement) {
            continue
        }

        const pointLatitude =
            Number(card.dataset.latitude)

        const pointLongitude =
            Number(card.dataset.longitude)

        if (
            !Number.isFinite(pointLatitude) ||
            !Number.isFinite(pointLongitude)
        ) {
            distanceElement.remove()
            continue
        }

        const distance = calculateDistance(
            userLatitude,
            userLongitude,
            pointLatitude,
            pointLongitude
        )

        card.dataset.distance = distance

        if (distance < 1) {
            distanceElement.textContent =
                `📍 ${Math.round(distance * 1000)} m de distância`
        }
        else if (distance < 10) {
            distanceElement.textContent =
                `📍 ${distance.toFixed(1)} km de distância`
        }
        else {
            distanceElement.textContent =
                `📍 ${Math.round(distance)} km de distância`
        }
            
    }

    sortCardsByDistance()
}

function sortCardsByDistance() {

    const cardsContainer =
        document.querySelector(".cards")

    if (!cardsContainer) return

    const cards =
        [...cardsContainer.querySelectorAll(".card")]

    cards.sort((firstCard, secondCard) => {

        const firstDistance =
            Number(firstCard.dataset.distance)

        const secondDistance =
            Number(secondCard.dataset.distance)

        return firstDistance - secondDistance
    })

    // Reorganiza os cards na tela
    cards.forEach(card => {
        cardsContainer.appendChild(card)
    })

    // ============================
    // Marca o ponto mais próximo
    // ============================

    // Remove selos antigos
    document
        .querySelectorAll(".nearest-badge")
        .forEach(badge => badge.remove())

    const firstCard =
        cardsContainer.querySelector(".card")

    if (firstCard) {

        const badge = document.createElement("div")

        badge.className = "nearest-badge"

        badge.textContent = "⭐ Mais próximo"

        const image = firstCard.querySelector("img")

        if (image) {
            image.insertAdjacentElement("afterend", badge)
        }
            }
}

showDistances()

const materialFilter =
    document.querySelector("#material-filter")

if (materialFilter) {

    materialFilter.addEventListener(
        "change",
        filterByMaterial
    )

}

function filterByMaterial() {

    const selectedMaterial =
        materialFilter.value.toLowerCase()

    const cards =
        document.querySelectorAll(".card")

    cards.forEach(card => {

        const items =
            card.dataset.items.toLowerCase()

        if (
            selectedMaterial === "" ||
            items.includes(selectedMaterial)
        ) {

            card.style.display = ""

        } else {

            card.style.display = "none"

        }

    })

}