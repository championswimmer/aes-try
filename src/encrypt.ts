
async function main () {

  const data = "493449556514845";


}

main()

/**
 * Take a data and pad it to the nearest 128 bit multiple
 * @param data 
 */
function padTo128Bit(data: string) {
  const dataLength = data.length;
  const remainder = dataLength % 16;
  const padding = 16 - remainder;
  const paddedData = data + " ".repeat(padding);
  return paddedData;

}