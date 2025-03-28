const textarea = document.getElementById('autoResize')
textarea.addEventListener('input', () => {
  textarea.style.height = 'auto' // Reset the height
  textarea.style.height = `${textarea.scrollHeight}px` // Set to the scroll height
})

const profileSections = document.querySelectorAll('.profileSection')
const sections = document.querySelectorAll('.content-section')

function showSection(menuId) {
  sections.forEach((section) => section.classList.remove('active')) // Cache toutes les sections

  let targetSection = document.getElementById(menuId.toLowerCase()) // Récupère l'ID correspondant
  if (targetSection) {
    targetSection.classList.add('active') // Affiche la bonne section
  }
}

function showProfileSection(menuIDD) {
  profileSections.forEach((section) => section.classList.remove('active'))

  let targetSection = document.getElementById(menuIDD.toLowerCase())
  if (targetSection) {
    targetSection.classList.add('active')
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const tablist = document.querySelectorAll('.tablistnav .profile_ul li')

  tablist.forEach((item) => {
    item.addEventListener('click', function () {
      let menuId = this.dataset.id
      tablist.forEach((li) => {
        li.style.borderBottom = 'none' // Supprime la bordure des autres éléments
        li.style.color = '' // Réinitialise la couleur du texte
        li.style.fontWeight = 'normal'
      })

      this.style.setProperty('border-bottom', '2px solid #1D9BF0')
      this.style.color = 'white' // Change la couleur en blanc
      this.style.fontWeight = 'bold' // Met en gras

      showProfileSection(menuId)
    })
  })

  const menuItems = document.querySelectorAll('.menuDiv nav ul li') // Sélectionne tous les <li>

  showSection('home')
  showProfileSection('posts')

  menuItems.forEach((item) => {
    item.addEventListener('click', function () {
      // Supprimer le font-weight de tous les <p> à l'intérieur des éléments li
      menuItems.forEach((li) => {
        const p = li.querySelector('p')
        if (p) {
          p.style.fontWeight = 'lighter' // Réinitialise le font-weight du <p> à 400
        }
      })

      let menuId = this.dataset.id // Récupère l'ID du menu cliqué

      // Applique le font-weight "bold" à l'élément <p> du li cliqué
      const p = this.querySelector('p')
      if (p) {
        p.style.fontWeight = 'bolder' // Applique le font-weight "bold" au <p>
      }

      showSection(menuId) // Change la section affichée
    })
  })
})

document.querySelector('.menuDiv nav ul').addEventListener('click', function (event) {
  let clickedMenu = event.target.closest('li')

  if (clickedMenu) {
    let menuId = clickedMenu.dataset.id
    console.log('Menu clicker : ' + menuId)

    // Exécuter une action selon l'élément cliqué
    showSection(menuId)
  }
})

document.querySelectorAll('.reactionBtnList').forEach((list) => {
  list.addEventListener('click', function (event) {
    if (event.target.tagName === 'IMG') {
      let action = event.target.dataset.action

      switch (action) {
        case 'comment':
          alert('Commentaire cliqué !')
          break
        case 'retweet':
          alert('Retweet cliqué !')
          break
        case 'like':
          // event.target.src = '../../public/heart.png' // Rouge
          incrementLike(event)
          break
        case 'share':
          alert('Partage cliqué !')
          break
        default:
          console.log('Aucune action définie.')
      }
    }
  })
})

function incrementLike(event) {
  let postElement = event.target.closest('.post') // Trouver le post parent
  let likeCountElement = postElement.querySelector('.like-count') // Sélectionner l'affichage du like
  let likeimg = postElement.querySelector('.likeicon')

  if (likeimg.src.includes('like.svg')) {
    likeimg.src = '../../public/heart.png'
    likeCountElement.textContent = parseInt(likeCountElement.textContent) + 1 // Mettre à jour l'affichage
  } else {
    likeimg.src = '../../public/like.svg'
    likeCountElement.textContent = parseInt(likeCountElement.textContent) - 1
  }
}

document.getElementById('postInputForm').addEventListener('submit', async function (event) {
  // event.preventDefault();

  const content = document.getElementById('autoResize').value
  const id_user = document.getElementById('id_user').value

  const sendData = {
    id_user: Number(id_user),
    content: content,
  }

  try {
    console.log('Données envoyées :', sendData)

    const response = await fetch('/posts/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sendData),
    })

    if (!response.ok && response.status !== 302) {
      const errorMessage = await response.text()
      console.error('Erreur :', errorMessage)
      alert(`Erreur lors de l'ajout du post: ${errorMessage}`)
      throw new Error(`Erreur du postage du post: ${errorMessage}`)
    }

    console.log(`Post ajouté !`)
    document.getElementById('postInputForm').reset()
  } catch (error) {
    console.log(error)
    alert(`Erreur de l'envoi du post`)
  }
})

const mediaIcon = document.getElementById('media-icon')
const fileInput = document.getElementById('file-input')
const previewImage = document.getElementById('preview-image')
// Quand on clique sur l'icône Media, on ouvre l'input file
mediaIcon.addEventListener('click', function () {
  fileInput.click()
})

fileInput.addEventListener('change', function (event) {
  const file = event.target.files[0]

  if (file) {
    const reader = new FileReader()

    reader.onload = function (e) {
      previewImage.src = e.target.result
      previewImage.classList.remove('hidden') // Afficher l'image
    }

    reader.readAsDataURL(file)
  }
})
