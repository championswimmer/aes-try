import crypto, { randomUUID } from 'crypto';

async function main () {

  const data = "493449556514845";
  const paddedData = padTo128Bit(data);
  const iv = generateIV();
  const ivBytes = new TextEncoder().encode(iv);
  const keyString = "f6al8n2j3m70x5h8";
  const key = new TextEncoder().encode(keyString);

  console.log(`Data: ${data}`);
  console.log(`Padded Data: ${paddedData}`);
  console.log(`IV: ${iv}`);
  console.log(`Key: ${key}`);

  const encryptedData = aesEncrypt(paddedData, key, ivBytes);

  console.log(`Encrypted Data: ${encryptedData}`);

  const encryptedDataBase64 = Buffer.from(encryptedData, 'hex').toString('base64') + iv;

  console.log(`Encrypted Data Base64: ${encryptedDataBase64}`);

  const decryptedData = aesDecrypt(encryptedData+iv, key);

  console.log(`Decrypted Data: ${decryptedData}`);


}

main()

/**
 * Take a data and pad it to the nearest 128 bit multiple
 * @param data 
 */
function padTo128Bit(data: string): string {
  const dataLength = data.length;
  const remainder = dataLength % 16;
  const padding = 16 - remainder;
  const paddedData = data + "0".repeat(padding);
  return paddedData;

}

/**
 * Generate a random 128 bit Initialisation Vector
 */
function generateIV() {
  const iv = randomUUID().slice(0, 16);
  return iv;

}

function aesEncrypt(data: string, key: Uint8Array, iv: Uint8Array): string {
  const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  const encryptedBytes = Buffer.from(
    cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
  ).toString('utf8')
  return encryptedBytes;

}

function aesDecrypt(data: string, key: Uint8Array) {
  const iv = new TextEncoder().encode(data.slice(-16))
  const buff = Buffer.from(data.slice(0, -16), 'hex')
  const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv)
  return (
    decipher.update(buff) +
    decipher.final('utf8')
  )
}