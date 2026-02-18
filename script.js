// Конфигурация проекта
const CONFIG = {
    signatureName: "❤️", // Замените на своё имя
    finalLevelPassword: "Nekto", // Пароль для последнего уровня
    musicEnabled: true // Включить фоновую музыку
};

// Массив с 10 уровнями (первые 10 из оригинального списка)
const levels = [
    // Уровень 1
    {
        riddle: "Ночью он совсем не спит, дом от мышек сторожит, молоко из миски пьёт, ну конечно, это …?",
        answer: "кот",
        letter: "У кошек прекрасные глаза но твои ещё прекраснее❤️"
    },
    // Уровень 2
    {
        riddle: "Где мы познакомились?",
        answer: "некто",
        letter: "Ещё бы не запомнила :)"
    },
    
    // Уровень 3
    {
        riddle: "Во дворе они стоят и катают всех ребят, на них смело залезают, будто в небо подлетаю?",
        answer: "качели",
        letter: "Загадка для детей 6-7 лет я знал что ты легко отгадаешь❤️."
    },
    
    // Уровень 4
    {
        riddle: "У кого есть шапка без головы и нога без сапога?",
        answer: "гриб",
        letter: "Думаю и с этим ты легко справилась но дальше будет не так легко:)❤️"
    },
    
    // Уровень 5
    {
        riddle: "Важный орган у мужчин,Очень им необходим.Чтоб проблем с ним избежать,Нужно знать куда совать",
        answer: "нос",
        letter: "Ой ты и с этим легко разобралась, а дальше задания но они все будут сложные❤️"
    },
    
    // Уровень 6
    {
        riddle: "Спой песенку в гс и отправь ко мне?",
        answer: "0982",
        letter: "Не ожидал что ты сделаешь это❤️"
    },
    
    // Уровень 7
    {
        riddle: "Скинь не однократно пару своих фотографий где ты в полный рост",
        answer: "8765",
        letter: "Ты и это сделала?❤️"
    },
    
    // Уровень 8
    {
        riddle: "Расскажи мне то что никто не знает о тебе",
        answer: "3744",
        letter: "А дальше будет на много сложнее"
    },
    
    // Уровень 9
    {
        riddle: "Скинь ко мне свои интимные фотографии не однократно",
        answer: "8347",
        letter: "Удивлен что ты и с этим справилась но следущее точно будет последней каплей"
    },
    
    // Уровень 10 (Финальный)
    {
        riddle: "Скинь не однократно свое интимное видео снятое специально для меня видео не меньше 5 минут ",
        answer: "8394",
        letter: "Я не знаю что ты не можешь сделать"
    }
];

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация элементов
    const splashScreen = document.querySelector('.splash-screen');
    const mainPage = document.querySelector('.main-page');
    const musicControl = document.querySelector('.music-control');
    const bgMusic = document.getElementById('bgMusic');
    
    // Загружаем прогресс
    const completedLevels = JSON.parse(localStorage.getItem('completedLevels')) || [];
    
    // Создаем падающие созвездия (вместо лепестков)
    createConstellations();
    
    // Настройка музыки
    if (CONFIG.musicEnabled) {
        bgMusic.volume = 0.3; // Установка комфортной громкости
        musicControl.style.display = 'flex';
        
        // Обработчик клика по контролу музыки
        musicControl.addEventListener('click', toggleMusic);
    } else {
        musicControl.style.display = 'none';
    }
    
    // Установка подписи
    document.getElementById('signature-name').textContent = CONFIG.signatureName;
    
    // Показ заставки
    setTimeout(() => {
        splashScreen.style.display = 'none';
        mainPage.style.display = 'block';
        generateLevelButtons(completedLevels);
        
        // Автовоспроизведение музыки (работает не во всех браузерах)
        if (CONFIG.musicEnabled) {
            const playPromise = bgMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    musicControl.textContent = '🎵';
                });
            }
        }
    }, 3000);
    
    // Закрытие модальных окон
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.modal-overlay').style.display = 'none';
            document.querySelector('.letter-overlay').style.display = 'none';
        });
    });
    
    // Обработчик для оверлея (закрытие по клику вне модалки)
    document.querySelectorAll('.modal-overlay, .letter-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.style.display = 'none';
            }
        });
    });
});

