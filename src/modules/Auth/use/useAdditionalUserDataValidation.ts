import { ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { maxLength, email } from '@vuelidate/validators'

import type { AdditionalUserData } from '@/modules/Auth/types'

export const useAdditionalUserDataValidation = ({
  firstName,
  lastName,
  email
}: AdditionalUserData) => {
  const rules = computed(() => ({
    firstName: {
      maxLength: maxLength(150)
    },
    lastName: { maxLength: maxLength(150) },
    email: { email, maxLength: maxLength(254) }
  }))

  const v$ = useVuelidate(rules, { firstName, lastName, email })

  const firstNameErrors = computed(() => {
    return v$.value.firstName.$errors.map((item) => item.$message)
  })
  const lastNameErrors = computed(() => {
    return v$.value.lastName.$errors.map((item) => item.$message)
  })
  const emailErrors = computed(() => {
    return v$.value.email.$errors.map((item) => item.$message)
  })

  return {
    firstNameErrors,
    lastNameErrors,
    emailErrors,
    onFirstNameInput: v$.value.firstName.$touch,
    onLastNameInput: v$.value.lastName.$touch,
    onEmailInput: v$.value.email.$touch
  }
}
