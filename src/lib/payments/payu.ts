import crypto from "crypto";

export interface PayUPaymentRequestParams {
  txnid: string;
  amount: number | string;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
}

export interface PayUPayloadResponse {
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
  hash: string;
  actionUrl: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
}

const getPayUConfig = () => {
  const key = process.env.PAYU_MERCHANT_KEY || "c28kq8";
  const salt =
    process.env.PAYU_MERCHANT_SALT || "20kf0nrb8WGKtAFFPr3JbkSA6KXPHva";
  const baseUrl =
    process.env.PAYU_BASE_URL || "https://secure.payu.in/_payment";

  return { key, salt, baseUrl };
};

/**
 * Generate SHA-512 Hash for PayU Payment Request
 * Sequence: key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT
 */
export function generatePayURequestHash(
  params: PayUPaymentRequestParams
): string {
  const { key, salt } = getPayUConfig();
  const formattedAmount = Number(params.amount).toFixed(2);

  const hashSequence = [
    key,
    params.txnid,
    formattedAmount,
    params.productinfo,
    params.firstname,
    params.email,
    params.udf1 || "",
    params.udf2 || "",
    params.udf3 || "",
    params.udf4 || "",
    params.udf5 || "",
    "",
    "",
    "",
    "",
    "",
    salt,
  ].join("|");

  return crypto.createHash("sha512").update(hashSequence).digest("hex");
}

/**
 * Generate full PayU checkout payload object
 */
export function createPayUPaymentPayload(
  params: PayUPaymentRequestParams
): PayUPayloadResponse {
  const { key, baseUrl } = getPayUConfig();
  const formattedAmount = Number(params.amount).toFixed(2);
  const hash = generatePayURequestHash({ ...params, amount: formattedAmount });

  return {
    key,
    txnid: params.txnid,
    amount: formattedAmount,
    productinfo: params.productinfo,
    firstname: params.firstname,
    email: params.email,
    phone: params.phone,
    surl: params.surl,
    furl: params.furl,
    hash,
    actionUrl: baseUrl,
    udf1: params.udf1 || "",
    udf2: params.udf2 || "",
    udf3: params.udf3 || "",
    udf4: params.udf4 || "",
    udf5: params.udf5 || "",
  };
}

/**
 * Verify SHA-512 Hash from PayU Response / Callback
 * Sequence: (additionalCharges ? additionalCharges + '|' : '') + salt + '|' + status + '||||||' + udf5 + '|' + udf4 + '|' + udf3 + '|' + udf2 + '|' + udf1 + '|' + email + '|' + firstname + '|' + productinfo + '|' + amount + '|' + txnid + '|' + key
 */
export function verifyPayUResponseHash(
  responseBody: Record<string, string>
): boolean {
  const { key, salt } = getPayUConfig();

  const {
    status,
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    hash: receivedHash,
    additionalCharges,
    udf1 = "",
    udf2 = "",
    udf3 = "",
    udf4 = "",
    udf5 = "",
  } = responseBody;

  if (!receivedHash || !txnid || !status) {
    return false;
  }

  const formattedAmount = Number(amount).toFixed(2);

  const hashSequence = [
    additionalCharges ? `${additionalCharges}|` : "",
    salt,
    status,
    "",
    "",
    "",
    "",
    "",
    udf5,
    udf4,
    udf3,
    udf2,
    udf1,
    email,
    firstname,
    productinfo,
    formattedAmount,
    txnid,
    key,
  ].join("|");

  const calculatedHash = crypto
    .createHash("sha512")
    .update(hashSequence)
    .digest("hex");

  return calculatedHash.toLowerCase() === receivedHash.toLowerCase();
}
