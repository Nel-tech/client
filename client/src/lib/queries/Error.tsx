export const getRegistrationErrorMessage = (error: any): string => {
  // Check if it's an Axios error with response data
  if (error?.response?.data) {
    // Your backend uses 'error' field, not 'message'
    const { message, error: errorField, field } = error.response.data;

    // Check both 'message' and 'error' fields since backends vary
    const backendMessage = message || errorField;

    // Handle specific backend error messages
    if (backendMessage) {
      // Common backend error messages to user-friendly messages
      const errorMap: Record<string, string> = {
        'This email is already registered.':
          'This email is already registered. Please use a different email or try logging in.',
        'Email already exists':
          'This email is already registered. Please use a different email or try logging in.',
        'Username already exists':
          'This username is already taken. Please choose a different username.',
        'Username already taken':
          'This username is already taken. Please choose a different username.',
        'This username is already taken.':
          'This username is already taken. Please choose a different username.',
        'Email already registered':
          'This email is already registered. Please use a different email or try logging in.',
        'User already exists':
          'An account with this email already exists. Please try logging in instead.',
        'Invalid email format': 'Please enter a valid email address.',
        'Password too weak':
          'Password must be at least 8 characters long and contain letters and numbers.',
        'Username too short': 'Username must be at least 3 characters long.',
        'Username contains invalid characters':
          'Username can only contain letters, numbers, and underscores.',
      };

      // Return mapped message or original message
      return errorMap[backendMessage] || backendMessage;
    }

    // Handle validation errors by field
    if (field) {
      switch (field) {
        case 'email':
          return 'There was an issue with the email address. Please check and try again.';
        case 'username':
          return 'There was an issue with the username. Please choose a different one.';
        case 'password':
          return 'There was an issue with the password. Please ensure it meets the requirements.';
        default:
          return `There was an issue with the ${field}. Please check and try again.`;
      }
    }
  }

  // Handle network errors
  if (error?.code === 'NETWORK_ERROR' || error?.message === 'Network Error') {
    return 'Unable to connect to the server. Please check your internet connection and try again.';
  }

  // Handle timeout errors
  if (error?.code === 'ECONNABORTED') {
    return 'The request timed out. Please try again.';
  }

  // Handle 400 errors (Bad Request) - but only if we couldn't get a specific message
  if (error?.response?.status === 400) {
    return 'Please check your information and try again.';
  }

  // Handle 409 errors (Conflict - usually duplicate data)
  if (error?.response?.status === 409) {
    return 'An account with this information already exists. Please use different details or try logging in.';
  }

  // Handle 422 errors (Validation errors)
  if (error?.response?.status === 422) {
    return 'Please check that all fields are filled out correctly.';
  }

  // Handle 500 errors (Server errors)
  if (error?.response?.status >= 500) {
    return 'Server error. Please try again later.';
  }

  // Default fallback
  return error?.message || 'Registration failed. Please try again.';
};

// Helper function for login errors
export const getLoginErrorMessage = (error: any): string => {
  if (error?.response?.data) {
    // Check both 'message' and 'error' fields
    const { message, error: errorField } = error.response.data;
    const backendMessage = message || errorField;

    if (backendMessage) {
      const errorMap: Record<string, string> = {
        'Invalid credentials':
          'Invalid email or password. Please check your details and try again.',
        'User not found':
          'No account found with this email. Please check your email or sign up.',
        'Incorrect password': 'Incorrect password. Please try again.',
        'Account locked':
          'Your account has been temporarily locked. Please try again later.',
        'Email not verified': 'Please verify your email before logging in.',
        'Invalid email or password':
          'Invalid email or password. Please check your credentials and try again.',
      };

      return errorMap[backendMessage] || backendMessage;
    }
  }

  // Handle 401 errors (Unauthorized)
  if (error?.response?.status === 401) {
    return 'Invalid email or password. Please check your credentials and try again.';
  }

  // Handle 404 errors (User not found)
  if (error?.response?.status === 404) {
    return 'No account found with this email. Please check your email or sign up.';
  }

  return 'Invalid email or password. Please try again.';
};
