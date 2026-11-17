type ClassDict = Record<string, boolean | undefined | null>;
type ClassValue = string | number | boolean | undefined | null | ClassValue[] | ClassDict;

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  const walk = (value: ClassValue): void => {
    if (!value && value !== 0) return;
    if (typeof value === "string" || typeof value === "number") {
      out.push(String(value));
      return;
    }
    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }
    if (typeof value === "object") {
      for (const [key, on] of Object.entries(value)) {
        if (on) out.push(key);
      }
    }
  };
  inputs.forEach(walk);
  return out.join(" ");
}
