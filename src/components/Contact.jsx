import React, { useState } from 'react'
import { contact as info, siteContent } from '../data/site'

export default function Contact({ lang }) {
  const [sent, setSent] = useState(false)
  const content = siteContent[lang] || siteContent.en

  function onSubmit(event) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="section alt">
      <div className="container grid-2">
        <div>
          <h2>{content.contact.title}</h2>
          <p>{content.contact.text}</p>
          <ul className="contact-list" role="list">
            <li><a href={`tel:${info.phone}`}>{info.phone}</a></li>
            <li><a href={`mailto:${info.email}`}>{info.email}</a></li>
            <li><span>{info.address[lang]}</span></li>
            <li><span>{content.contact.hours}</span></li>
          </ul>
        </div>

        <form className="form" onSubmit={onSubmit} aria-label="Contact form">
          <div className="field">
            <label htmlFor="name">{content.contact.form.name}</label>
            <input id="name" name="name" required placeholder={content.contact.form.namePlaceholder} />
          </div>
          <div className="field">
            <label htmlFor="email">{content.contact.form.email}</label>
            <input id="email" type="email" name="email" required placeholder={content.contact.form.emailPlaceholder} />
          </div>
          <div className="field">
            <label htmlFor="phone">{content.contact.form.phone}</label>
            <input id="phone" name="phone" placeholder={content.contact.form.phonePlaceholder} />
          </div>
          <div className="field">
            <label htmlFor="projectType">{content.contact.form.projectType}</label>
            <select id="projectType" name="projectType" defaultValue="">
              {content.contact.form.options.map(option => (
                <option key={option.value || 'default'} value={option.value} disabled={option.disabled}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="message">{content.contact.form.message}</label>
            <textarea id="message" name="message" rows="5" required placeholder={content.contact.form.messagePlaceholder}></textarea>
          </div>
          <button className="btn btn--primary" type="submit">{content.contact.form.submit}</button>
          {sent && <p role="status" className="form__status">{content.contact.form.success}</p>}
        </form>
      </div>
    </section>
  )
}
