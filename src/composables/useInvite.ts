import { ref } from 'vue';

export function useInvite() {
    const GUEST_LIST = {
        'VLAD25': {name: 'Влад', photo: './people/vlad.png', emoji: '🦄', color: '#0079bd', sex: 'male'},
        'MISH25': {name: 'Міш', photo: './people/mish.png', emoji: '🌸', color: '#a5f3fc', sex: 'male'},
        'MASH25': {name: 'Маш', photo: './people/mash.png', emoji: '🌸', color: '#cb0b78', sex: 'female'},
        'DANYA25': {name: 'Даня', photo: './people/danya.png', emoji: '🌺', color: '#bbe5f7', sex: 'male'},
        'MASHAP25': {name: 'Марія', photo: './people/maria.png', emoji: '⭐', color: '#fd8ae6', sex: 'female'},
        'DASHA25': {name: 'Даша', photo: './people/dasha.png', emoji: '🎸', color: '#8c7bff', sex: 'female'}
    }

    const WALKERS = Object.values(GUEST_LIST);
    const screen = ref('code');
    const codeInput = ref('');
    const errorMsg = ref('');
    const activeDots = ref(0);
    const walkers = ref([]);
    const confetti = ref([]);
    const inputShaking = ref(false);
    const modalOpen = ref(false);

    function checkCode() {
        const val = codeInput.value.trim().toUpperCase();
        if (!val) {
            errorMsg.value = 'Введи свій код 🫣';
            return
        }
        if (!GUEST_LIST[val]) {
            errorMsg.value = 'Ой, невірний код... спробуй ще раз 🙈'
            inputShaking.value = true
            setTimeout(() => {
                inputShaking.value = false
            }, 500)
            return;
        }

        errorMsg.value = '';
        startWalkAnimation()
    }

    function startWalkAnimation() {
        screen.value = 'walk';
        const stagger = 3800 / WALKERS.length;
        walkers.value = WALKERS.map((w, i) => ({
            ...w, id: i,
            duration: 4200 + Math.random() * 600,
            delay: i * stagger,
            yOffset: Math.floor(Math.random() * 20) - 10,
        }));

        startConfetti();

        [0, 1, 2, 3].forEach(i => {
            setTimeout(() => {
                activeDots.value = i + 1;
            }, i * 900 + 400)
        })

        setTimeout(() => {
            screen.value = 'invite';
            startConfetti();
        }, 6000)
    }

    startConfetti();

    function startConfetti() {
        const colors = ['#f472b6', '#fde68a', '#a5f3fc', '#bbf7d0', '#ddd6fe'];
        confetti.value = Array.from({length: 1000}, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            color: colors[Math.floor(Math.random() * colors.length)],
            duration: 8 + Math.random() * 10,
            delay: Math.random() * 12,
            rotation: Math.random() * 360,
        }));
    }

    function openModal() {
        modalOpen.value = true;
    }

    function closeModal() {
        modalOpen.value = false;
    }

    return {screen, codeInput, errorMsg, checkCode, walkers, confetti, activeDots, inputShaking, modalOpen, openModal, closeModal} // ← повертаємо тільки те, що потрібно template
}