// Conecta ao banco SQLite e mantém um fallback em memória caso a dependência não esteja disponível.
const path = require("path")
const dbPath = path.join(__dirname, "database.db")

// Simula um banco mínimo para manter a aplicação funcionando sem o SQLite.
function createFallbackDatabase() {
    const state = {
        places: []
    }

    const fallbackDb = {
        run(query, params, callback) {
            if (typeof params === "function") {
                callback = params
                params = []
            }

            const normalizedQuery = query.trim().toUpperCase()

            if (normalizedQuery.startsWith("CREATE TABLE")) {
                if (typeof callback === "function") {
                    callback.call(fallbackDb, null)
                }
                return fallbackDb
            }

            if (normalizedQuery.startsWith("INSERT INTO")) {
                const values = Array.isArray(params) ? params : []
                const columnsMatch = query.match(/INSERT\s+INTO\s+places\s*\(([^)]*)\)/i)

                if (columnsMatch) {
                    const columns = columnsMatch[1].split(",").map((item) => item.trim())
                    const record = {}

                    columns.forEach((column, index) => {
                        record[column] = values[index]
                    })

                    state.places.push(record)
                }

                if (typeof callback === "function") {
                    callback.call(fallbackDb, null)
                }
                return fallbackDb
            }

            if (typeof callback === "function") {
                callback.call(fallbackDb, null)
            }
            return fallbackDb
        },

        all(query, callback) {
            if (typeof callback !== "function") {
                return fallbackDb
            }

            const searchMatch = query.match(/WHERE\s+city\s+LIKE\s+'%([^%]+)%'/i)
            let rows = [...state.places]

            if (searchMatch) {
                const searchValue = searchMatch[1].toLowerCase()
                rows = rows.filter((place) => {
                    const city = place.city || ""
                    return city.toLowerCase().includes(searchValue)
                })
            }

            callback(null, rows)
            return fallbackDb
        },

        serialize(callback) {
            if (typeof callback === "function") {
                callback()
            }
            return fallbackDb
        },

        close(callback) {
            if (typeof callback === "function") {
                callback(null)
            }
            return fallbackDb
        }
    }

    return fallbackDb
}

let db

// Tenta abrir o SQLite real; se falhar, usa o fallback em memória.
try {
    const sqlite3 = require("sqlite3").verbose()
    db = new sqlite3.Database(dbPath)

    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                image TEXT,
                name TEXT,
                address TEXT,
                address2 TEXT,
                state TEXT,
                city TEXT,
                items TEXT,
                latitude REAL,
                longitude REAL
            );
        `)
    })
} catch (error) {
    console.warn("sqlite3 não disponível. Usando armazenamento em memória.")
    db = createFallbackDatabase()
}

module.exports = db


