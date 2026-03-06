import React from 'react'
import { siteContent } from '../data/site'
import HeroScene from './HeroScene.jsx'

export default function Hero({ lang }) {
  const content = siteContent[lang] || siteContent.en

  return (
    <section className="hero" id="home">
      <div className="container hero__grid">
        <div className="hero__text">
          <p className="eyebrow">{content.hero.eyebrow}</p>
          <h1>{content.hero.title}</h1>
          <p className="lede">{content.hero.lede}</p>
          <div className="hero__metrics" role="list" aria-label="Key company metrics">
            {content.hero.metrics.map(metric => (
              <p key={metric} role="listitem"><strong>{metric}</strong></p>
            ))}
          </div>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#projects">{content.hero.primaryCta}</a>
            <a className="btn btn--ghost" href="#contact">{content.hero.secondaryCta}</a>
          </div>
        </div>

        <div className="hero__art">
          <HeroScene />
          <div className="hero__badge hero__badge--a">
            <span>{content.hero.badgeA.label}</span>
            <strong>{content.hero.badgeA.value}</strong>
          </div>
          <div className="hero__badge hero__badge--b">
            <span>{content.hero.badgeB.label}</span>
            <strong>{content.hero.badgeB.value}</strong>
          </div>
        </div>
      </div>
    </section>
  )
}
