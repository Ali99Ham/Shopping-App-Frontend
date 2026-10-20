/* eslint-disable @typescript-eslint/no-explicit-any */

export function getErrorMsg(res: any) {
  if (res?.message) {
    if (Array.isArray(res.message)) return formatErrorMsg(res.message[0]);
    else return formatErrorMsg(res.message);
  }
  return "Something went wrong";
}

const formatErrorMsg = (msg: string) =>
  msg.charAt(0).toUpperCase() + msg.slice(1);
