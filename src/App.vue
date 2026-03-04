<script setup lang="ts">
import { useInvite } from './composables/useInvite.ts';

const {
  screen,
  codeInput,
  errorMsg,
  checkCode,
  ransomWords,
  walkers,
  confetti,
  activeDots,
  inputShaking
} = useInvite();
</script>

<template>

  <!-- ===== КОД ЕКРАН ===== -->
  <Transition name="fade">
    <div v-if="screen === 'code'" class="screen">

      <!-- Фонові декорації -->
      <div class="deco" style="top:5%;left:3%;font-size:50px;animation:wiggle 3s ease-in-out infinite">
        <img style="height: 80px;" src="./assets/items/heart.png">
      </div>
      <div class="deco" style="top:5%;right:5%;font-size:50px;animation:float 3s ease-in-out infinite">
        <img style="height: 250px;" src="./assets/items/balloons.png">
      </div>
      <div class="deco" style="bottom:3%;left:4%;font-size:80px;animation:float 4s ease-in-out infinite">
        <img style="height: 150px;" src="./assets/items/disco.png">
      </div>
      <div class="deco" style="bottom:5%;right:3%;font-size:70px;animation:float 5s ease-in-out infinite">
        <img style="height: 150px;" src="./assets/items/disco.png">
      </div>
      <div class="deco" style="top:18%;left:3%;font-size:28px;animation:float 4s ease-in-out infinite">
        <img style="height: 80px;" src="./assets/items/star.png">
      </div>

      <!-- Картка -->
      <div class="code-card">
        <p class="code-title">Psst! You're invited
          <img style="height: 50px;" src="./assets/items/glass-1.png">
        </p>

        <label class="field-label">↓ Введи свій секретний код ↓</label>
        <input
            v-model="codeInput"
            :class="['code-input', { shake: inputShaking }]"
            maxlength="10"
            placeholder="••••••"
            autocomplete="off"
            spellcheck="false"
            @keyup.enter="checkCode"
        />

        <button class="enter-btn" @click="checkCode">Ввести ✨</button>
        <p class="error-msg">{{ errorMsg }}</p>
      </div>

    </div>
  </Transition>

  <!-- ===== АНІМАЦІЯ ХОДИ ===== -->
  <Transition name="fade">
    <div v-if="screen === 'walk'" class="screen">

      <p class="walk-title">Запрошую тебе! 🎉</p>

      <div class="walk-stage">
        <!-- Конфеті -->
        <div
            v-for="c in confetti" :key="'c'+c.id"
            class="confetti-piece"
            :style="{
            left: c.left + '%',
            background: c.color,
            animationDuration: c.duration + 's',
            animationDelay: c.delay + 's',
            transform: `rotate(${c.rotation}deg)`,
          }"
        />
        <!-- Вокери -->
        <div
            v-for="w in walkers" :key="w.id"
            class="walker"
            :style="{
            animationDuration: w.duration + 'ms',
            animationDelay: w.delay + 'ms',
            bottom: (43 + w.yOffset) + 'px',
          }"
        >
          <div
              class="walker-avatar"
              :style="{ borderColor: w.color, boxShadow: `3px 3px 0 ${w.color}` }"
          >{{ w.emoji }}</div>
          <div class="walker-legs">
            <div class="leg" /><div class="leg" />
          </div>
          <div class="walker-name">{{ w.name }}</div>
        </div>
      </div>

      <!-- Прогрес крапки -->
      <div class="progress-dots">
        <div
            v-for="i in 4" :key="i"
            :class="['prog-dot', { active: activeDots >= i }]"
        />
      </div>
      <p class="walk-hint">всі йдуть на вечірку...</p>

    </div>
  </Transition>

  <!-- ===== ЗАПРОШЕННЯ ===== -->
  <Transition name="pop">
    <div v-if="screen === 'invite'" class="screen invite-screen">
      <div class="invite-card">

        <!-- Скотч декор -->
        <div class="tape" style="top:-8px;left:20px;transform:rotate(-8deg)"></div>
        <div class="tape" style="top:-8px;right:20px;transform:rotate(6deg)"></div>

        <!-- Абсолютні декорації -->
        <span class="abs-deco" style="bottom:20px;right:-10px;font-size:36px;animation:float 3.5s ease-in-out infinite">🍹</span>
        <span class="abs-deco" style="bottom:-5px;left:-10px;font-size:40px;animation:float 2.8s ease-in-out infinite .5s">🎂</span>
        <span class="abs-deco" style="top:40px;left:-10px;font-size:42px;animation:wiggle 3s ease-in-out infinite">💗</span>
        <span class="abs-deco" style="top:20px;right:-5px;font-size:32px;animation:spin 6s linear infinite">🪩</span>
        <div class="abs-deco" style="right:-20px;top:80px;font-size:28px;line-height:1.4;animation:float 2.5s ease-in-out infinite">🎈<br>🎈<br>🎈</div>

        <div class="inv-bunting">🎪 🎀 🎊 🎀 🎪</div>

        <div class="photo-area">
          <span class="inv-hat">🎩</span>
          <div class="inv-photo">👸</div>
          <span class="inv-star">💫</span>
        </div>

        <div class="inv-number">25</div>
        <p class="inv-bday">Birthday Party 🎀</p>

        <div class="ransom">
          <span
              v-for="w in ransomWords" :key="w.text"
              :style="{ background: w.bg, color: w.color, transform: `rotate(${w.rot})` }"
          >{{ w.text }}</span>
        </div>

        <hr class="inv-divider" />

        <div class="inv-details">
          <span class="inv-date">21 березня 2025</span>
          <span class="inv-time">🕓 16:00</span>
          <span class="inv-place">📍 Some Place</span>
        </div>

        <p class="inv-footer">будь там • dress code: рожеве 💅</p>
      </div>
    </div>
  </Transition>

</template>

<!--<style scoped ></style>-->