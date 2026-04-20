const verifyOTP = (req, res, next) => {
  const { otp } = req.body;

  if (otp !== "123456") {
    return res.status(403).send("Invalid OTP");
  }

  next();
};

module.exports = verifyOTP;
