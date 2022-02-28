<script setup lang="ts">
import { AccountInfo } from "near-wallet-selector/lib/esm/wallets/Wallet";

defineProps<{
  account: AccountInfo;
  onSubmit: (event: SubmitEvent) => void;
}>()

</script>

<template>
  <form @submit.prevent="onSubmit">
    <fieldset id="fieldset">
      <p>Sign the guest book, {{ account.accountId }}!</p>
      <p class="highlight">
        <label>Message:</label>
        <input id="message" autoFocus required autoComplete="off" />
      </p>
      <p>
        <label>Donation (optional):</label>
        <input
          id="donation"
          type="number"
          autoComplete="off"
          defaultValue="0"
          max="1000"
          min="0"
          step="0.01"
        />
        <span title="NEAR Tokens">Ⓝ</span>
      </p>
      <button type="submit">Sign</button>
    </fieldset>
  </form>
</template>
