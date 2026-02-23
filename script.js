const nav = document.querySelector('.nav')
let lastY = window.scrollY
const onScroll = () => {
  const y = window.scrollY
  if (y > 20 && y > lastY) nav.style.opacity = '0.88'
  else nav.style.opacity = '1'
  lastY = y
}
window.addEventListener('scroll', onScroll)

const flickerTargets = document.querySelectorAll('.st-title, .glitch')
setInterval(() => {
  flickerTargets.forEach(el => {
    el.style.filter = Math.random() > .5 ? 'brightness(1)' : 'brightness(.94)'
  })
}, 900)

const links = document.querySelectorAll('a[href^="#"]')
links.forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href')
    if (id.length > 1 && document.querySelector(id)) {
      e.preventDefault()
      document.querySelector(id).scrollIntoView({ behavior: 'smooth', block: 'start' })
      const menu = document.querySelector('.nav-links')
      if (menu.classList.contains('open')) menu.classList.remove('open')
    }
  })
})

const toggle = document.querySelector('.menu-toggle')
if (toggle) {
  toggle.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('open')
  })
}

const dd = document.getElementById('cd-days')
const dh = document.getElementById('cd-hours')
const dm = document.getElementById('cd-mins')
const ds = document.getElementById('cd-secs')
if (dd && dh && dm && ds) {
  const eventTime = new Date('2026-03-13T09:00:00+05:30').getTime()
  const tick = () => {
    const now = Date.now()
    let diff = Math.max(0, eventTime - now)
    const sec = 1000, min = 60*sec, hr = 60*min, day = 24*hr
    dd.textContent = String(Math.floor(diff / day)).padStart(2, '0')
    diff %= day
    dh.textContent = String(Math.floor(diff / hr)).padStart(2, '0')
    diff %= hr
    dm.textContent = String(Math.floor(diff / min)).padStart(2, '0')
    diff %= min
    ds.textContent = String(Math.floor(diff / sec)).padStart(2, '0')
  }
  tick()
  setInterval(tick, 1000)
}

const revealTargets = document.querySelectorAll('.card, .stage-list li, .panel, .contact-card, .contact-cta')
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('reveal')
  })
}, { threshold: .12 })
revealTargets.forEach(t => io.observe(t))

const backTop = document.querySelector('.back-top')
if (backTop) {
  const showBackTop = () => {
    if (window.scrollY > 400) backTop.classList.add('show')
    else backTop.classList.remove('show')
  }
  window.addEventListener('scroll', showBackTop)
  showBackTop()
}
