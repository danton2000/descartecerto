// ==========================================
// MAPA
// ==========================================

const map = L.map("map").setView([-14.235, -51.9253], 4)

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19
    }
).addTo(map)

let marker = null

const latitudeInput = document.querySelector(
    "input[name=latitude]"
)

const longitudeInput = document.querySelector(
    "input[name=longitude]"
)

const addressInput = document.querySelector(
    "input[name=address]"
)

const address2Input = document.querySelector(
    "input[name=address2]"
)

const addressPreview = document.querySelector(
    "#address-preview"
)


// ==========================================
// ESTADOS E CIDADES — API IBGE
// ==========================================

const ufSelect = document.querySelector(
    "select[name=uf]"
)

const citySelect = document.querySelector(
    "select[name=city]"
)

const stateInput = document.querySelector(
    "input[name=state]"
)

async function populateUFs() {
    try {
        const response = await fetch(
            "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
        )

        if (!response.ok) {
            throw new Error("Não foi possível carregar os estados")
        }

        const states = await response.json()

        for (const state of states) {
            ufSelect.innerHTML += `
                <option value="${state.id}">
                    ${state.nome}
                </option>
            `
        }
    } catch (error) {
        console.error(error)
        alert("Não foi possível carregar os estados.")
    }
}

async function getCities(event) {
    const ufId = event.target.value

    const selectedOption =
        event.target.options[event.target.selectedIndex]

    stateInput.value =
        ufId ? selectedOption.text : ""

    citySelect.innerHTML =
        '<option value="">Selecione a Cidade</option>'

    citySelect.disabled = true

    if (!ufId) {
        return
    }

    try {
        const response = await fetch(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufId}/municipios?orderBy=nome`
        )

        if (!response.ok) {
            throw new Error("Não foi possível carregar as cidades")
        }

        const cities = await response.json()

        for (const city of cities) {
            citySelect.innerHTML += `
                <option value="${city.nome}">
                    ${city.nome}
                </option>
            `
        }

        citySelect.disabled = false
    } catch (error) {
        console.error(error)
        alert("Não foi possível carregar as cidades.")
    }
}

populateUFs()

ufSelect.addEventListener("change", getCities)


// ==========================================
// CENTRALIZAR MAPA NA CIDADE ESCOLHIDA
// ==========================================

citySelect.addEventListener("change", async function () {
    const city = citySelect.value
    const state = stateInput.value

    if (!city || !state) {
        return
    }

    addressPreview.value = "Localizando a cidade..."

    try {
        const query = encodeURIComponent(
            `${city}, ${state}, Brasil`
        )

        const response = await fetch(
            `https://nominatim.openstreetmap.org/search` +
            `?format=jsonv2&q=${query}&limit=1`
        )

        if (!response.ok) {
            throw new Error("Não foi possível localizar a cidade")
        }

        const results = await response.json()

        if (results.length === 0) {
            addressPreview.value =
                "Cidade não localizada no mapa."

            return
        }

        const latitude = Number(results[0].lat)
        const longitude = Number(results[0].lon)

        map.setView([latitude, longitude], 14)

        addressPreview.value =
            "Agora clique no mapa para marcar o ponto."
    } catch (error) {
        console.error(error)

        addressPreview.value =
            "Não foi possível centralizar o mapa."
    }
})


// ==========================================
// CLIQUE NO MAPA E BUSCA DO ENDEREÇO
// ==========================================

map.on("click", async function (event) {
    const { lat, lng } = event.latlng

    if (marker) {
        marker.setLatLng([lat, lng])
    } else {
        marker = L.marker([lat, lng]).addTo(map)
    }

    latitudeInput.value = lat
    longitudeInput.value = lng

    addressInput.value = ""
    address2Input.value = ""

    addressPreview.value = "Buscando endereço..."

    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse` +
            `?format=jsonv2` +
            `&lat=${lat}` +
            `&lon=${lng}` +
            `&addressdetails=1`
        )

        if (!response.ok) {
            throw new Error(
                "Não foi possível identificar o endereço"
            )
        }

        const data = await response.json()
        const address = data.address || {}

        console.log("Resposta completa:", data)
        console.log("Endereço retornado:", address)
        console.log("Número retornado:", address.house_number)

        const street =
            address.road ||
            address.pedestrian ||
            address.residential ||
            address.footway ||
            address.neighbourhood ||
            ""

        const number =
            address.house_number || ""

        const district =
            address.suburb ||
            address.neighbourhood ||
            address.city_district ||
            ""

        const formattedAddress = [
            street,
            number,
            district,
            citySelect.value,
            stateInput.value
        ]
            .filter(Boolean)
            .join(", ")

        addressInput.value =
            street || data.display_name || "Local selecionado"

        if (number) {
            address2Input.value = number
            address2Input.placeholder = "Número encontrado automaticamente"
        } else {
            address2Input.value = ""
            address2Input.placeholder = "Número não encontrado. Digite manualmente"
            address2Input.focus()
        }

        addressPreview.value =
            formattedAddress || data.display_name

        marker
            .bindPopup(
                `<strong>Local selecionado</strong><br>
                 ${formattedAddress || data.display_name}`
            )
            .openPopup()
    } catch (error) {
        console.error(error)

        addressInput.value =
            "Localização selecionada pelo mapa"

        address2Input.value = ""

        addressPreview.value =
            "Endereço não identificado. As coordenadas serão salvas."
    }
})


// ==========================================
// ITENS DE COLETA
// ==========================================

const itemsToCollect =
    document.querySelectorAll(".items-grid li")

const collectedItems =
    document.querySelector("input[name=items]")

let selectedItems = []

for (const item of itemsToCollect) {
    item.addEventListener(
        "click",
        handleSelectedItem
    )
}

function handleSelectedItem(event) {
    const itemLi = event.currentTarget
    const itemId = itemLi.dataset.id

    itemLi.classList.toggle("selected")

    const alreadySelected =
        selectedItems.indexOf(itemId)

    if (alreadySelected >= 0) {
        selectedItems.splice(alreadySelected, 1)
    } else {
        selectedItems.push(itemId)
    }

    collectedItems.value =
        selectedItems.join(", ")
}


// ==========================================
// VALIDAÇÃO ANTES DO ENVIO
// ==========================================

const form = document.querySelector("form")

form.addEventListener("submit", function (event) {
    if (!latitudeInput.value || !longitudeInput.value) {
        event.preventDefault()

        alert(
            "Selecione a localização do ponto no mapa."
        )

        return
    }

    if (selectedItems.length === 0) {
        event.preventDefault()

        alert(
            "Selecione pelo menos um item de coleta."
        )
    }
})