const errors = require('~/shared/errors')
export const errorHandler = {
  methods: {
    errorMessage(errorCode) {
      switch (errorCode) {
        case errors.INVALID_CREDENTIALS: {
          return 'Usuário e/ou senha errados'
        }
        default: {
          return 'Ocorreu um erro'
        }
      }
    }
  }
}
