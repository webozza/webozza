import { AbstractControl } from "@angular/forms";

export function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

// config for Confirm Registration

// status = 2  1st state
// status = 3  2nd state
// status = 4  3rd state

export function validatedEmail(e) {
  const filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
  return String(e).search(filter) !== -1;
}

// validate Wallet Address

export async function validateWallet(s) {
  const address = await checkAddress(s);
  return await check(address);
}
export function checkAddress(s) {
  const x = String(s) || "";
  return x.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
}
export function check(s) {
  if (s.length < 26 || s.length > 35) {
    return false;
  }
  const result = /^[A-Z0-9]+$/i;
  if (!result.test(s)) {
    return false;
  }
  return true;
}

export function ValidateUrl(control: AbstractControl) {
  const rex = new RegExp(
    "^(?:https?://|s?ftps?://)?(?!www | www.)[A-Za-z0-9_-]+.+[A-Za-z0-9./%&=?_:;-]+$"
  );
  if (!rex.test(control.value)) {
    return { validUrl: true };
  }
  return null;
}
export function ValidateEIN(control: AbstractControl) {
  const re = /^\d{2}\-?\d{7}$/;
  if (!re.test(control.value)) {
    return { InvalidEIN: true };
  }
  return null;
}

export function CheckUserStatus(state) {
  if (state === 1) {
    return "Active";
  }

  return "Inactive";
}

export function ValidateWalletAddress(control: AbstractControl) {
  const address = checkAddress(control.value);
  if (address.length < 26 || address.length > 35) {
    return { inValidWallet: true };
  } else {
    const result = /^[A-Z0-9]+$/i;
    if (!result.test(address)) {
      return { inValidWallet: true };
    }
    return null;
  }
}

export function ValidateRoutingNumber(control: AbstractControl) {
  if (control.value.length !== 9) {
    return { Invalid: true };
  }

  return null;
}
export function ValidateSwiftCode(control: AbstractControl) {
  const re = new RegExp("^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$");

  if (!re.test(control.value)) {
    return { Invalid: true };
  }

  return null;
}

export function CheckValidEmail(control: AbstractControl) {
  const re = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
  if (!re.test(control.value)) {
    return { Invalid: true };
  }

  return null;
}

export const protocols = [
  { text: "http", id: 1, value: "http://", slected: 1 },
  { text: "https", id: 2, value: "https://", slected: 1 }
];
export const days = [
  { id: 1, text: "sunday", value: "Sunday", selected: true },
  { id: 2, text: "monday", value: "Monday", selected: false },
  { id: 3, text: "twesday", value: "Twesday", selected: false },
  { id: 4, text: "wednesday", value: "Wednesday", selected: false },
  { id: 5, text: "thursday", value: "Thursday", selected: false },
  { id: 6, text: "friday", value: "Friday", selected: false },
  { id: 7, text: "saturday", value: "Saturday", selected: false }
];

export function monthlyAnchor() {
  const times = [];
  for (let i = 1; i <= 31; i++) {
    const obj = {
      id: i,
      text: i,
      value: `${i}th`,
      selected: i === 1 ? true : false
    };
    times.push(obj);
  }
  return times;
}

export const paymentStatus = [
  { text: "Requested", id: 0, color: "#3498db" },
  { text: "READY_FOR_WITHDRAWAL", id: 1, color: "#e67e22" },
  { text: "PROCESSING ", id: 2, color: "#2ecc71" },
  { text: "BLOCKED ", id: 3, color: "#2c3e50" },
  { text: "UNDERPAID ", id: 4, color: "#c0392b" },
  { text: "OVERPAID ", id: 5, color: "#f39c12" },
  { text: "REFUNDED ", id: 6, color: "#e74c3c" },
  { text: "WITHDRAWN  ", id: 7, color: "#2980b9" }
];

export const userTypes = [
  { text: "Select", id: 0, color: "#e67e22" },
  { text: "Merchant", id: 1, color: "#e67e22" },
  { text: "Admin ", id: 2, color: "#2ecc71" },
  { text: "Sales Rep ", id: 3, color: "#2c3e50" }
];
export const events = [
  { text: "Call", id: 1, color: "#3498db" },
  { text: "Meeting ", id: 2, color: "#2ecc71" },
  { text: "Decision ", id: 3, color: "#2c3e50" },
  { text: "Interaction ", id: 4, color: "#2980b9" }
];
export const status = [
  { text: "select", id: 0, color: "#2ecc71" },
  { text: "Active", id: 1, color: "#2ecc71" },
  { text: "Inactive ", id: 2, color: "#2980b9" },
  { text: "Pending ", id: 3, color: "#2980b9" }
];

export const PAYOUT_STATUS = [
  { text: "Completed", value: "completed", color: "#2ecc71" },
  { text: "Pending ", value: "pending", color: "#2980b9" }
];

export const ticketStatus = [
  { text: "Open ", id: 2, color: "#2980b9" },
  { text: "Closed", id: 1, color: "#2ecc71" },
  { text: "Hold ", id: 3, color: "#e67e22" }
];

export const transaction_frequencies = [
  // { text: "-select- ", value: "", selected: true },
  { text: "None", value: "none", selected: false },
  { text: "Daily ", value: "daily", selected: false },
  { text: "Weekly ", value: "weekly", selected: false }
];
export function FORMAT_DATE(date) {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = (d.getMonth() + 1).toLocaleString();
  const day = d.getDate().toLocaleString();

  return (
    y +
    "-" +
    (m.length > 1 ? m : "0" + m) +
    "-" +
    (day.length > 1 ? day : "0" + day)
  );
}
