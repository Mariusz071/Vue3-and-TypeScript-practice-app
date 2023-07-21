<script setup lang="ts">
import { reactive } from 'vue'
import { RouterLink } from 'vue-router'
import { useLoginCredentialsValidation } from '@/modules/Auth/use/useLoginCredentialsValidation.ts'
import { useAuthStore } from '@/stores/auth'

// logging in data
const loginCredentials = reactive({ username: '', password: '' })
///

// validation
const { usernameErrors, passwordErrors, onUsernameInput, onPasswordInput } =
  useLoginCredentialsValidation(loginCredentials)

// auth store
const { onLogin } = useAuthStore()
</script>

<template lang="pug">
v-card(
  color="primary"
  width="500px"
) 
  v-card-title Please sign in
  v-card-text.pb-0
    v-form(
      @submit="onSubmit"
    )
      v-text-field.my-3(
        placeholder="User name"
        v-model="loginCredentials.username"
        :error-messages="usernameErrors"
        @input="onUsernameInput"
      )
      v-text-field(
        placeholder="Password"
        v-model="loginCredentials.password"
        :error-messages="passwordErrors"
        @input="onPasswordInput"
      )
    div.d-flex.flex-1.justify-center
      v-btn(
        color="secondary"
        @click="onLogin(loginCredentials)"
      ) Log in
  v-card-actions.py-0
    span.mx-auto If you don't have an account yet, please click
      RouterLink.mx-1.font-weight-bold(:to="{name: 'a.create-account'}") here
      | to create one.

</template>
