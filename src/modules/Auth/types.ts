export interface LoginCredentials {
  username: string
  password: string
}

export interface AdditionalUserData {
  firstName?: string
  lastName?: string
  email?: string
}

export type NewUserData = LoginCredentials & AdditionalUserData
