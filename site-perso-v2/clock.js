function updateDigitalClock() {
    const now = new Date();
    
    // Format de l'heure
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Ajout des zéros devant si nécessaire
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // Mise à jour de l'heure
    document.querySelector('.time').innerHTML = 
        hours + ":" + minutes + ":" + seconds;

    // Format de la date
    const days = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'];
    const months = ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOU', 'SEP', 'OCT', 'NOV', 'DEC'];
    
    let day = days[now.getDay()];
    let date = now.getDate();
    let month = months[now.getMonth()];
    let year = now.getFullYear();

    // Ajout du zéro devant la date si nécessaire
    date = date < 10 ? "0" + date : date;

    // Mise à jour de la date
    document.querySelector('.date').innerHTML = 
        `${day} ${date} ${month} ${year}`;
}

// Mise à jour toutes les secondes
setInterval(updateDigitalClock, 1000);

// Première mise à jour immédiate
updateDigitalClock(); 