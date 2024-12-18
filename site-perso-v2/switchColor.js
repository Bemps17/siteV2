document.addEventListener('DOMContentLoaded', function() {
    // Récupération du bouton switch
    const themeToggle = document.getElementById('toggle-theme');
    
    // Fonction pour changer le thème
    function switchTheme(e) {
        if (e.target.checked) {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        }
    }

    // Écouteur d'événement sur le switch
    themeToggle.addEventListener('change', switchTheme);

    // Vérification du thème au chargement
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        if (currentTheme === 'light') {
            themeToggle.checked = true;
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
        } else {
            themeToggle.checked = false;
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
        }
    }
});
