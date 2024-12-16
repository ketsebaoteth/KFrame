import crypto from "crypto";

const urlDatabase: { [key: string]: string } = {};

const generateShortURL = (url: string): string => {
  const hash = crypto.createHash("sha256").update(url).digest("hex");
  const shortKey = hash.slice(0, 8);
  urlDatabase[shortKey] = url;

  return `http://short.ly/${shortKey}`;
};

const resolveURL = (shortURL: string): string | null => {
  const shortKey = shortURL.split("/").pop() || "";

  return urlDatabase[shortKey] || null;
};

export { resolveURL, generateShortURL };

// // Example usage
// const longURL = "https://www.example.com/some/long/path";
// const shortURL = generateShortURL(longURL);
// console.log("Short URL:", shortURL);

// const originalURL = resolveURL(shortURL);
// console.log("Original URL:", originalURL);
