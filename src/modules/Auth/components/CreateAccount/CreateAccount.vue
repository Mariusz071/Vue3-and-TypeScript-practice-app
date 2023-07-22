<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { useLoginCredentialsValidation } from '@/modules/Auth/use/useLoginCredentialsValidation'
import { useAdditionalUserDataValidation } from '@/modules/Auth/use/useAdditionalUserDataValidation'
import { useAuthStore } from '@/stores/auth'

import type { Ref } from 'vue'
import type { NewUserData } from '@/modules/Auth/types'

// create user data
const loginCredentials = reactive({ username: '', password: '' })
const additionalUserData = reactive({ firstName: '', lastName: '', email: '' })
const userData = computed(() => ({ ...loginCredentials, ...additionalUserData }))

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

// creating user
const isLoading: Ref<boolean> = ref(false)
const onCreateUser = async (userData: NewUserData) => {
  isLoading.value = true
  await onCreate(userData)
  isLoading.value = false
}
</script>

<template lang="pug">
v-card(
  color="primary"
  width="500px"
  max-width="100%"
) 
  v-card-title Create new user
  v-card-text.pb-0
    v-form(
      @submit="onCreate"
    )
      v-text-field.my-3(
        v-model="loginCredentials.username"
        placeholder="Unique user name"
        :error-messages="usernameErrors"
        :loading="isLoading"
        @input="onUsernameInput"
      )

      v-text-field.my-3(
        v-model="loginCredentials.password"
        placeholder="Password"
        :error-messages="passwordErrors"
        :loading="isLoading"
        @input="onPasswordInput"
      )

      v-text-field.my-3(
        v-model="additionalUserData.email"
        placeholder="Email"
        :error-messages="emailErrors"
        :loading="isLoading"
        @input="onEmailInput"
      )

      v-text-field.my-3(
        v-model="additionalUserData.firstName"
        placeholder="First name"
        :error-messages="firstNameErrors"
        :loading="isLoading"
        @input="onFirstNameInput"
      )

      v-text-field.my-3(
        v-model="additionalUserData.lastName"
        placeholder="Last name"
        :error-messages="lastNameErrors"
        :loading="isLoading"
        @input="onLastNameInput"
      )
    div.d-flex.flex-1.justify-center
      v-btn(
        color="secondary"
        variant="elevated"
        :loading="isLoading"
        @click="onCreateUser(userData)"
      ) Submit
  v-card-actions.py-0
    RouterLink.mx-auto.font-weight-bold(:to="{name: 'a.sign-in'}") Back to login page
</template>
