import { helpers } from '@vuelidate/validators'

const invalidUsernameError =
  "The input should only contain letters (both uppercase and lowercase), digits (0-9), and the characters '@', '.', '+', '-', '_', and '/'."
export const usernameValidator = helpers.withMessage(
  invalidUsernameError,
  helpers.regex(/^[A-Za-z0-9@.+\\-_/]+$/)
)
