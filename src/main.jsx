import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Github, Linkedin, Mail, Menu, Pause, Play, X } from 'lucide-react'
import lazyTravelLogo from './assets/lazytravel-logo.jpg'
import earlyDropLogo from './assets/earlydrop-logo.gif'
import './styles.css'

const projects = [
  {
    number: '01', name: 'EarlyDrop', category: 'News with a point of view', label: 'NLP + NEWSLETTER',
    description: 'A newsletter that brings an Indian cultural lens to stories in tech and finance.',
    detail: 'I built a Java news curation and ranking pipeline, explored NLP for relevance, and shared an early pilot with around 50 Georgia Tech student organization contacts.',
    tags: ['Java', 'NLP', 'Content curation'], kind: 'news'
  },
  {
    number: '02', name: 'LazyTravel', category: 'A little curiosity, a lot of possibility', label: 'AI TRAVEL PLANNER',
    description: 'An agentic AI travel planner for the places that don’t make the first page of search results.',
    detail: 'A research agent looks for hidden gems, a budget agent narrows the options, and a small language model brings it all together into an itinerary.',
    tags: ['Agentic AI', 'Research', 'Product design'], kind: 'travel'
  }
]

const work = [
  {
    index: '01', navLabel: 'Modernization', title: 'Modernizing without interrupting the business', field: 'PLATFORM ENGINEERING',
    summary: 'Modernized 300 financial services applications in 18 months.',
    challenge: 'Aging virtual machine workloads needed a reliable path to containers.',
    approach: 'Built reusable Helm templates, right-sized pods, and planned disaster recovery and phased traffic migration.',
    outcome: 'About $5M in infrastructure savings and 30% higher throughput.',
    tools: 'RED HAT OPENSHIFT / KUBERNETES / HELM / JAVA / PYTHON'
  },
  {
    index: '02', navLabel: 'Payments', title: 'Making payment services more resilient', field: 'FINANCIAL SERVICES / ENGINEERING',
    summary: 'Improved fraud detection and resilience for card payments.',
    challenge: 'Card networks needed reliable connections and faster fraud detection.',
    approach: 'Led five releases of Java and Kafka services deployed on AWS. Used Hystrix circuit breakers for card network calls, with Docker and Jenkins for CI/CD.',
    outcome: 'Improved fraud detection 10x, processed 150 TPS with a 0.05% error margin, and cut connection failures by 95%.',
    tools: 'JAVA / SPRING BOOT / KAFKA / AWS / HYSTRIX / DOCKER / JENKINS'
  },
  {
    index: '03', navLabel: 'Data pipelines', title: 'A better home for data pipelines', field: 'DATA ENGINEERING',
    summary: 'Replatformed Spark ETL jobs from VMs to OpenShift.',
    challenge: 'VM based scheduling, NAS storage, and SFTP dependencies tied ETL jobs to legacy infrastructure.',
    approach: 'Ran Spark in cluster mode on OpenShift with driver and executor pods. Replaced NAS storage patterns with persistent volume claims (PVCs), adapted SFTP connectivity, and moved batch scheduling to Kubernetes Jobs.',
    outcome: 'Moved hundreds of jobs; the wider program converted over 1,000 scheduled jobs.',
    tools: 'APACHE SPARK / PYTHON / SFTP / KUBERNETES / OPENSHIFT'
  },
  {
    index: '04', navLabel: 'Agentic SDLC', title: 'Automating the modernization SDLC', field: 'AGENTIC AI / SOFTWARE DELIVERY',
    summary: 'Automated legacy modernization from code discovery through delivery.',
    challenge: 'Unfamiliar mainframe code slowed safe modernization.',
    approach: 'Built an IBM watsonx multiagent workflow to explain legacy code, generate Java services, support code review and testing, and automate deployment, with engineers validating output.',
    outcome: 'Converted 110 mainframe services to Java microservices and cut SDLC cycle time by 33%.',
    tools: 'IBM WATSONX / WATSON STUDIO / PROJECT BOB / JAVA'
  },
  {
    index: '05', navLabel: 'API architecture', title: 'From three APIs to a bigger idea', field: 'SOLUTIONS ARCHITECTURE',
    summary: 'Built an API proof of concept for a global bank.',
    challenge: 'A bank needed a maintainable Java integration platform on a tight timeline.',
    approach: 'Built three demo APIs, set Java standards, and automated parts of API Connect migration and OpenShift setup.',
    outcome: 'Won a $1M engagement to modernize 50 APIs.',
    tools: 'JAVA / SPRING BOOT / IBM API CONNECT / OPENSHIFT / CI/CD'
  },
  {
    index: '06', navLabel: 'Machine learning', title: 'Finding malicious signals in network logs', field: 'MACHINE LEARNING ENGINEERING',
    summary: 'Built malware classifiers during a FireEye internship.',
    challenge: 'Analysts needed to find suspicious content in large network logs.',
    approach: 'Built eight Python classifiers with scikit-learn and NLP, then used clustering and dimensionality reduction to investigate misses.',
    outcome: 'Models exceeded 90% accuracy; analysis surfaced 350 false negatives and informed rule updates.',
    tools: 'PYTHON / SCIKIT-LEARN / TF-IDF / K-MEANS / NLP'
  },
  {
    index: '07', navLabel: 'Leadership', title: 'Helping teams do their best work', field: 'ENGINEERING LEADERSHIP',
    summary: 'Led distributed teams of 25 to 30 through technical change.',
    challenge: 'Teams needed clear decisions, ownership, and support through complex delivery.',
    approach: 'Set architecture direction, managed plans and dependencies, aligned stakeholders, and coached engineers.',
    outcome: 'Improved delivery alignment through clear technical direction and ongoing coaching.',
    tools: 'ENGINEERING LEADERSHIP / TECHNICAL STRATEGY / DELIVERY OWNERSHIP / HIRING & DEVELOPMENT'
  }
]