// Создание падающих созвездий
function createConstellations() {
    const container = document.querySelector('.constellations');
    const count = 20; // Количество созвездий
    const starSymbols = ['✨', '⭐', '🌟', '💫', '⚡', '🌠', '☄️', '✨', '⭐', '🌟'];
    const constellationPatterns = [
        '⡆⠤⠄', '⣀⣤⣶', '⣿⣿⣿', '✦✧✩', '⋆｡°✩', '☾⋆｡°✩'
    ];
    
    for (let i = 0; i < count; i++) {
        const constellation = document.createElement('div');
        constellation.className = 'constellation';
        
        // Случайный выбор: либо группа звезд, либо одиночная звезда
        if (Math.random() > 0.5) {
            // Группа звезд (маленькое созвездие)
            const pattern = constellationPatterns[Math.floor(Math.random() * constellationPatterns.length)];
            constellation.innerHTML = pattern;
            constellation.style.fontSize = `${20 + Math.random() * 30}px`;
        } else {
            // Одиночная яркая звезда
            constellation.innerHTML = starSymbols[Math.floor(Math.random() * starSymbols.length)];
            constellation.style.fontSize = `${25 + Math.random() * 40}px`;
        }
        
        constellation.style.left = `${Math.random() * 100}vw`;
        constellation.style.animationDuration = `${8 + Math.random() * 15}s`;
        constellation.style.animationDelay = `${Math.random() * 5}s`;
        constellation.style.color = `rgba(100, 200, 255, ${0.3 + Math.random() * 0.7})`;
        
        container.appendChild(constellation);
    }
}

// Управление музыкой
function toggleMusic() {
    const bgMusic = document.getElementById('bgMusic');
    const musicControl = document.querySelector('.music-control');
    
    if (bgMusic.paused) {
        bgMusic.play();
        musicControl.textContent = '🔊';
    } else {
        bgMusic.pause();
        musicControl.textContent = '🎵';
    }
}

// Генерация кнопок уровней
function generateLevelButtons(completedLevels) {
    const grid = document.querySelector('.levels-grid');
    grid.innerHTML = '';
    
    levels.forEach((_, index) => {
        const btn = document.createElement('button');
        btn.className = 'level-btn';
        btn.textContent = index + 1;
        btn.id = `level-${index + 1}`;
        
        if (completedLevels.includes(index)) {
            markLevelAsCompleted(btn, index);
        } else {
            btn.addEventListener('click', () => openLevel(index));
        }
        
        grid.appendChild(btn);
    });
}

// Открытие уровня
function openLevel(levelIndex) {
    const level = levels[levelIndex];
    const modal = document.querySelector('.modal-overlay');
    
    document.getElementById('current-level').textContent = levelIndex + 1;
    document.querySelector('.modal-riddle').textContent = level.riddle;
    
    // Создание поля для ввода ответа
    const inputContainer = document.querySelector('.crossword-input');
    inputContainer.innerHTML = '';
    
    for (let i = 0; i < level.answer.length; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = 1;
        input.dataset.index = i;
        input.addEventListener('input', moveToNextInput);
        inputContainer.appendChild(input);
    }
    
    modal.style.display = 'flex';
    document.querySelector('.crossword-input input').focus();
}

// Проверка ответа
document.querySelector('.submit-btn').addEventListener('click', checkAnswer);

function checkAnswer() {
    const levelIndex = parseInt(document.getElementById('current-level').textContent) - 1;
    const inputs = document.querySelectorAll('.crossword-input input');
    let userAnswer = '';
    
    inputs.forEach(input => {
        userAnswer += input.value.toLowerCase();
    });
    
    if (userAnswer === levels[levelIndex].answer) {
        // Сохраняем прогресс
        const completedLevels = JSON.parse(localStorage.getItem('completedLevels')) || [];
        
        if (!completedLevels.includes(levelIndex)) {
            completedLevels.push(levelIndex);
            localStorage.setItem('completedLevels', JSON.stringify(completedLevels));
        }
        
        showLetter(levelIndex);
        
        // Особый эффект для последнего уровня
        if (levelIndex === 9) { // 10-й уровень (индекс 9)
            startConfetti();
        }
    } else {
        alert('Попробуй ещё раз, любимый(ая)!');
        inputs[0].focus();
    }
}

// Показ письма
function showLetter(levelIndex) {
    const level = levels[levelIndex];
    const letterModal = document.querySelector('.letter-overlay');
    
    document.querySelector('.letter-text').innerHTML = level.letter;
    document.querySelector('.modal-overlay').style.display = 'none';
    letterModal.style.display = 'flex';
    
    // Обновляем кнопку уровня
    const btn = document.getElementById(`level-${levelIndex + 1}`);
    markLevelAsCompleted(btn, levelIndex);
    
    // Особые эффекты для последнего уровня
    if (levelIndex === 9) { // 10-й уровень
        const letterModalContent = document.querySelector('.letter-modal');
        letterModalContent.style.background = 'linear-gradient(135deg, #000033, #000066)';
        letterModalContent.style.color = '#00ffff';
        letterModalContent.style.borderColor = '#00ffff';
        letterModalContent.style.boxShadow = '0 0 30px #00ffff';
    }
}

