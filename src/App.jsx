import { useState, useEffect } from 'react';
import FunnelContainer from './components/FunnelContainer';
import StepWelcome from './components/StepWelcome';
import StepSelection from './components/StepSelection';
import StepContact from './components/StepContact';
import StepSuccess from './components/StepSuccess';
import { BackgroundLines } from './components/ui/animated-svg-background';
import { FaWhatsapp } from 'react-icons/fa';
import logoImg from './assets/logo2.png';
import './index.css';

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    path: '', // 'servicos' or 'combos'
    selection: '',
    name: ''
  });
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [faqOpen, setFaqOpen] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const totalSteps = 4;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextStep = () => {
    setDirection(1);
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  const updateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleFaq = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const scrollToForm = () => {
    const element = document.getElementById('form-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepWelcome nextStep={nextStep} updateFormData={updateFormData} />;
      case 2:
        return <StepSelection nextStep={nextStep} prevStep={prevStep} formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <StepContact nextStep={nextStep} prevStep={prevStep} formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <StepSuccess prevStep={prevStep} formData={formData} />;
      default:
        return <StepWelcome nextStep={nextStep} updateFormData={updateFormData} />;
    }
  };

  return (
    <BackgroundLines>
      <div className="landing-page-wrapper">
        {/* Navigation Header */}
        <header className={`landing-header ${scrolled ? 'scrolled' : ''}`}>
          <div className="landing-header-inner">
            <div className="logo-container" style={{ display: 'flex', alignItems: 'center' }}>
              <img src={logoImg} alt="NeuroFlow Logo" className="header-logo" style={{ height: '40px', width: '40px', marginRight: '10px' }} />
              <span className="logo-text">NeuroFlow</span>
            </div>
            <nav className="header-nav">
              <a href="#solutions" className="nav-link">Soluções</a>
              <a href="#compare" className="nav-link">Diferencial</a>
              <a href="#faq" className="nav-link">FAQ</a>
              <button onClick={scrollToForm} className="nav-cta-btn">Começar Agora</button>
            </nav>
          </div>
        </header>

        <main className="landing-main">
          {/* Hero Section */}
          <section className="hero-section">
            <div className="hero-grid">
              <div className="hero-left">
                <div className="hero-badge">
                  <span className="hero-badge-pill">Inovação</span>
                  <span className="hero-badge-text">Automação & IA</span>
                </div>
                <h1 className="hero-title">
                  Atenda 24h e escale suas vendas <span className="highlight-gradient">no automático</span>
                </h1>
                <p className="hero-subtitle">
                  Criamos ecossistemas digitais robustos com Inteligência Artificial integrada, CRM personalizado e websites de alta conversão para alavancar os resultados da sua empresa.
                </p>
                <p className="hero-mobile-question">
                  O que podemos construir para você hoje? Preencha o formulário
                </p>
                <div className="hero-bullets">
                  <div className="hero-bullet">
                    <span className="bullet-icon">✦</span>
                    <span>Websites de alta performance & Landing Pages</span>
                  </div>
                  <div className="hero-bullet">
                    <span className="bullet-icon">✦</span>
                    <span>Agentes virtuais com IA personalizados para seu negócio</span>
                  </div>
                  <div className="hero-bullet">
                    <span className="bullet-icon">✦</span>
                    <span>Configuração e integração de CRM inteligente</span>
                  </div>
                </div>
                <div className="hero-stats">
                  <div className="hero-stat">
                    <span className="stat-value">+90%</span>
                    <span className="stat-label">Eficiência</span>
                  </div>
                  <div className="hero-stat-divider"></div>
                  <div className="hero-stat">
                    <span className="stat-value">24/7</span>
                    <span className="stat-label">Funcionamento</span>
                  </div>
                  <div className="hero-stat-divider"></div>
                  <div className="hero-stat">
                    <span className="stat-value">+40%</span>
                    <span className="stat-label">Conversão</span>
                  </div>
                </div>
              </div>
              <div className="hero-right" id="form-section">
                <FunnelContainer step={step} totalSteps={totalSteps} direction={direction}>
                  {renderStep()}
                </FunnelContainer>
              </div>
            </div>
          </section>

          {/* Marquee Ticker */}
          <section className="marquee-section">
            <div className="marquee-track">
              {[1, 2].map((i) => (
                <div key={i} className="marquee-item" style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                  <span>IA Agents</span>
                  <span className="marquee-dot"></span>
                  <span>Websites Premium</span>
                  <span className="marquee-dot"></span>
                  <span>Automação de Processos</span>
                  <span className="marquee-dot"></span>
                  <span>CRM Inteligente</span>
                  <span className="marquee-dot"></span>
                  <span>Alta Conversão</span>
                  <span className="marquee-dot"></span>
                  <span>Suporte 24/7</span>
                  <span className="marquee-dot"></span>
                </div>
              ))}
            </div>
          </section>

          {/* Solutions / Features Section */}
          <section className="features-section" id="solutions">
            <div className="section-header">
              <span className="section-subtitle-pill">O que fazemos</span>
              <h2 className="section-title">Soluções Inteligentes</h2>
              <p className="section-description">
                Aceleramos o crescimento da sua empresa eliminando tarefas manuais repetitivas e construindo canais de vendas que geram leads ininterruptamente.
              </p>
            </div>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-card-icon">🤖</div>
                <h3>Agentes de IA</h3>
                <p>Configuramos atendentes virtuais que respondem, qualificam e agendam reuniões 24h por dia no WhatsApp, Instagram ou site.</p>
              </div>
              <div className="feature-card">
                <div className="feature-card-icon">⚡</div>
                <h3>Websites Premium</h3>
                <p>Desenvolvemos landing pages de altíssima velocidade e conversão, com designs exclusivos e otimizados para SEO.</p>
              </div>
              <div className="feature-card">
                <div className="feature-card-icon">📊</div>
                <h3>CRM & Automação</h3>
                <p>Integramos e automatizamos seu funil de vendas, garantindo acompanhamento (follow-up) automático para nunca perder um lead.</p>
              </div>
              <div className="feature-card">
                <div className="feature-card-icon">🚀</div>
                <h3>Ecossistemas Digitais</h3>
                <p>Combos completos que unem Website, IA e CRM rodando em perfeita sintonia para gerar o maior ROI possível.</p>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section className="compare-section" id="compare">
            <div className="section-header">
              <span className="section-subtitle-pill">Comparativo</span>
              <h2 className="section-title">O Diferencial NeuroFlow</h2>
              <p className="section-description">
                Entenda por que a nossa abordagem focada em automação inteligente e conversão supera o modelo tradicional de desenvolvimento.
              </p>
            </div>
            <div className="compare-grid">
              <div className="compare-card standard">
                <h3>Sistemas Tradicionais / Agências</h3>
                <ul className="compare-list">
                  <li className="compare-item">
                    <span className="compare-icon neg">❌</span>
                    <span>Demora na entrega e código engessado</span>
                  </li>
                  <li className="compare-item">
                    <span className="compare-icon neg">❌</span>
                    <span>Sites lentos que não geram leads</span>
                  </li>
                  <li className="compare-item">
                    <span className="compare-icon neg">❌</span>
                    <span>Falta de automação comercial e funis</span>
                  </li>
                  <li className="compare-item">
                    <span className="compare-icon neg">❌</span>
                    <span>Processos manuais suscetíveis a falhas</span>
                  </li>
                  <li className="compare-item">
                    <span className="compare-icon neg">❌</span>
                    <span>Sem suporte pós-entrega ou IA</span>
                  </li>
                </ul>
              </div>
              <div className="compare-vs">VS</div>
              <div className="compare-card premium">
                <h3>Ecossistema NeuroFlow</h3>
                <ul className="compare-list">
                  <li className="compare-item pos">
                    <span className="compare-icon pos">✓</span>
                    <span>Desenvolvimento ágil com tecnologias modernas</span>
                  </li>
                  <li className="compare-item pos">
                    <span className="compare-icon pos">✓</span>
                    <span>Foco em conversão e carregamento ultra rápido</span>
                  </li>
                  <li className="compare-item pos">
                    <span className="compare-icon pos">✓</span>
                    <span>CRMs integrados com disparos automáticos</span>
                  </li>
                  <li className="compare-item pos">
                    <span className="compare-icon pos">✓</span>
                    <span>Agentes de IA trabalhando 24 horas por dia</span>
                  </li>
                  <li className="compare-item pos">
                    <span className="compare-icon pos">✓</span>
                    <span>Acompanhamento estratégico e otimização contínua</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Accordion */}
          <section className="faq-section" id="faq">
            <div className="section-header">
              <span className="section-subtitle-pill">FAQ</span>
              <h2 className="section-title">Perguntas Frequentes</h2>
            </div>
            <div className="faq-list">
              {[
                {
                  q: "Como a NeuroFlow pode ajudar a minha empresa?",
                  a: "A NeuroFlow desenvolve websites sob medida de alta conversão, integra sistemas de CRM inteligentes para gerenciar seus leads e implementa agentes de Inteligência Artificial para automatizar seu atendimento ao cliente 24/7 no WhatsApp, Instagram e sites."
                },
                {
                  q: "Os agentes de Inteligência Artificial atendem de forma natural?",
                  a: "Sim. Nossos robôs de IA são alimentados com a base de dados da sua empresa e treinados em linguagem natural. Eles respondem de forma simpática, explicam produtos e serviços, coletam dados de contato e direcionam o cliente para a venda."
                },
                {
                  q: "Qual o prazo médio de desenvolvimento?",
                  a: "O prazo médio varia conforme a complexidade. Landing pages e websites institucionais levam entre 7 a 15 dias. Integrações complexas de CRM e agentes de IA levam de 15 a 30 dias úteis."
                },
                {
                  q: "Como funciona a contratação?",
                  a: "Basta preencher a simulação/orçamento aqui no topo desta página. Em seguida, clique no botão de WhatsApp para nos enviar sua escolha e nossa equipe entrará em contato para alinhar os detalhes e iniciar o projeto."
                }
              ].map((item, idx) => (
                <div key={idx} className={`faq-item ${faqOpen === idx ? 'open' : ''}`}>
                  <div className="faq-question-container" onClick={() => toggleFaq(idx)}>
                    <span className="faq-question">{item.q}</span>
                    <span className="faq-toggle-icon">+</span>
                  </div>
                  <div className="faq-answer-container" style={{ maxHeight: faqOpen === idx ? '200px' : '0' }}>
                    <div className="faq-answer">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="landing-footer">
          <p>© 2026 NeuroFlow. Todos os direitos reservados. Impulsionando negócios com IA e Automação.</p>
        </footer>

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/554796732918?text=Olá! Estava navegando no site da NeuroFlow e gostaria de falar diretamente com um especialista."
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float-btn"
          aria-label="Falar com especialista no WhatsApp"
        >
          <FaWhatsapp size={28} />
        </a>
      </div>
    </BackgroundLines>
  );
}

export default App;
