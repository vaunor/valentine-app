// src/LoveStepsApp.jsx
import React, { useState, useEffect } from 'react'

// Если вы поместили картинку в public/final.jpg, используйте этот путь:
const FINAL_IMAGE_PUBLIC_PATH = '/final.jpg'

const messages = [
  'Начнём? Нажми «Далее» и поймай кусочек моего сердца 💌',
  'Ты — моя первая мысль утром и последняя перед сном ✨',
  'С тобой любые будни превращаются в маленькие праздники 🎈',
  'Когда ты рядом — я чувствую, что всё возможно 🌟',
  'Спасибо, что смотришь на меня таким тёплым взглядом ❤️',
  'Ты — моя поддержка, смех и уют в одном лице ☕️',
  'Я ценю каждый наш момент — большой и маленький 🕰️',
  'Сегодня я хочу сказать: люблю тебя сильнее, чем вчера 💘',
  'А теперь — сюрприз! С Днём святого Валентина! 💝'
]

export default function LoveStepsApp() {
  const [step, setStep] = useState(0)
  const [animateKey, setAnimateKey] = useState(0)

  useEffect(() => {
    setAnimateKey(k => k + 1)
  }, [step])

  function nextStep() {
    setStep(s => Math.min(s + 1, messages.length - 1))
  }
  function prevStep() {
    setStep(s => Math.max(s - 1, 0))
  }

  async function shareFinal() {
    const url = window.location.href
    const text = 'Смотри — это для тебя 💖'
    if (navigator.share) {
      try {
        await navigator.share({ title: 'С Днём Валентина', text, url })
      } catch (e) {
        // отмена пользователем
      }
    } else {
      try {
        await navigator.clipboard.writeText(url)
        alert('Ссылка скопирована в буфер обмена — можешь отправить её вручную')
      } catch (e) {
        alert('Не получилось скопировать ссылку. Можешь поделиться адресом страницы вручную.')
      }
    }
  }

  function downloadFinalImage() {
    const link = document.createElement('a')
    link.href = FINAL_IMAGE_PUBLIC_PATH
    link.download = 'our_moments_valentine.jpg'
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(180deg,#fff6fb,#ffeef3)' }}>
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden" style={{ border: '1px solid rgba(255,200,220,0.6)' }}>
        <header className="py-8 text-center px-6">
          <div className="text-3xl font-cursive" style={{ fontFamily: '"Great Vibes", cursive' }}>
            <span style={{ fontSize: 34 }}>❤️</span>
            <span className="mx-3">Наши моменты</span>
            <span style={{ fontSize: 34 }}>❤️</span>
          </div>
          <p className="mt-2 text-sm text-gray-600">Нажимай «Далее» и читай мои послания — до финального сюрприза ✨</p>
        </header>

        <main className="px-6 pb-8">
          <div className="relative flex flex-col items-center">
            <div key={animateKey} className="w-full bg-gradient-to-b from-white to-pink-50 rounded-2xl p-8 transition-transform duration-500 ease-in-out transform hover:scale-[1.01]">
              {step < messages.length - 1 ? (
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-pink-700 mb-4" style={{ minHeight: 80 }}>{messages[step]}</div>
                  <div className="flex justify-center gap-3 mt-4">
                    <Heart size={28} delay={0} />
                    <Heart size={22} delay={200} />
                    <Heart size={18} delay={400} />
                  </div>
                  <div className="mt-6 text-sm text-gray-500">Шаг {step + 1} из {messages.length}</div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="rounded-xl overflow-hidden shadow-lg bg-white">
                    <img src={FINAL_IMAGE_PUBLIC_PATH} alt="Наши моменты" className="w-full h-auto object-cover" />
                  </div>
                  <h2 className="mt-4 text-2xl font-bold text-pink-700">С Днём святого Валентина ❤️</h2>
                  <p className="mt-2 text-gray-600">Спасибо, что ты — моя лучшая история.</p>
                  <FinalHearts />
                </div>
              )}
            </div>

            <div className="mt-6 w-full flex justify-between items-center gap-3">
              <button onClick={prevStep} className="px-4 py-2 rounded-lg border hover:bg-white/90" disabled={step === 0}>Назад</button>

              {step < messages.length - 1 ? (
                <button onClick={nextStep} className="px-6 py-3 rounded-lg bg-pink-600 text-white shadow">Далее 💌</button>
              ) : (
                <div className="flex gap-3">
                  <button onClick={downloadFinalImage} className="px-4 py-2 rounded-lg border">Скачать картинку</button>
                  <button onClick={shareFinal} className="px-4 py-2 rounded-lg bg-indigo-600 text-white">Поделиться</button>
                </div>
              )}
            </div>

            <div className="mt-4 text-xs text-gray-400">Создано с любовью 💖 — открой это сообщение на телефоне для лучшего эффекта</div>
          </div>
        </main>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        .font-cursive { font-family: 'Great Vibes', cursive; }
        .heart{ display:inline-block; transform-origin:center; }
        .heart-anim{ animation: heartPop 900ms ease forwards; }
        @keyframes heartPop{ 0%{ transform: scale(0.2) translateY(10px); opacity:0 } 60%{ transform: scale(1.08) translateY(-4px); opacity:1 } 100%{ transform: scale(1) translateY(0); opacity:1 } }
        .floating-heart{ position:absolute; width:28px; height:28px; background:transparent; }
        .floating-heart svg{ filter: drop-shadow(0 4px 8px rgba(0,0,0,0.12)); }
      `}</style>
    </div>
  )
}

function Heart({ size = 24, delay = 0 }){
  const style = { width: size, height: size, transition: 'transform 300ms' }
  return (
    <div className={`heart heart-anim`} style={{ ...style, animationDelay: `${delay}ms` }} aria-hidden>
      <svg viewBox="0 0 24 24" width={size} height={size} xmlns="http://www.w3.org/2000/svg" fill="#ff6b81">
        <path d="M12 21s-7.333-4.667-9.2-7.133C.9 10.6 3.2 6 7 6c1.8 0 3.2 1 4 2.4C12.8 7 14.2 6 16 6c3.8 0 6.1 4.6 4.2 7.867C19.333 16.333 12 21 12 21z" />
      </svg>
    </div>
  )
}

function FinalHearts(){
  const hearts = Array.from({ length: 12 }).map((_, i) => ({ id: i }))
  return (
    <div aria-hidden>
      {hearts.map(h => (
        <FloatingHeart key={h.id} index={h.id} />
      ))}
    </div>
  )
}

function FloatingHeart({ index }){
  const left = 10 + (index * 13) % 80
  const delay = (index * 300) % 3000
  const duration = 4000 + (index * 300) % 3000
  const size = 18 + (index % 4) * 6

  const style = {
    position: 'absolute',
    left: `${left}%`,
    bottom: '-20px',
    width: size,
    height: size,
    animation: `floatUp${index} ${duration}ms ${delay}ms ease-in forwards`
  }

  const keyframes = `@keyframes floatUp${index} { 0% { transform: translateY(0) scale(0.6); opacity: 0 } 10% { opacity: 1 } 100% { transform: translateY(-420px) scale(1); opacity: 0 } }`

  return (
    <div style={style} className="floating-heart">
      <style>{keyframes}</style>
      <svg viewBox="0 0 24 24" fill="#ff5276" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21s-7.333-4.667-9.2-7.133C.9 10.6 3.2 6 7 6c1.8 0 3.2 1 4 2.4C12.8 7 14.2 6 16 6c3.8 0 6.1 4.6 4.2 7.867C19.333 16.333 12 21 12 21z" />
      </svg>
    </div>
  )
}
