'use strict';

(() => {

    // on reprend le classico...

    function get(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()

            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        // tout est ok - resolve!
                        resolve(JSON.parse(xhr.responseText))
                    } else {
                        // petit probleme ... reject!
                        reject(xhr)
                    }
                }
            }

            xhr.open('GET', url)
            xhr.send()
        })
    }

    // l'api Promise nous offre d'autres possibilités
    // nous y trouvons all(Array) qui est utile si on veux faire plusieurs requêtes en parallèle

    Promise.all([/* promesse1, promesse2, promesse3 */]).then(/* ... */)

    // cas d'utilisation classique

    promiseAll()

    function promiseAll() {
        const promises = []

        for (let i = 0; i < 10; i++) {
            promises.push(get('/duplicates/users.' + i + '.json'))
        }

        Promise.all(promises).then((datas) => {
            // data -> tableau où chaque entitée est le résultat des promesse
            // dans l'ordre où elles ont été push dans le tableau promises
            console.log("promiseAll()", datas)
        }).catch((err) => {
            console.error("promiseAll()", err)
        })
    }

    // il y a aussi race(Array) qui va nous permettre de résoudre la première requete terminée
    // la première requete qui se termine déclenche le .then et les 

    Promise.race([/* promesse1, promesse2, promesse3 */]).then(/* ... */)

    promiseRace()

    function promiseRace() {
        const promises = []

        for (let i = 0; i < 10; i++) {
            promises.push(get('/duplicates/users.' + i + '.json'))
        }

        Promise.race(promises).then((firstData) => {
            console.log("promiseRace()", firstData)
        }).catch((firstErr) => {
            console.error("promiseRace()", firstErr)
        })
    }

    // le race et le all sont intéressant
    // mais le all est, si je peux me permettre sauf cas très précis, obsolète
    // depuis l'arrivée des async/await
    // voici le promiseAll traduit avec async/await

    asyncAwait()

    async function asyncAwait() {

        const results = []

        for (let i = 0; i < 10; i++) {
            results.push(await get('/duplicates/users.' + i + '.json'))
        }

        console.log("asyncAwait()", results)

        function fail(err) {
            console.error("asyncAwait()", err)
        }
    }

    // juste pour terminer l'animation
    document.getElementById('title').style.display = 'block'

})()