<script setup lang="ts">
import { reactive } from 'vue'
import { RouterLink } from 'vue-router'

import { useLoginCredentialsValidation } from '@/modules/Auth/use/useLoginCredentialsValidation'
import { useAdditionalUserDataValidation } from '@/modules/Auth/use/useAdditionalUserDataValidation'
import { useAuthStore } from '@/stores/auth'

// create user  data
const loginCredentials = reactive({ username: '', password: '' })
const additionalUserData = reactive({ firstName: '', lastName: '', email: '' })
///

// validations
const { usernameErrors, passwordErrors, onUsernameInput, onPasswordInput } =
  useLoginCredentialsValidation(loginCredentials)

const {
  firstNameErrors,
  lastNameErrors,
  emailErrors,
  onFirstNameInput,
  onLastNameInput,
  onEmailInput
} = useAdditionalUserDataValidation(additionalUserData)
///

// auth store
const { onCreate } = useAuthStore()
///

// inputs config
const formInputs = reactive([
  {
    id: 'user-name',
    placeholder: 'Unique user name',
    value: loginCredentials.username,
    erros: usernameErrors,
    onInput: onUsernameInput
  },
  {
    id: 'password',
    placeholder: 'Password',
    value: loginCredentials.password,
    erros: passwordErrors,
    onInput: onPasswordInput
  },
  {
    id: 'first-name',
    placeholder: 'First name',
    value: additionalUserData.firstName,
    errors: firstNameErrors,
    onInput: onFirstNameInput
  },
  {
    id: 'last-name',
    placeholder: 'Last name',
    value: additionalUserData.lastName,
    errors: lastNameErrors,
    onInput: onLastNameInput
  },
  {
    id: 'email',
    placeholder: 'Email',
    value: additionalUserData.email,
    errors: emailErrors,
    onInput: onEmailInput
  }
  ///
])

//
</script>

<template lang="pug">
v-card(
  color="primary"
  width="500px"
) 
  v-card-title Create new user
  v-card-text.pb-0
    v-form(
      @submit="onCreate"
    )
      v-text-field.my-3(
        v-for='input in formInputs'
        v-model="input.value"
        :placeholder="input.placeholder"
        :error-messages="input.errors"
        @input="input.onInput"
      )
    div.d-flex.flex-1.justify-center
      v-btn(
        color="secondary"
        variant="elevated"
        @click="onLogin"
      ) Submit
  v-card-actions.py-0
    RouterLink.mx-auto.font-weight-bold(:to="{name: 'a.sing-in'}") Back to login page
</template>
