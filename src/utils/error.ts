export async function extractErrorAction(error: unknown) {
  if (error instanceof Error) {
    return {
      errors: {
        _form: [error.message],
      },
    }
  } else {
    return {
      errors: {
        _form: ['Something went wrong'],
      },
    }
  }
}