function useCarousel(count, delay) {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [interacting, setInteracting] = useState(false)
  const [visible, setVisible] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => { if (preference.matches) setPlaying(false) }
    update()
    preference.addEventListener('change', update)
    return () => preference.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 })
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!playing || interacting || !visible) return undefined
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex(current => (current + 1) % count)
    }, delay)
    return () => window.clearInterval(timer)
  }, [count, delay, index, interacting, playing, visible])

  const goTo = next => setIndex((next + count) % count)
  const interactionProps = {
    onFocusCapture: () => setInteracting(true),
    onBlurCapture: event => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false) }
  }
  return { index, playing, setPlaying, goTo, containerRef, interactionProps }
}

function CarouselControls({ carousel, items, label }) {
  return <div className="carousel-controls">
    <div className="carousel-position"><span>{String(carousel.index + 1).padStart(2, '0')}</span><span className="position-rule"/><span>{String(items.length).padStart(2, '0')}</span></div>
    <div className="carousel-dots" aria-label={`Choose ${label} slide`}>
      {items.map((item, index) => <button key={item.name || item.index} className={index === carousel.index ? 'carousel-dot active' : 'carousel-dot'} onClick={() => carousel.goTo(index)} aria-label={`Show ${item.name || item.title}`} aria-current={index === carousel.index ? 'true' : undefined}>{item.navLabel || item.name}</button>) }
    </div>
    <div className="carousel-actions"><button className="pause-button" onClick={() => carousel.setPlaying(!carousel.playing)} aria-label={`${carousel.playing ? 'Pause' : 'Play'} automatic ${label} slides`}>{carousel.playing ? <Pause size={15}/> : <Play size={15}/>}</button><button onClick={() => carousel.goTo(carousel.index - 1)} aria-label={`Previous ${label}`}><ArrowLeft size={18}/></button><button onClick={() => carousel.goTo(carousel.index + 1)} aria-label={`Next ${label}`}><ArrowRight size={18}/></button></div>
  </div>
}

