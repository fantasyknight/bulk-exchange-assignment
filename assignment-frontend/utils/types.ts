export enum InputType {
  BUTTON = "button",
  CHECKBOX = "checkbox",
  COLOR = "color",
  DATE = "date",
  DATETIME_LOCAL = "datetime-local",
  EMAIL = "email",
  FILE = "file",
  HIDDEN = "hidden",
  IMAGE = "image",
  MONTH = "month",
  NUMBER = "number",
  PASSWORD = "password",
  RADIO = "radio",
  RANGE = "range",
  RESET = "reset",
  SEARCH = "search",
  SUBMIT = "submit",
  TEL = "tel",
  TEXT = "text",
  TIME = "time",
  URL = "url",
  WEEK = "week",
}

export type onChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {} | any;

export interface Profile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}
