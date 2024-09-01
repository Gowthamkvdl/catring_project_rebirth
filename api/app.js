import express from "express";
import axios from "axios";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import otpRoute from "./routes/otp.route.js";
import postRoute from "./routes/post.route.js"
import userRoute from "./routes/user.route.js"
import partnerRoute from "./routes/partner.route.js"
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
const PORT = 3000;
const app = express();


app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [process.env.CLIENT_URL, process.env.PARTNER_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize())
// Data sanitization against site script xss
app.use(xss())


app.use("/api/auth", authRoute);
app.use("/api/otp", otpRoute);
app.use("/api/post", postRoute)
app.use("/api/user", userRoute)
app.use("/api/partner", partnerRoute)

// const apiKey =
//   "RIVC2otMhJzpw3v6A8mfWPUQrS9e0s41N5G7FOlycaZbjqkXxnOCpcjoL1ZNQvG2R3w4aVfzPxgHbu8M";
// const msg = "Hello from API";
// const phoneNumber = "7010399378";

// const smsData = {
//   message: msg,
//   language: "english", 
//   route: "otp",
//   variables_values: "4645",
//   numbers: phoneNumber,
// };

// // Axios post request
// axios
//   .post("https://www.fast2sms.com/dev/bulkV2", smsData, {
//     headers: {
//       Authorization: apiKey,
//     },
//   })
//   .then((res) => {
//     console.log("SMS sent Successfully: ", res.data);
//   })
//   .catch((err) => {
//     console.error("Error sending SMS: ", err);
//   });

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
