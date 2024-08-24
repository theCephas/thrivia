import { UnauthorizedException } from '@nestjs/common';
import otpGenerator from 'otp-generator';

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
