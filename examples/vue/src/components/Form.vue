<script setup lang="ts">
import { AccountInfo } from "near-wallet-selector/lib/esm/wallets/Wallet";

defineProps<{
  account: AccountInfo;
}>()

</script>

<template>
  <form>
    <fieldset id="fieldset">
      <p>Sign the guest book, {{ account.accountId }}!</p>
      <p className="highlight">
        <label>Message:</label>
        <input id="message" autoFocus required autoComplete="off" />
      </p>
      <p>
        <label>Donation (optional):</label>
        <input
          autoComplete="off"
          defaultValue="0"
          id="donation"
          max="1000"
          min="0"
          step="0.01"
          type="number"
        />
        <span title="NEAR Tokens">Ⓝ</span>
      </p>
      <button type="submit" @click="$emit('submit')">Sign</button>
    </fieldset>
  </form>
</template>
