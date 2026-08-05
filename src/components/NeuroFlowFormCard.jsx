import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaWhatsapp, FaArrowLeft, FaUser, FaPhoneAlt, FaPaperPlane, FaRobot, FaGlobe, FaCheckCircle, FaCopy } from 'react-icons/fa';
import logoImg from '../assets/logo2.png';

export default function NeuroFlowFormCard() {
  const [activeTab, setActiveTab] = useState('email'); // 'email' or 'whatsapp'

  // Email form state
  const [emailForm, setEmailForm] = useState({
    name: '',
    email: '',
    phone: '',
    description: ''
  });
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  // WhatsApp form state
  const [waService, setWaService] = useState('atlas'); // 'atlas' or 'website'
  const [waName, setWaName] = useState('');

  // Default WhatsApp Phone Number (can be customized if needed)
  const whatsappNumber = '5511999999999'; // Configurable WhatsApp destination

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!emailForm.name || !emailForm.email || !emailForm.phone) {
      alert('Por favor, preencha nome, e-mail e telefone.');
      return;
    }

    const subject = encodeURIComponent(`[Contato NeuroFlow] Projeto de ${emailForm.name}`);
    const body = encodeURIComponent(
      `Olá equipe NeuroFlow!\n\n` +
      `Nome: ${emailForm.name}\n` +
      `E-mail: ${emailForm.email}\n` +
      `Telefone: ${emailForm.phone}\n` +
      (emailForm.description ? `Descrição do Projeto: ${emailForm.description}\n\n` : '\n') +
      `Enviado através do formulário oficial NeuroFlow.`
    );

    // Trigger Mailto link to ianeuroflow@gmail.com
    window.location.href = `mailto:ianeuroflow@gmail.com?subject=${subject}&body=${body}`;
    setEmailSubmitted(true);
  };

  const handleCopyEmailText = () => {
    const textToCopy = `Contato NeuroFlow:\nNome: ${emailForm.name}\nE-mail: ${emailForm.email}\nTelefone: ${emailForm.phone}\nDescrição: ${emailForm.description || 'N/A'}`;
    navigator.clipboard.writeText(textToCopy);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 3000);
  };

  const handleWhatsAppSend = (e) => {
    e.preventDefault();
    if (!waName.trim()) {
      alert('Por favor, insira o seu nome.');
      return;
    }

    const serviceName = waService === 'atlas' ? 'Agente de IA (Atlas)' : 'Websites High-Performance';
    const message = encodeURIComponent(
      `Olá NeuroFlow! Meu nome é ${waName.trim()} e gostaria de saber mais sobre ${serviceName}.`
    );

    // Open WhatsApp URL
    window.open(`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`, '_blank');
  };

  return (
    <div className="abacate-card-container">
      {/* Brand Header inside Card */}
      <div className="abacate-card-header">
        <img src="/logo.png" alt="NeuroFlow Logo" className="abacate-standalone-logo" />
        <h1 className="abacate-brand-name">NeuroFlow</h1>
        <p className="abacate-brand-tagline">Soluções em Inteligência Artificial & Websites</p>
      </div>

      {/* Primary Tab Switcher */}
      {activeTab === 'email' ? (
        <div className="tab-switch-row">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'email' ? 'active' : ''}`}
            onClick={() => setActiveTab('email')}
          >
            <FaEnvelope className="tab-icon" />
            <span>Formulário por E-mail</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'whatsapp' ? 'active' : ''}`}
            onClick={() => setActiveTab('whatsapp')}
          >
            <FaWhatsapp className="tab-icon wa-icon" />
            <span>Mensagem no WhatsApp</span>
          </button>
        </div>
      ) : null}

      <AnimatePresence mode="wait">
        {/* EMAIL FORM VIEW */}
        {activeTab === 'email' && (
          <motion.div
            key="email-view"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            transition={{ duration: 0.25 }}
            className="form-view-wrapper"
          >
            {!emailSubmitted ? (
              <form onSubmit={handleEmailSubmit} className="abacate-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Nome Completo <span className="req-star">*</span>
                  </label>
                  <div className="input-with-icon">
                    <FaUser className="input-icon" />
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Ex: Gabriel Silva"
                      value={emailForm.name}
                      onChange={(e) => setEmailForm({ ...emailForm, name: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    E-mail <span className="req-star">*</span>
                  </label>
                  <div className="input-with-icon">
                    <FaEnvelope className="input-icon" />
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="seuemail@empresa.com"
                      value={emailForm.email}
                      onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Número de Telefone / WhatsApp <span className="req-star">*</span>
                  </label>
                  <div className="input-with-icon">
                    <FaPhoneAlt className="input-icon" />
                    <input
                      id="phone"
                      type="tel"
                      required
                      placeholder="(11) 99999-9999"
                      value={emailForm.phone}
                      onChange={(e) => setEmailForm({ ...emailForm, phone: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="description" className="form-label">
                    Descrição Básica <span className="opt-tag">(opcional)</span>
                  </label>
                  <textarea
                    id="description"
                    rows="3"
                    placeholder="Conte resumidamente o que sua empresa precisa..."
                    value={emailForm.description}
                    onChange={(e) => setEmailForm({ ...emailForm, description: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                <button type="submit" className="submit-primary-btn">
                  <FaPaperPlane />
                  <span>Enviar para E-mail</span>
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="success-container"
              >
                <FaCheckCircle className="success-check-icon" />
                <h3 className="success-title">Formulário Enviado!</h3>
                <p className="success-desc">
                  Abrimos o seu leitor de e-mail padrão para enviar para <strong>ianeuroflow@gmail.com</strong>.
                </p>
                <div className="success-actions">
                  <button onClick={handleCopyEmailText} className="secondary-action-btn">
                    <FaCopy />
                    <span>{emailCopied ? 'Copiado para Área de Transferência!' : 'Copiar Resumo dos Dados'}</span>
                  </button>
                  <button onClick={() => setEmailSubmitted(false)} className="outline-action-btn">
                    Preencher Novo Formulário
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* WHATSAPP FORM VIEW */}
        {activeTab === 'whatsapp' && (
          <motion.div
            key="whatsapp-view"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.25 }}
            className="form-view-wrapper"
          >
            {/* Voltar Button at Top */}
            <div className="wa-top-bar">
              <button
                type="button"
                className="back-btn"
                onClick={() => setActiveTab('email')}
              >
                <FaArrowLeft />
                <span>Voltar</span>
              </button>
              <span className="wa-mode-badge">Via WhatsApp</span>
            </div>

            <div className="wa-section-title-box">
              <h2 className="wa-step-heading">O que você precisa hoje?</h2>
              <p className="wa-step-sub">Selecione uma opção para personalizar sua mensagem</p>
            </div>

            {/* Central 2 Options */}
            <div className="wa-options-grid">
              <button
                type="button"
                className={`wa-option-card ${waService === 'atlas' ? 'selected' : ''}`}
                onClick={() => setWaService('atlas')}
              >
                <div className="wa-option-icon-box atlas-icon-box">
                  <img src="/Design sem nome (7).png" alt="Atlas Logo" className="atlas-option-img" />
                </div>
                <div className="wa-option-info">
                  <span className="wa-option-title">Agente de IA (atlas)</span>
                  <span className="wa-option-desc">Atendente inteligente 24h no WhatsApp e CRM</span>
                </div>
                <div className="wa-radio-indicator"></div>
              </button>

              <button
                type="button"
                className={`wa-option-card ${waService === 'website' ? 'selected' : ''}`}
                onClick={() => setWaService('website')}
              >
                <div className="wa-option-icon-box">
                  <FaGlobe />
                </div>
                <div className="wa-option-info">
                  <span className="wa-option-title">Websites</span>
                  <span className="wa-option-desc">Landing pages de altíssima conversão e velocidade</span>
                </div>
                <div className="wa-radio-indicator"></div>
              </button>
            </div>

            {/* Name input and customized send button */}
            <form onSubmit={handleWhatsAppSend} className="wa-name-form">
              <div className="form-group">
                <label htmlFor="waName" className="form-label">
                  Qual é o seu nome? <span className="req-star">*</span>
                </label>
                <div className="input-with-icon">
                  <FaUser className="input-icon" />
                  <input
                    id="waName"
                    type="text"
                    required
                    placeholder="Digite seu nome aqui..."
                    value={waName}
                    onChange={(e) => setWaName(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Message preview snippet */}
              <div className="message-preview-box">
                <span className="preview-label">Prévia da mensagem:</span>
                <p className="preview-text">
                  "Olá NeuroFlow! Meu nome é <strong>{waName || '[Seu Nome]'}</strong> e gostaria de saber mais sobre <strong>{waService === 'atlas' ? 'Agente de IA (Atlas)' : 'Websites'}</strong>."
                </p>
              </div>

              <button type="submit" className="submit-wa-btn">
                <FaWhatsapp className="submit-wa-icon" />
                <span>Enviar mensagem personalizada no WhatsApp</span>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
