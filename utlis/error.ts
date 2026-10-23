/* eslint-disable @typescript-eslint/no-explicit-any */
export function getErrorMsg(error: any) {
  if (error?.response && error?.response?.data) {
    console.log("ee", error);
    if (Array.isArray(error.response?.data?.message))
      return formatErrorMsg(error?.response?.data?.message[0]);
    else return formatErrorMsg(error?.response?.message);
  }
  return "Something went wrong";
}

const formatErrorMsg = (msg: string) =>
  msg.charAt(0).toUpperCase() + msg.slice(1);

/// axios : error.message: رسالة Axios العامة، وليست رسالة الخطأ التي أرجعها الـ backend.
/// to get the error message from the server: error.response.data.message
