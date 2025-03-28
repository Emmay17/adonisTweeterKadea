const createAccountBtn = document.getElementById('createbtn');
const formConnect = document.getElementById('formconnect');
const formRegister = document.getElementById('formregister');
const montext = document.getElementById('h1text')
const inttext = document.getElementById('hinttext')
const bodytoogle = document.getElementById('bodyauth')

// Assurer que le formulaire de connexion est visible au départ
formConnect.classList.remove('hidden');
formRegister.classList.add('hidden');

createAccountBtn.addEventListener('click', function () {
    if (formConnect.classList.contains('hidden')) {
        // Afficher le formulaire de connexion et masquer l'inscription
        formConnect.classList.remove('hidden');
        formRegister.classList.add('hidden');
        montext.textContent = "Welcome back !"
        inttext.textContent = "Vous avez pas de compte ?"
        bodytoogle.classList.remove('flex-row-reverse')
        createAccountBtn.textContent = "Créer un compte"; // Modifier le texte du bouton
    } else {
        // Afficher le formulaire d'inscription et masquer la connexion
        formConnect.classList.add('hidden');
        formConnect.classList.remove('visible');
        formRegister.classList.remove('hidden');
        inttext.textContent = "Vous avez déjà un compte ?"
        montext.textContent = "Hello !"
        bodytoogle.classList.add('flex-row-reverse')
        createAccountBtn.textContent = "Se connecter"; // Modifier le texte du bouton
    }
});
