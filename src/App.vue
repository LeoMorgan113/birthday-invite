<script setup lang="ts">
import { useInvite } from './composables/useInvite';

const {
  screen,
  codeInput,
  errorMsg,
  checkCode,
  walkers,
  confetti,
  activeDots,
  inputShaking,
  modalOpen,
  openModal,
  closeModal
} = useInvite();
</script>

<template>
  <Transition name="fade">
    <div v-if="screen === 'code'" class="screen">
      <div class="deco" style="top:5%;left:3%;font-size:50px;animation:wiggle 3s ease-in-out infinite">
        <img style="height: 80px;" src="./assets/items/heart.png" alt="Heart">
      </div>
      <div class="deco" style="top:5%;right:5%;font-size:50px;animation:float 3s ease-in-out infinite">
        <img style="height: 250px;" src="./assets/items/balloons.png" alt="Balloons">
      </div>
      <div class="deco" style="bottom:10%;left:4%;font-size:80px;animation:float 4s ease-in-out infinite">
        <img style="height: 150px;" src="./assets/items/disco.png" alt="Disco">
      </div>
      <div class="deco" style="bottom:11%;right:3%;font-size:70px;animation:float 5s ease-in-out infinite">
        <img style="height: 150px;" src="./assets/items/disco.png" alt="Disco">
      </div>
      <div class="deco" style="top:18%;left:3%;font-size:28px;animation:float 4s ease-in-out infinite">
        <img style="height: 80px;" src="./assets/items/star.png" alt="Star">
      </div>

      <div class="code-card">
        <p class="code-title">Psst! You're invited
          <img style="height: 50px;" src="./assets/items/glass-1.png" alt="Glass">
        </p>

        <label class="field-label">↓ Введи свій секретний код ↓</label>
        <input v-model="codeInput"
               :class="['code-input', { shake: inputShaking }]"
               maxlength="10"
               placeholder="••••••"
               autocomplete="off"
               spellcheck="false"
               @keyup.enter="checkCode"/>

        <button class="enter-btn" @click="checkCode">Ввести ✨</button>
        <p class="error-msg">{{ errorMsg }}</p>
      </div>

      <div class="footer code-title">
        <a class="code-title" href="https://rewish.io/JaEAAA/wishes?access_code=8b7v95VD9izCoL">
          Wishlist by LeoMorgan
        </a>
        <span>or anything else you decide.</span>
        <span>It's not required, it's recommendations.</span>
      </div>
    </div>
  </Transition>

  <!-- ===== АНІМАЦІЯ ХОДИ ===== -->
  <Transition name="fade">
    <div v-if="screen === 'walk'" class="screen">
      <div v-for="c in confetti" :key="'c'+c.id"
           class="confetti-piece"
           :style="{ left: c.left + '%',
             top: '-5%',
            background: c.color,
            animationDuration: c.duration + 's',
            animationDelay: c.delay + 's',
            transform: `rotate(${c.rotation}deg)`,}"/>
      <p class="walk-title">Запрошую тебе! 🎉</p>
      <div class="walk-stage">

        <div v-for="w in walkers" :key="w.id"
             class="walker"
             :style="{ animationDuration: w.duration + 'ms',
              animationDelay: w.delay + 'ms',
              bottom: (43 + w.yOffset) + 'px', }">
          <div class="walker-avatar"
               :style="{ borderColor: w.color, boxShadow: `3px 3px 0 ${w.color}` }">
            <img style="height: 60px" :src="w.photo" :alt="w.name">
          </div>
          <div class="walker-legs">
            <div class="leg" :style="{ background: w.color }"/>
            <div class="leg" :style="{ background: w.color }"/>
          </div>
          <div class="walker-name">{{ w.name }}</div>
        </div>
      </div>

      <div class="progress-dots">
        <div v-for="i in 4" :key="i"
             :class="['prog-dot', { active: activeDots >= i }]"/>
      </div>
      <p class="walk-hint">Всі йдуть на вечірку...</p>
    </div>
  </Transition>

  <!-- ===== ЗАПРОШЕННЯ ===== -->
  <Transition name="pop">
    <div v-if="screen === 'invite'" class="screen invite-screen">
      <div>
        <div v-for="c in confetti" :key="'c'+c.id"
             class="confetti-piece"
             :style="{ left: c.left + '%',
            top: '-5%',
            background: c.color,
            animationDuration: c.duration+ 's',
            animationDelay: c.delay + 's',
            transform: `rotate(${c.rotation}deg)`,}"/>
      </div>

      <div style="display: flex; flex-direction: column; justify-content: space-around; gap:40px;">
        <div class="invite-card">
          <div class="tape" style="top:-8px;left:20px;transform:rotate(-8deg)"></div>
          <div class="tape" style="top:-8px;right:20px;transform:rotate(6deg)"></div>
          <a href="https://maps.app.goo.gl/yEMkRFGqPKQxLgNm7">
            <img src="/invitation.png" alt="Invite" class="invite-image">
          </a>
        </div>

        <div>
          <span class="code-title">↑ Click to find party location ↑</span>
          <span @click="openModal()" class="code-title" style="font-size: 12px;">Prikol here</span>
        </div>
      </div>
    </div>
  </Transition>

  <Teleport to="body">
    <div v-if="modalOpen" class="modal-overlay" @click="closeModal">
      <img src="/cat.jpg" class="modal-img" @click.stop />
    </div>
  </Teleport>
</template>

