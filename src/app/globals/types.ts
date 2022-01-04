export interface User {
  first_name?: String;
  last_name?: String;
  last_login?: String;
  avatar?: string;
  business_name?: String;
  created: String;
  email: String;
  id: number;
  uuid?: String;
  name: String;
  phone_number?: String;
  role?: String;
  wallet_address?: String;
  wallet_provider?: String;
  website?: String;
  authorized_persons?: AuthorizedPerson[];
  secondary_wallet_provider?: string;
  secondary_wallet_address?: string;
  address?: string;
  city?: string;
  zip?: string;
  state?: string;
  crypto_payments?: CryptoPayments[];
  current_balance?: number;
  client?: any;
}
export interface AuthorizedPerson {
  name: string;
  email: string;
}

export interface CryptoPayments {
  addr: string;
  amount: number;
  amountUSD: number;
  boxID: number;
  boxType: string;
  coinLabel: string;
  orderID: string;
  processed: boolean;
  txConfirmed: boolean;
  txID: string;
  userID: string;
  recordCreated: string;
}

export interface Transactions {
  created: string;
  fee: number;
  id: number;
  invoice_id: number;
  isRefund: false;
  modified: string;
  net: number;
  payment_confirmed: string;
  refund_address: string;
  status: number;
  total: number;
  transaction_id: number;
  user: User;
  user_id: number;
  uuid: string;
  withdraw_confirmed: string;
  withdraw_requested: string;

  crypto_payments?: CryptoPayments[];
}

export interface Invoice {
  id: String;
  guid: String; 
  fiat_currency: String;
  fiat_currency_price: String;
  btc_address: String; 
  status: String;
  expires_at: String;
  qr_image: String;
  btc_price: String;
}

export interface InvoiceItem {
  amount: number;
  created: String;
  id: number;
  invoice_id: number;
  name: String;
  price: number;
}

export interface Events {
  created: string;
  created_by: string;
  event_type: string;
  id: number;
  modified: string;
  note: string;
  outcome: string;
  purpose: string;
  time: string;
  user_id: number;
}
export interface PaginateInfo {
  finder?: string;
  page: number;
  current?: number;
  count: number;
  perPage: number;
  prevPage?: boolean;
  nextPage?: boolean;
  pageCount: number;
  sort?: string;
  direction?: "DESC" | "ASC";
  limit: number;
}

export interface UserData {
  data: User[];
  paginate?: PaginateInfo;
  pagination?: PaginateInfo;
}

export interface BankInfo {
  id: number;
  user_id: string;
  swift_code: string;
  account_number: string;
  routing_number: string;
  isDefault: boolean;
  min_settlement_amount_usd: string;
  min_settlement_amount_btc: string;
  created: string;
}

export interface PayoutSchedule {
  id?: number;
  isManual: boolean;
  interval_period: string;
  weekly_anchor: string;
  monthly_anchor: string;
}

export interface Tickets {
  id?: number;
  description: String;
  title: String;
  created: String;
  status: String;
}

export interface Payouts {
  address: String;
  amount_payble: String;
  confirmations: String;
  created: String;
  description: String;
  id: String;
  miner_fee: Number;
  payment_id: Number;
  status: String;
  subtitle: String;
  total_amount_btc: Number;
  total_amount_usd: Number;
  transaction_id: String;
  user: User;
  client: User;
  payout_items?: Transactions[];
}

export interface Faq {
  id: Number;
  topic: String;
  question: String;
  answer: String;
  status: 1;
}
