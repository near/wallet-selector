import { Modal, ModalOptions } from './Modal';
import { generateAccountId, isValidAccountId } from '../utils';

export interface SignInModalOptions extends Omit<ModalOptions, 'title'> {
  networkId: string;
  previousAccounts?: Array<{ accountId: string }>;
  onSubmit: (accountId: string, isFromList?: boolean) => Promise<void>;
}

export class SignInModal extends Modal {
  private accountIdInput: HTMLInputElement;
  private onSubmit: (accountId: string, isFromList?: boolean) => Promise<void>;
  private networkId: string;
  private previousAccounts: Array<{ accountId: string }>;

  constructor(options: SignInModalOptions) {
    super({
      ...options,
      title: 'Sign in with passkey',
    });

    this.onSubmit = options.onSubmit;
    this.networkId = options.networkId;
    this.previousAccounts = options.previousAccounts || [];

    this.render();
  }

  private render() {
    // Hint text
    const hint = document.createElement('p');
    hint.style.fontSize = '12px';
    hint.style.color = '#666';
    hint.style.marginTop = '0';
    hint.style.marginBottom = '4px';
    hint.textContent = 'Account ID';
    this.modal.appendChild(hint);

    // Account ID input
    this.accountIdInput = document.createElement('input');
    this.accountIdInput.className = 'webauthn-input';
    this.accountIdInput.type = 'text';
    this.accountIdInput.placeholder = 'your-account.' + (this.networkId === 'mainnet' ? 'near' : 'testnet');
    this.accountIdInput.value = generateAccountId(this.networkId);
    this.accountIdInput.style.marginBottom = '16px';
    this.accountIdInput.style.padding = '16px';
    this.accountIdInput.style.borderRadius = '8px';
    this.accountIdInput.style.fontSize = '16px';
    
    this.accountIdInput.addEventListener('input', () => {
      this.validateAccountId();
    });
    
    this.accountIdInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && this.isAccountIdValid()) {
        this.handleCreateNewPasskey();
      }
    });

    this.modal.appendChild(this.accountIdInput);

    // Create new passkey button (outlined)
    const createPasskeyButton = this.createButton(
      'Create new passkey',
      () => this.handleCreateNewPasskey(),
      false // outlined style
    );
    createPasskeyButton.style.width = '100%';
    createPasskeyButton.style.marginBottom = '0';
    this.modal.appendChild(createPasskeyButton);

    // Initial validation
    this.validateAccountId();

    // OR divider
    const divider = document.createElement('div');
    divider.style.display = 'flex';
    divider.style.alignItems = 'center';
    divider.style.margin = '20px 0';
    divider.style.gap = '12px';
    
    const line1 = document.createElement('div');
    line1.style.flex = '1';
    line1.style.height = '1px';
    line1.style.background = '#333';
    
    const orText = document.createElement('span');
    orText.textContent = 'OR';
    orText.style.color = '#999';
    orText.style.fontSize = '14px';
    orText.style.fontWeight = '500';
    
    const line2 = document.createElement('div');
    line2.style.flex = '1';
    line2.style.height = '1px';
    line2.style.background = '#333';
    
    divider.appendChild(line1);
    divider.appendChild(orText);
    divider.appendChild(line2);
    this.modal.appendChild(divider);

    // Use existing passkey button (primary/filled)
    const useExistingButton = this.createButton(
      'Use existing passkey',
      () => this.handleUseExistingPasskey(),
      true // primary style
    );
    useExistingButton.style.width = '100%';
    useExistingButton.style.marginBottom = '20px';
    this.modal.appendChild(useExistingButton);

    // Security warning
    const warning = document.createElement('p');
    warning.style.fontSize = '12px';
    warning.style.lineHeight = '1.5';
    warning.style.margin = '0';
    warning.style.color = '#333';
    
    const boldText = document.createElement('strong');
    boldText.textContent = 'Store your passkeys securely.';
    warning.appendChild(boldText);
    
    const normalText = document.createTextNode(' Losing your passkey means losing access to your account and any associated funds permanently.');
    warning.appendChild(normalText);
    
    this.modal.appendChild(warning);
  }

  private async handleUseExistingPasskey() {
    try {
      this.showLoading('Authenticating with existing passkey...');
      
      // If we have previous accounts, use the first one (or implement account selection)
      // For now, we'll trigger the authentication flow without specifying an account
      // The implementation should handle finding existing credentials
      if (this.previousAccounts.length > 0) {
        await this.onSubmit(this.previousAccounts[0].accountId, true);
      } else {
        // If no previous accounts, we need to handle this case
        // Could show an error or fall back to create new passkey
        throw new Error('No existing passkeys found. Please create a new passkey.');
      }
    } catch (error) {
      this.modal.innerHTML = '';
      const header = document.createElement('h2');
      header.className = 'webauthn-modal__header';
      header.textContent = 'Sign in with passkey';
      this.modal.appendChild(header);
      
      this.render();
      
      const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
      this.showError(errorMessage);
    }
  }

  private validateAccountId() {
    const value = this.accountIdInput.value.trim();
    const isValid = isValidAccountId(value);

    if (isValid) {
      this.accountIdInput.style.borderColor = '#4ade80';
    } else {
      this.accountIdInput.style.borderColor = '#ef4444';
    }
  }

  private isAccountIdValid(): boolean {
    const value = this.accountIdInput.value.trim();
    return isValidAccountId(value);
  }

  private async handleCreateNewPasskey() {
    const accountId = this.accountIdInput.value.trim();
    
    if (!isValidAccountId(accountId)) {
      this.showError('Invalid account ID format');
      return;
    }

    try {
      this.showLoading('Creating new passkey...');
      await this.onSubmit(accountId, false);
      // Modal will be closed by the parent
    } catch (error) {
      this.modal.innerHTML = '';
      const header = document.createElement('h2');
      header.className = 'webauthn-modal__header';
      header.textContent = 'Sign in with passkey';
      this.modal.appendChild(header);
      
      this.render();
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to create passkey';
      this.showError(errorMessage);
    }
  }
}



