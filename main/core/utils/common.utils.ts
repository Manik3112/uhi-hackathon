export function jsonStringify(x: Record<string, any> | string): string {
  try {
    return JSON.stringify(x) as string;
  }
  catch(e) {
    console.error(e);
    return x as string;
  }
}