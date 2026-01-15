import React from 'react';

export const BANK_LOGOS: Record<string, string> = {
  BNI: 'https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/2560px-BNI_logo.svg.png',
  BRI: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/BRI_Logo.svg/1200px-BRI_Logo.svg.png',
  BCA: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/1200px-Bank_Central_Asia.svg.png',
  MANDIRI: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/1200px-Bank_Mandiri_logo_2016.svg.png',
  DANAMON: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Bank_Danamon_logo.svg/1280px-Bank_Danamon_logo.svg.png'
};

export const BANK_FULL_NAMES: Record<string, string> = {
  BNI: 'BANK NEGARA INDONESIA (BNI)',
  BRI: 'BANK RAKYAT INDONESIA (BRI)',
  BCA: 'BANK CENTRAL ASIA (BCA)',
  MANDIRI: 'BANK MANDIRI (MANDIRI)',
  DANAMON: 'BANK DANAMON INDONESIA (DANAMON)'
};

export const INITIAL_DATA = {
  bankName: 'BNI',
  accountName: 'IMAN HADI KESUMA',
  accountNumber: '1988015880',
  amount: '100000',
  companyName: 'PT. Graha Citra Prima',
  websiteUrl: 'https://gconline.online'
};