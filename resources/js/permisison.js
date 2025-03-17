const textarea = document.getElementById('autoResize');
textarea.addEventListener('input', () => {
    textarea.style.height = 'auto';  // Reset the height
    textarea.style.height = `${textarea.scrollHeight}px`;  // Set to the scroll height
});

// document.addEventListener("DOMContentLoaded", function() {
//     fetch("{{ route('permissions.getAll') }}") // Remplace par ta route
//         .then(response => response.json())
//         .then(data => {
//             console.log("Données reçues :", data);
//             // Traite les données ici (ex: mettre à jour un tableau)
//         })
//         .catch(error => console.error("Erreur :", error));
// });