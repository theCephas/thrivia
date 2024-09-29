import { UnauthorizedException } from '@nestjs/common';
import otpGenerator from 'otp-generator';
import { Wallets } from './modules/wallets/wallets.entity';

export const replacer = (i: number, arr: any, str: string) => {
  const len = arr.length;
  if (i < len) {
    const [key, value] = arr[i];
    const formattedKey = `{{${key}}}`;
    return replacer(i + 1, arr, str.split(formattedKey).join(value));
  } else {
    return str;
  }
};

export const camelCaseKeysToUnderscore = (obj: object) => {
  if (typeof obj != 'object') return obj;
  for (const oldName in obj) {
    const newName = oldName.replace(/([A-Z])/g, ($1) => `_${$1.toLowerCase()}`);
    if (newName != oldName) {
      if (obj.hasOwnProperty(oldName)) {
        obj[newName] = obj[oldName];
        delete obj[oldName];
      }
    }
    if (typeof obj[newName] == 'object') {
      obj[newName] = camelCaseKeysToUnderscore(obj[newName]);
    }
  }
  return obj;
};

export const generateOtp = (length?: number) =>
  otpGenerator.generate(length ?? 5, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

export const extractTokenFromReq = (req: Request, error: string) => {
  const authorizationHeader = req.headers['authorization'];
  if (!authorizationHeader) throw new UnauthorizedException(error);
  const token = authorizationHeader.split(' ')[1];
  if (!token) throw new UnauthorizedException(error);
  return token;
};

export const generateRandomDigits = () => {
  function getRandomDigit() {
    return Math.floor(Math.random() * 10);
  }
  let digits = '';
  for (let i = 0; i < 8; i++) {
    digits += getRandomDigit();
  }
  return digits;
};

export const deductAmountFromWallets = (wallets: Wallets[], amount: number) => {
  let remainingAmount = amount;
  const walletsCharged: { wallet: Wallets, amount: number }[] = [];

    for (let i = 0; i < wallets.length; i++) {
        // If the wallet has enough balance to cover the remaining amount
        if (wallets[i].availableBalance >= remainingAmount) {
            wallets[i].availableBalance -= remainingAmount;
            console.log(`Deducted ${remainingAmount} from wallet ${wallets[i].title}.`);
          remainingAmount = 0;
          walletsCharged.push({ wallet: wallets[i], amount: remainingAmount })
            break;  // Exit once the full amount has been deducted
        } else {
            // Deduct what the wallet can cover and update the remaining amount
            console.log(`Deducted ${wallets[i].availableBalance} from wallet ${wallets[i].title}.`);
          remainingAmount -= wallets[i].availableBalance;
          walletsCharged.push({ wallet: wallets[i], amount: remainingAmount })
            wallets[i].availableBalance = 0;
        }
    }

    // Check if the full amount was deducted
    if (remainingAmount > 0) {
        console.log(`Insufficient balance. ${remainingAmount} could not be deducted.`);
    } else {
        console.log(`Total amount ${amount} successfully deducted.`);
    }
  return walletsCharged;
}
