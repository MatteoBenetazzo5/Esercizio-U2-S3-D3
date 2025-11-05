const ENDPOINT = 'https://striveschool-api.herokuapp.com/books'

// funzione principale: recupera i libri e li mette sulla griglia creata con bootstrap
const getBooks = function () {
  fetch(ENDPOINT)
    .then((response) => {
      if (response.ok === true) {
        return response.json()
      } else {
        // errori HTTP (404, 500, ...)
        throw new Error('Errore nella risposta!')
      }
    })
    .then((books) => {
      // books è un array di oggetti libro
      // costruisco le card all'interno DOM
      const row = document.getElementById('books-row')
      books.forEach(function (book) {
        
        // colonna responsiv
        const col = document.createElement('div')
        col.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3')

        // card
        const card = document.createElement('div')
        card.classList.add('card', 'h-100', 'shadow-sm')

        // immagine
        const img = document.createElement('img')
        img.classList.add('card-img-top')
        img.setAttribute('src', book.img)
        img.setAttribute('alt', book.title)

        // body della card
        const body = document.createElement('div')
        body.classList.add('card-body', 'd-flex', 'flex-column')

        // titolo
        const title = document.createElement('h5')
        title.classList.add('card-title')
        title.innerText = book.title

        // prezzo
        const price = document.createElement('p')
        price.classList.add('card-text', 'fw-semibold', 'mb-3')
        if (typeof book.price === 'number') {
          price.innerText = book.price.toFixed(2) + ' $'
        } else {
          price.innerText = book.price + ' $'
        }

        // bottone "Scarta"
        const discardBtn = document.createElement('button')
        discardBtn.classList.add('btn', 'btn-outline-danger', 'mt-auto')
        discardBtn.innerText = 'Scarta'
        discardBtn.addEventListener('click', function () {
          col.remove()
        })

        // composizione gerarchia DOM
        body.appendChild(title)
        body.appendChild(price)
        body.appendChild(discardBtn)

        card.appendChild(img)
        card.appendChild(body)

        col.appendChild(card)
        row.appendChild(col)
      })
    })
    .catch((err) => {
      console.log('ERRORE!', err)
    })
}
// AVVIO
getBooks()
