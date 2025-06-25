class OtpModel {
  constructor() {
    this.otpLength = 6;
  }

  validateOtp(otpArray) {
    return (
      otpArray.length === this.otpLength &&
      otpArray.every(digit => digit !== '')
    );
  }

  // Future API call method
  /*
  async verifyOtp(otp) {
    try {
      const response = await api.post('/verify-otp', { otp });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  */
}

export default OtpModel;
