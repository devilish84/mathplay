import React from 'react'

export default function Home({ onSelect }) {
  return (
    <div className="level-select">
      <h1>🔢 Matematiikkaa</h1>
      <p className="subtitle">Mitä harjoitellaan tänään?</p>
      <div className="level-buttons">
        <button className="level-btn lv-home lv-add" onClick={() => onSelect('add')}>
          <span className="lv-icon">➕</span>
          <div>
            <div>Yhteenlaskut</div>
            <div className="lv-desc">Laske allekkain tai vaakasuoraan</div>
          </div>
        </button>
        <button className="level-btn lv-home lv-sub" onClick={() => onSelect('sub')}>
          <span className="lv-icon">➖</span>
          <div>
            <div>Vähennyslaskut</div>
            <div className="lv-desc">Laske allekkain tai vaakasuoraan</div>
          </div>
        </button>
        <button className="level-btn lv-home lv-seq" onClick={() => onSelect('seq')}>
          <span className="lv-icon">🔢</span>
          <div>
            <div>Lukujonot</div>
            <div className="lv-desc">Jatka lukujonoa eteenpäin</div>
          </div>
        </button>
      </div>
    </div>
  )
}