// Пометка уровня как пройденного
function markLevelAsCompleted(btn, levelIndex) {
    btn.classList.add('completed');
    btn.style.background = 'rgba(0, 255, 255, 0.2)';
    btn.style.color = 'white';
    btn.style.borderColor = '#00ffff';
    btn.style.boxShadow = '0 0 15px #00ffff';
    btn.onclick = () => showLetter(levelIndex);
}

// Автопереход между инпутами
function moveToNextInput(e) {
    const inputs = document.querySelectorAll('.crossword-input input');
    const currentIndex = parseInt(e.target.dataset.index);
    
    if (e.target.value && currentIndex < inputs.length - 1) {
        inputs[currentIndex + 1].focus();
    }
}

// Эффект конфетти (теперь звездное)
function startConfetti() {
    const confettiSettings = { 
        target: 'confetti-canvas',
        max: 150,
        size: 1.5,
        animate: true,
        props: ['✨', '⭐', '🌟', '💫', '⚡', '🌠'],
        colors: [[0, 255, 255], [100, 200, 255], [150, 150, 255], [200, 200, 255]],
        clock: 25,
        rotate: true
    };
    
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
    
    // Остановка через 10 секунд
    setTimeout(() => confetti.clear(), 10000);
}

function resetProgress() {
  const modal = document.createElement('div');
  modal.className = 'confirm-modal-overlay';
  modal.innerHTML = `
    <div class="confirm-modal">
      <h3>Сбросить все воспоминания?</h3>
      <p>Все пройденные уровни будут сброшены, и вам нужно будет начать путешествие заново.</p>
      <div class="confirm-buttons">
        <button class="confirm-btn confirm-yes">Да, начать сначала</button>
        <button class="confirm-btn confirm-no">Нет, продолжить</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // Стили для модального окна (обновленные под неоновую тему)
  const style = document.createElement('style');
  style.textContent = `
    .confirm-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2000;
      backdrop-filter: blur(5px);
    }
    .confirm-modal {
      background: rgba(10, 10, 30, 0.95);
      padding: 30px;
      border-radius: 20px;
      max-width: 400px;
      width: 90%;
      text-align: center;
      box-shadow: 0 0 30px #00ffff;
      border: 2px solid #00ffff;
    }
    .confirm-modal h3 {
      color: #00ffff;
      margin-bottom: 15px;
      font-family: 'Orbitron', sans-serif;
      text-shadow: 0 0 10px #00ffff;
    }
    .confirm-modal p {
      margin-bottom: 25px;
      color: #e0e0ff;
      line-height: 1.5;
    }
    .confirm-buttons {
      display: flex;
      justify-content: center;
      gap: 15px;
      flex-wrap: wrap;
    }
    .confirm-btn {
      padding: 12px 25px;
      border: none;
      border-radius: 30px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s;
      font-family: 'Orbitron', sans-serif;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .confirm-yes {
      background: transparent;
      color: #00ffff;
      border: 2px solid #00ffff;
    }
    .confirm-yes:hover {
      background: #00ffff;
      color: black;
      box-shadow: 0 0 20px #00ffff;
      transform: translateY(-2px);
    }
    .confirm-no {
      background: transparent;
      color: #ff4d4d;
      border: 2px solid #ff4d4d;
    }
    .confirm-no:hover {
      background: #ff4d4d;
      color: black;
      box-shadow: 0 0 20px #ff4d4d;
      transform: translateY(-2px);
    }
  `;
  document.head.appendChild(style);

  document.querySelector('.confirm-yes').addEventListener('click', () => {
    localStorage.removeItem('completedLevels');
    
    const resetBtn = document.querySelector('.reset-btn');
    resetBtn.innerHTML = '<span class="reset-icon">✓</span> <span class="reset-text">Воспоминания обновлены</span>';
    resetBtn.classList.add('reset-success');
    resetBtn.disabled = true;
    
    // Добавляем звезды для эффекта
    for (let i = 0; i < 5; i++) {
      createStarAnimation(resetBtn);
    }
    
    setTimeout(() => {
      location.reload();
    }, 1500);
  });

  document.querySelector('.confirm-no').addEventListener('click', () => {
    document.body.removeChild(modal);
    document.head.removeChild(style);
  });
}

// Функция для анимации звезд (вместо лепестков)
function createStarAnimation(element) {
  const star = document.createElement('div');
  star.innerHTML = '✨';
  star.style.position = 'absolute';
  star.style.fontSize = '20px';
  star.style.animation = `fallStar ${Math.random() * 2 + 1}s linear forwards`;
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = '0';
  star.style.zIndex = '100';
  star.style.filter = 'drop-shadow(0 0 5px #00ffff)';
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fallStar {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; }
      100% { transform: translateY(100px) rotate(360deg); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  
  element.appendChild(star);
  
  setTimeout(() => {
    star.remove();
    document.head.removeChild(style);
  }, 1000);
}