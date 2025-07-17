# **Limitations**

### **1. Browser API Restrictions**

```jsx
// ❌ These won't work in sandboxed iframe
window.localStorage.setItem('key', 'value');
window.sessionStorage.getItem('key');
document.cookie = 'name=value';
window.open('https://example.com');
```

### **2. Network Access Limitations**

```jsx
// ❌ Direct fetch requests may be blocked
fetch('https://api.example.com/data')
  .then(response => response.json());

// ❌ WebSocket connections may be restricted
const ws = new WebSocket('wss://example.com');
```

### **3. Storage Access Restrictions**

```jsx
// ❌ Direct storage access
localStorage.setItem('wallet_data', JSON.stringify(data));
sessionStorage.getItem('user_preferences');
```

### **4. DOM Manipulation Restrictions**

```jsx
// ❌ Direct DOM access
document.getElementById('wallet-button').click();
document.body.appendChild(newElement);
```

### **5. File System Access**

```jsx
// ❌ File system access
const input = document.createElement('input');
input.type = 'file';
input.click();
```

---

## **Sandboxing Workarounds**

The implementation uses a MessageHandler class that provides the foundation for all iframe communication:

```tsx
class MessageHandler {
  constructor() {
	this.messageId = 0;
  }

  generateId() {
	return \`\${++this.messageId}_\${Date.now()}\`;
  }

  async sendRequest(type, data = {}) {
	return new Promise((resolve, reject) => {
	  const id = this.generateId();

	  const handler = (event) => {
		if (event.data.id === id) {
		  window.removeEventListener("message", handler);
		  event.data.success === false
			? reject(new Error(event.data.error))
			: resolve(event.data.result);
		}
	  };

	  window.addEventListener("message", handler);
	  window.parent.postMessage({ type, id, ...data }, "*");
	});
  }

  sendMessage(message) {
	window.parent.postMessage(message, "*");
  }
}
```

### **1. Message-Based Storage**

Problem: Sandboxed iframes can't directly access localStorage

Solution: Two-tier storage approach with local cache and parent sync

```tsx
// ✅ Use message passing for storage operations
class LocalStorageService extends MessageHandler {
  constructor() {
	super();
	this.localStorage = ${JSON.stringify(this.getAllLocalStorage())};
  }

  getItem(key) {
	return this.localStorage[key];
  }

  setItem(key, value) {
	this.localStorage[key] = value;
	this.sendMessage({
	  type: MESSAGE_TYPES.LOCAL_STORAGE,
	  method: "setItem",
	  params: { key, value },
	});
	return true;
  }

  removeItem(key) {
	delete this.localStorage[key];
	this.sendMessage({
	  type: MESSAGE_TYPES.LOCAL_STORAGE,
	  method: "removeItem",
	  params: { key },
	});
	return true;
  }

  length() {
	return Object.keys(this.localStorage).length;
  }

  key(index) {
	return Object.keys(this.localStorage)[index];
  }
}
```

### **2. Proxy Network Requests**

```tsx
// ✅ Proxy network requests through parent
class IframeNetworkAdapter {
  async fetch(url: string, options?: RequestInit) {
	return await this.sendRequest('network:fetch', { url, options });
  }

  async createWebSocket(url: string) {
	return await this.sendRequest('network:websocket', { url });
  }
}
```

### **3. Emitter System Workarounds**

**Problem**: Iframe can't directly listen to parent events

**Solution**: Message-based event system

```tsx
class EmitterService extends MessageHandler {
  async emit(eventName, data) {
	return this.sendRequest(MESSAGE_TYPES.EMITTER, {
	  method: "emit",
	  params: { eventName, data },
	});
  }
  
  async on(eventName, callback) {
	return this.sendRequest(MESSAGE_TYPES.EMITTER, {
	  method: "on",
	  params: { eventName, callback },
	});
  }
  
  async off(eventName, callback) {
	return this.sendRequest(MESSAGE_TYPES.EMITTER, {
	  method: "off",
	  params: { eventName, callback },
	});
  }
}
```