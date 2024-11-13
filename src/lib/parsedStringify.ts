export const parseStringify = <T>(value: T): T => {
    return JSON.parse(JSON.stringify(value));
  };