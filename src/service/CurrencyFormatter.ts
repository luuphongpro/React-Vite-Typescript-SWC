// === BASIC CURRENCY FORMATTER ===
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// === ADVANCED CURRENCY FORMATTER ===
interface CurrencyOptions {
  currency?: string;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  showSymbol?: boolean;
}

export const formatCurrencyAdvanced = (
  amount: number, 
  options: CurrencyOptions = {}
): string => {
  const {
    currency = 'USD',
    locale = 'en-US',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
    showSymbol = true
  } = options;

  if (showSymbol) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(amount);
  } else {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(amount);
  }
};

// === MULTIPLE CURRENCY SUPPORT ===
type SupportedCurrency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'VND' | 'CNY';

export const formatMultiCurrency = (
  amount: number, 
  currency: SupportedCurrency = 'USD'
): string => {
  const currencyConfig = {
    USD: { locale: 'en-US', symbol: '$' },
    EUR: { locale: 'de-DE', symbol: '€' },
    GBP: { locale: 'en-GB', symbol: '£' },
    JPY: { locale: 'ja-JP', symbol: '¥' },
    VND: { locale: 'vi-VN', symbol: '₫' },
    CNY: { locale: 'zh-CN', symbol: '¥' },
  };

  const config = currencyConfig[currency];
  
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// === SIMPLE DOLLAR FORMATTER ===
export const formatDollar = (amount: number): string => {
  return `$${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// === COMPACT CURRENCY FORMATTER (1K, 1M, 1B) ===
export const formatCompactCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    notation: 'compact',
    compactDisplay: 'short',
  }).format(amount);
};

// === CUSTOM CURRENCY FORMATTER CLASS ===
export class CurrencyFormatter {
  private locale: string;
  private currency: string;
  private options: Intl.NumberFormatOptions;

  constructor(
    locale: string = 'en-US',
    currency: string = 'USD',
    options: Partial<Intl.NumberFormatOptions> = {}
  ) {
    this.locale = locale;
    this.currency = currency;
    this.options = {
      style: 'currency',
      currency: this.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      ...options,
    };
  }

  format(amount: number): string {
    return new Intl.NumberFormat(this.locale, this.options).format(amount);
  }

  formatCompact(amount: number): string {
    return new Intl.NumberFormat(this.locale, {
      ...this.options,
      notation: 'compact',
      compactDisplay: 'short',
    }).format(amount);
  }
}

// === UTILITY FUNCTIONS ===
export const parseCurrency = (currencyString: string): number => {
  // Remove currency symbols and parse
  const cleanString = currencyString.replace(/[$,€£¥₫\s]/g, '');
  return parseFloat(cleanString) || 0;
};

export const isValidCurrencyAmount = (amount: number): boolean => {
  return !isNaN(amount) && isFinite(amount) && amount >= 0;
};

// === TYPE DEFINITIONS ===
export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'VND' | 'CNY';
export type LocaleCode = 'en-US' | 'de-DE' | 'en-GB' | 'ja-JP' | 'vi-VN' | 'zh-CN';

export interface FormatterConfig {
  locale: LocaleCode;
  currency: CurrencyCode;
  showSymbol: boolean;
  precision: number;
}