document.addEventListener('DOMContentLoaded', () => {

    function loadEventData() {
        const nombre = localStorage.getItem('eventNombre') || 'el morro';
        const edad = localStorage.getItem('eventEdad') || 'Inmortal el Compa';
        const lugar = localStorage.getItem('eventLugar') || 'En tu corazon';
        const eventDateString = localStorage.getItem('eventFecha');

        document.getElementById('event-title').innerText = `¡Festejamos a ${nombre}!`;
        document.getElementById('event-subtitle').innerText = `¡Cumple ${edad} años!`;
        document.getElementById('event-reason').innerText = `los ${edad} años de ${nombre}`;
        document.getElementById('event-location').innerText = `en ${lugar}`;

        return eventDateString;
    }

    function startCountdown(targetDateString) {
        if (!targetDateString) {
            console.error('No hay fecha de evento configurada.');
            document.getElementById('timer').innerHTML = "<p>¡Ve a config.html para poner la fecha!</p>";
            return;
        }

        const targetDate = new Date(targetDateString).getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
                document.getElementById('timer').innerHTML = "<h2>¡CORRELE A LA FIESTA WEEEEEE!</h2>";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = String(days).padStart(2, '0');
            document.getElementById('hours').innerText = String(hours).padStart(2, '0');
            document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
            document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');

        }, 1000);
    }

    function startRandomMovement() {
        const memes = document.querySelectorAll('.floating-meme');
        
        memes.forEach(moveMeme);
        
        setInterval(() => {
            memes.forEach(moveMeme);
        }, 2000);
    }

    function moveMeme(meme) {
        const newX = Math.random() * (window.innerWidth - 120); 
        const newY = Math.random() * (window.innerHeight - 120);
        const newRot = (Math.random() * 90) - 45; 

        meme.style.transform = `translate(${newX}px, ${newY}px) rotate(${newRot}deg)`;
    }

    function startCameraShake() {
        let direction = 1;
        const scrollInterval = 2500;

        setInterval(() => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (direction === 1) {
                window.scrollTo(0, maxScroll);
            } else {
                window.scrollTo(0, 0);
            }
            direction *= -1;
        }, scrollInterval);
    }

    const rsvpForm = document.getElementById('rsvp-form');

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const guestName = document.getElementById('guest-name').value;
        const guestEmail = document.getElementById('guest-email').value;

        if (guestName === '' || guestEmail === '') {
            alert('¡Oye! Llena tu nombre y correo para confirmar.');
            return;
        }

        const loadingOverlay = document.getElementById('loading-overlay');
        const audio = document.getElementById('party-audio');

        loadingOverlay.style.display = 'flex';
        audio.play();
        
        const explosionTime = 5500; 

        setTimeout(() => {
            loadingOverlay.style.display = 'none';
            document.body.classList.add('party-mode');
            
            const submitButton = document.getElementById('submit-btn');
            submitButton.innerText = '¡NOS VEMOS EN LA FIESTA!';
            submitButton.disabled = true;

            startRandomMovement();
            startCameraShake();

            console.log(`¡CONFIRMADO: ${guestName} (${guestEmail})!`);

        }, explosionTime); 
    });

    const eventDate = loadEventData();
    startCountdown(eventDate);
});