<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useLoginCredentialsValidation } from '@/modules/Auth/use/useLoginCredentialsValidation.ts'
import { useAuthStore } from '@/stores/auth'

import type { Ref } from 'vue'
import type { LoginCredentials } from '@/modules/Auth/types'

// logging in data
const loginCredentials = reactive({ username: '', password: '' })
///

// validation
const { usernameErrors, passwordErrors, onUsernameInput, onPasswordInput, isFormInvalid } =
  useLoginCredentialsValidation(loginCredentials)

// auth store
const { onLogin } = useAuthStore()
///

// signing in
const isLoading: Ref<boolean> = ref(false)
const signIn = async (loginCredentials: LoginCredentials) => {
  isLoading.value = true
  await onLogin(loginCredentials)
  isLoading.value = false
}
///
</script>

<template lang="pug">
v-card(
  color="primary"
  width="500px"
  max-width="100%"
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
        :loading="isLoading"
        @input="onUsernameInput"
      )
      v-text-field(
        placeholder="Password"
        type="password"
        v-model="loginCredentials.password"
        :error-messages="passwordErrors"
        :loading="isLoading"
        @input="onPasswordInput"
      )
    div.d-flex.flex-1.justify-center
      v-btn(
        color="secondary"
        :loading="isLoading"
        :disabled="isFormInvalid"
        @click="signIn(loginCredentials)"
      ) Log in
  v-card-actions.py-0
    span.mx-auto If you don't have an account yet, please click
      RouterLink.mx-1.font-weight-bold(:to="{name: 'a.create-account'}") here
      | to create one.

</template>
