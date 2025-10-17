// Add keyframe animations and mobile styles to document
export function injectStyles() {
  if (typeof document === 'undefined') return;

  const styleId = 'webauthn-wallet-animations';
  if (document.getElementById(styleId)) return;

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    /* Base classes */
    .webauthn-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      animation: fadeIn 0.2s ease-in;
      padding: 16px;
      box-sizing: border-box;
    }

    .webauthn-modal {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 16px;
      max-width: 420px;
      width: 100%;
      max-height: 90vh;
      overflow: auto;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      animation: slideUp 0.3s ease-out;
      position: relative;
      margin: auto;
      -webkit-overflow-scrolling: touch;
      transform: translateZ(0);
    }

    .webauthn-modal__close {
      position: absolute;
      top: 16px;
      right: 16px;
      background: transparent;
      border: none;
      font-size: 32px;
      line-height: 1;
      color: #666;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
    }

    .webauthn-modal__close:hover,
    .webauthn-modal__close:active,
    .webauthn-modal__close:focus {
      top: 16px;
      right: 16px;
      color: #1a1a1a;
    }

    .webauthn-modal__header {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 16px;
      margin-top: 8px;
      color: #1a1a1a;
    }

    .webauthn-modal__description {
      font-size: 14px;
      color: #666;
      margin-bottom: 24px;
      line-height: 1.5;
    }

    .webauthn-icon {
      font-size: 48px;
      text-align: center;
      margin-bottom: 16px;
    }

    .webauthn-input {
      width: 100%;
      color: #1a1a1a;
      padding: 16px;
      font-size: 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      margin-bottom: 16px;
      box-sizing: border-box;
      transition: border-color 0.2s;
    }
    .webauthn-input.is-valid { border-color: #0066ff; }
    .webauthn-input.is-invalid { border-color: #ff0000; }

    .webauthn-button {
      width: 100%;
      font-size: 16px;
      font-weight: 600;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      margin-bottom: 12px;
    }
    .webauthn-button.primary { background-color: #0066ff; color: #ffffff; }
    .webauthn-button.primary:hover { background-color: #0052cc; }
    .webauthn-button.secondary { background-color: #f0f0f0; color: #1a1a1a; }
    .webauthn-button.secondary:hover { background-color: #e0e0e0; }
    .webauthn-button.disabled { background-color: #e0e0e0; color: #999; cursor: not-allowed; }

    .webauthn-error {
      background-color: #fff0f0;
      border: 1px solid #ffcccc;
      color: #cc0000;
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 16px;
      font-size: 14px;
    }

    .webauthn-loading { text-align: center; padding: 32px; }
    .webauthn-spinner {
      border: 3px solid #f0f0f0;
      border-top: 3px solid #0066ff;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: 0 auto 16px;
    }

    /* Account list item */
    .webauthn-account-item {
      background-color: #f5f5f5;
      color: #333;
      border: 2px solid #e0e0e0;
      padding: 16px;
      margin-bottom: 10px;
      text-align: left;
      font-weight: 500;
      font-size: 14px;
      transition: all 0.2s ease;
      cursor: pointer;
      width: 100%;
      border-radius: 8px;
    }
    .webauthn-account-item:hover { border-color: #0066ff; background-color: #f0f7ff; }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes slideUpMobile {
      from {
        opacity: 0;
        transform: translateY(100%);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    /* Mobile-specific styles */
    @media (max-width: 768px) {
      .webauthn-modal-overlay {
        align-items: flex-end !important;
        padding: 0 !important;
      }
      
      .webauthn-modal {
        border-radius: 16px 16px 0 0 !important;
        margin: 0 !important;
        max-height: 85vh !important;
        width: 100% !important;
        animation: slideUpMobile 0.3s ease-out !important;
      }
    }
    
    @media (max-height: 600px) {
      .webauthn-modal {
        max-height: 95vh !important;
        padding: 16px !important;
      }
    }
    
    /* Prevent zoom on iOS when focusing inputs */
    @media screen and (-webkit-min-device-pixel-ratio: 0) {
      select, textarea, input[type="text"], input[type="password"], 
      input[type="datetime"], input[type="datetime-local"], 
      input[type="date"], input[type="month"], input[type="time"], 
      input[type="week"], input[type="number"], input[type="email"], 
      input[type="url"] {
        font-size: 16px !important;
      }
    }
  `;
  document.head.appendChild(style);
}



