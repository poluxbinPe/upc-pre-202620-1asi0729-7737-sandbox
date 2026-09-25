/**
 * Value object representing a URL.
 *
 * @remarks
 * Guarantees that any non-empty URL used by domain entities has a valid structure.
 *
 * @author Deiby Juan Vargas Manchinelli
 */
export class Url {
  private readonly url: string;

  /**
   * Creates a new Url instance.
   *
   * @param value - The URL string. An empty string represents an absent URL.
   * @throws Error if the URL structure is invalid.
   */
  constructor(value: string) {
    if (!value) {
      this.url = '';
      return;
    }
    if (!Url.isValid(value)) {
      throw new Error(`Invalid URL: ${value}`);
    }
    this.url = value;
  }

  /**
   * Checks if a string is a valid URL.
   *
   * @param value - The string to check.
   * @returns True if the string is a valid URL, false otherwise.
   */
  public static isValid(value: string): boolean {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Indicates whether the URL has no value.
   *
   * @returns True when the URL is empty.
   */
  isEmpty(): boolean {
    return this.url === '';
  }

  /**
   * Returns the URL string.
   */
  toString(): string {
    return this.url;
  }
}
