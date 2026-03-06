import React from 'react'
import { faqs, siteContent } from '../data/site'

export default function FAQ({ lang }) {
  const content = siteContent[lang] || siteContent.en

  return (
    <section className="section faq" id="faq">
      <div className="container">
        <h2>{content.faq.title}</h2>
        <div className="faq__list">
          {faqs.map(item => (
            <details key={item.q.en} className="faq__item">
              <summary>{item.q[lang]}</summary>
              <p>{item.a[lang]}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