function ProjectsCarousel() {
  const carousel = useCarousel(projects.length, 3000)
  const project = projects[carousel.index]
  const isTravel = project.kind === 'travel'
  return <div className="carousel-shell" ref={carousel.containerRef} {...carousel.interactionProps} role="region" aria-roledescription="carousel" aria-label="Personal projects">
    <div className="project-stage" key={project.name} role="group" tabIndex={0} aria-roledescription="slide" aria-label={`${carousel.index + 1} of ${projects.length}: ${project.name}. Click or press Enter or Space to pause automatic rotation`} onClick={() => carousel.setPlaying(false)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); carousel.setPlaying(false) } }}>
      <div className={`project-art ${isTravel ? 'travel-art' : 'news-art'}`}><div className="art-center"><img src={isTravel ? lazyTravelLogo : earlyDropLogo} alt={`${project.name} logo`}/></div></div>
      <div className="project-content"><span className="card-kicker"><span className="signal-dot"/>{project.label}</span><h3>{project.name}</h3><p className="project-category">{project.category}</p><p className="project-description">{project.description}</p><p className="project-detail">{project.detail}</p><div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
    </div>
    <CarouselControls carousel={carousel} items={projects} label="project"/>
  </div>
}

function WorkCarousel() {
  const carousel = useCarousel(work.length, 3000)
  const item = work[carousel.index]
  return <div className="carousel-shell work-shell" ref={carousel.containerRef} {...carousel.interactionProps} role="region" aria-roledescription="carousel" aria-label="Selected engineering work">
    <article className="work-stage" key={item.index} role="group" tabIndex={0} aria-roledescription="slide" aria-label={`${carousel.index + 1} of ${work.length}: ${item.title}. Click or press Enter or Space to pause automatic rotation`} onClick={() => carousel.setPlaying(false)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); carousel.setPlaying(false) } }}>
      <div className="work-overview"><div className="work-meta"><span>CASE / {item.index}</span><span>{item.field}</span></div><h3>{item.title}</h3><p>{item.summary}</p><div className="work-outcome"><span>THE IMPACT</span><strong>{item.outcome}</strong></div></div>
      <div className="work-story"><div><span className="story-number">01 / THE CHALLENGE</span><p>{item.challenge}</p></div><div><span className="story-number">02 / THE APPROACH</span><p>{item.approach}</p></div><div className="work-stack"><span className="story-number">IN THE TOOLBOX</span><p>{item.tools}</p></div></div>
    </article>
    <CarouselControls carousel={carousel} items={work} label="case study"/>
    <p className="confidential">Enterprise work is generalized to respect client confidentiality.</p>
  </div>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header"><div className="wrap header-inner"><a className="wordmark" href="#home" aria-label="Ravali Kuppachi, home"><span className="brand-icon">r<span>.</span>k</span><span className="brand-name">RAVALI KUPPACHI<small>ENGINEERING / AI / ARCHITECTURE</small></span></a><nav id="site-navigation" className={menuOpen ? 'navigation is-open' : 'navigation'} aria-label="Main navigation"><a href="#work" onClick={() => setMenuOpen(false)}>Experience</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a><a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Let’s talk <ArrowUpRight size={15}/></a></nav><button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21}/> : <Menu size={21}/>}</button></div></header>
    <main id="main">
      <section id="home" className="hero wrap"><div className="hero-copy"><div className="hero-eyebrow"><span className="signal-dot"/> ENGINEERING / CLOUD / AI</div><h1><span>Complex systems.</span><br/>Clear direction.</h1><p className="hero-positioning">I lead engineering teams that build SaaS products and cloud platforms, migrate and modernize enterprise systems, and develop AI solutions.</p><p className="hero-summary">13+ years turning enterprise complexity into dependable products for financial services and global organizations.</p><div className="hero-links"><a className="primary-link" href="#work">Explore my work <ArrowDown size={16}/></a><a className="secondary-link" href="#about">More about me <ArrowUpRight size={15}/></a></div></div><div className="hero-diagram" aria-hidden="true"><div className="diagram-top"><span>HOW I WORK</span><span>01—03</span></div><div className="diagram-main approach-steps"><div className="approach-step"><span className="approach-number">01</span><div className="approach-copy"><strong>Set direction</strong><small>Connect technical choices to business outcomes.</small></div><span className="approach-mark">↘</span></div><div className="approach-step"><span className="approach-number">02</span><div className="approach-copy"><strong>Design for change</strong><small>Build platforms that evolve with the need.</small></div><span className="approach-mark">↘</span></div><div className="approach-step"><span className="approach-number">03</span><div className="approach-copy"><strong>Deliver together</strong><small>Give teams clarity, trust, and room to grow.</small></div><span className="approach-mark approach-mark-last">↗</span></div></div><div className="diagram-footer"><span>STRATEGY / ARCHITECTURE / DELIVERY</span><span>PEOPLE FIRST</span></div></div></section>
      <div className="focus-bar"><div className="wrap focus-inner"><span>WHERE I CREATE IMPACT</span><div><span>Team & delivery leadership</span><i>✳</i><span>Cloud platforms</span><i>✳</i><span>Applied AI</span></div></div></div>

      <section id="work" className="section work-section"><div className="wrap"><div className="section-head"><div><span className="section-label">01 / SELECTED EXPERIENCE</span><h2>Real problems.<br/><span>Measurable outcomes</span></h2></div><p>Explore my work across cloud modernization, data engineering, agentic AI, APIs, machine learning, payments, and engineering leadership. Each case study shares the key decisions, collaboration, and measurable results.</p></div><WorkCarousel/></div></section>

      <section id="about" className="section about-section"><div className="wrap about-grid"><div><span className="section-label">02 / ABOUT ME</span><h2>Better work starts<br/><span>with people</span></h2></div><div className="about-copy"><p className="about-lede">I care as much about helping engineers grow as I do about building systems that work well.</p><p>Over 13+ years, I’ve led distributed teams, worked through production issues, and built cloud, data, and AI solutions for enterprise clients. I enjoy turning complex challenges into clear plans and helping teams do their best work.</p><p>I’m an engineer at heart: I still design, code, troubleshoot, and experiment. Outside work, I mentor with Girls Who Code, speak at technology events, and keep building ideas of my own.</p><a className="text-link" href="https://www.linkedin.com/in/ravalik" target="_blank" rel="noreferrer">More about my journey <ArrowUpRight size={16}/></a></div><div className="toolbox"><div className="toolbox-title"><span>THE TOOLBOX</span><span>01—04</span></div><div><span>01</span><p><strong>Cloud & platform</strong><small>OpenShift, Kubernetes, AWS, Helm</small></p></div><div><span>02</span><p><strong>Code & data</strong><small>Java, Python, Spring Boot, Spark, Kafka</small></p></div><div><span>03</span><p><strong>Applied AI</strong><small>watsonx, Copilot Studio, LLM workflows</small></p></div><div><span>04</span><p><strong>People & perspective</strong><small>Leadership, mentoring, problem solving</small></p></div></div></div></section>

      <section id="projects" className="section projects-section"><div className="wrap"><div className="section-head"><div><span className="section-label">03 / PERSONAL PROJECTS</span><h2>Made out of<br/><span>curiosity</span></h2></div><p>Two independent projects: an AI travel planner and a news curation experiment. Both started with a question and became something I could build and learn from.</p></div><ProjectsCarousel/><section className="off-hours" aria-labelledby="off-hours-title"><div className="off-hours-inner"><div><span className="section-label">A LITTLE OUTSIDE THE LINES</span><h3 id="off-hours-title">Life outside <span>work</span></h3></div><p>I’m a trained Indian classical singer and dancer. Away from the screen, I enjoy road trips, cafés with a latte and a good book, listening to music, and noticing the details in nature.</p></div></section></div></section>
    </main>
    <footer id="contact"><div className="wrap footer-inner"><div><span className="section-label">05 / GET IN TOUCH</span><h2>Let’s make<br/><span>something useful</span></h2><p>Have an interesting problem or an idea worth exploring? I’d love to hear about it.</p></div><div className="footer-links"><span>FIND ME ONLINE</span><a href="https://www.linkedin.com/in/ravalik" target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn <ArrowUpRight size={15}/></a><a href="https://github.com/ravaligayathri" target="_blank" rel="noreferrer"><Github size={16}/> GitHub <ArrowUpRight size={15}/></a><a href="mailto:kuppachiravali@gmail.com"><Mail size={16}/> Email <ArrowUpRight size={15}/></a></div></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} Ravali Kuppachi</span><span>THOUGHTFULLY BUILT / ATLANTA, GA</span><a href="#home">BACK TO TOP ↑</a></div></footer>
  </>
}

createRoot(document.getElementById('root')).render(<App />)