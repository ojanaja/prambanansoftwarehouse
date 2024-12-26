import emailjs from "emailjs-com";

export const sendEmail = async (templateParams) => {
  try {
    const result = await emailjs.send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, templateParams, process.env.NEXT_PUBLIC_EMAILJS_USER_ID);
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email.");
  }
};
