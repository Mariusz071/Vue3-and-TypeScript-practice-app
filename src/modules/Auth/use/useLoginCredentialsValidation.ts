import { computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength } from '@vuelidate/validators'
import { usernameValidator } from '@/plugins/vuelidateValidators'

import type { LoginCredentials } from '@/modules/Auth/types'

export const useLoginCredentialsValidation = (loginCredentials: LoginCredentials) => {
  const rules = computed(() => ({
    username: {
      required,
      usernameValidator,
      maxLength: maxLength(150)
    },
    password: { required, maxLength: maxLength(128) }
  }))

  const $v = useVuelidate(rules, loginCredentials)
  const usernameErrors = computed(() => {
    return $v.value.username.$errors.map((item) => item.$message)
  })
  const passwordErrors = computed(() => {
    return $v.value.password.$errors.map((item) => item.$message)
  })

  const isFormInvalid = computed(
    () =>
      !!usernameErrors.value.length ||
      !!passwordErrors.value.length ||
      !loginCredentials.username ||
      !loginCredentials.password
  )

  return {
    isFormInvalid,
    usernameErrors,
    passwordErrors,
    onUsernameInput: $v.value.username.$touch,
    onPasswordInput: $v.value.password.$touch
  }
}
