import { useEffect, useRef } from 'react'
import { useTranslation } from '../i18n'
import translations from '../i18n/common/Summary.i18n'

interface Props {
  score: number
  total: number
  onRetry: () => void
  onBack: () => void
}

interface Particle {
  x: number; y: number
  vx: number; vy: number
  alpha: number
  color: string
  size: number
}

function launchFireworks(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!
  canvas.width  = window.innerWidth
  canvas.height = window.innerHeight

  const colors = ['#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#ff922b','#cc5de8','#f06595']
  let particles: Particle[] = []
  let frame = 0

  function burst(cx: number, cy: number) {
    for (let i = 0; i < 80; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 2 + Math.random() * 5
      particles.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 4 + Math.random() * 4,
      })
    }
  }

  const launches = [
    { t: 0,   x: 0.5, y: 0.4 },
    { t: 18,  x: 0.2, y: 0.35 },
    { t: 18,  x: 0.8, y: 0.35 },
    { t: 36,  x: 0.35,y: 0.3 },
    { t: 36,  x: 0.65,y: 0.3 },
    { t: 54,  x: 0.5, y: 0.25 },
  ]

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    launches.forEach((l) => { if (frame === l.t) burst(canvas.width * l.x, canvas.height * l.y) })
    particles.forEach((p) => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.12; p.alpha -= 0.014
      ctx.globalAlpha = Math.max(0, p.alpha)
      ctx.fillStyle   = p.color
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
    })
    ctx.globalAlpha = 1
    particles = particles.filter((p) => p.alpha > 0)
    frame++
    if (frame < 200) requestAnimationFrame(tick)
  }
  tick()
}

export default function Summary({ score, total, onRetry, onBack }: Props) {
  const t   = useTranslation(translations)
  const pct = Math.round((score / total) * 100)
  const perfect = pct === 100
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (perfect && canvasRef.current) launchFireworks(canvasRef.current)
  }, [perfect])

  const emoji = perfect ? '🏆' : pct >= 70 ? '🌟' : pct >= 40 ? '👍' : '💪'
  const msg   = perfect ? t('perfect') : pct >= 70 ? t('great') : pct >= 40 ? t('good') : t('keepGoing')

  return (
    <div className={`summary${perfect ? ' summary--perfect' : ''}`}>
      {perfect && (
        <canvas ref={canvasRef} className="fireworks-canvas fireworks-canvas--fullscreen" />
      )}
      <div className="summary-content">
        <div className="emoji-big">{emoji}</div>
        <h2>{msg}</h2>
        <div className="result-text">{t('result', { score, total, pct })}</div>
        <div className="summary-buttons">
          <button className="retry-btn" onClick={onRetry}>{t('retry')}</button>
          <button className="home-btn"  onClick={onBack}>{t('back')}</button>
        </div>
      </div>
    </div>
  )
}
