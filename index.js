const fs = require('fs'); // we need node filestream library to write into files
const ms = require('ms'); // we also import the ms library from Zeit (https://github.com/zeit/ms)

class Pixelmaker {
  /**
   * 
   * @param {number} bitDepth Pixel color depth, defaults to 8 bits per RGB-channel (= 255)
   * @param {object} resolution An object that takes a width parameter and a height parameter. Defaults to 1280x720
   * @param {string} outputPath The folder (in the working directory) you want your image files to be saved to
   */
  constructor(bitDepth,resolution,outputPath) {
    this.bitDepth = bitDepth || 8;
    this.outputPath = outputPath ? "./" + outputPath : "./output/";
    this.resolution = {
      width: resolution ? resolution.width : 1280,
      height: resolution ? resolution.height : 720
    }
    this.totalPixels = this.resolution.width * this.resolution.height;

    if (this.bitDepth % 2 === 1){
      console.log("Pixelmaker received invalid pixel depth. Defaulted to 8.");
      this.bitDepth = 8;
    }

    if (!fs.existsSync(this.outputPath)) {
      fs.mkdirSync(this.outputPath);
    }

  }

  _randomRGB(){
    const channelRed = Math.floor(Math.random() * Math.pow(2, this.bitDepth)) + 1; 
    const channelGreen = Math.floor(Math.random() * Math.pow(2, this.bitDepth)) + 1;
    const channelBlue = Math.floor(Math.random() * Math.pow(2, this.bitDepth)) + 1;
    return [channelRed, channelGreen, channelBlue];
  }

  /**
   * Reads a file and converts it into a pixel-array matrix 
   */
  read(){
    // fs.readStream()
  }

  /**
   * Created an image
   * @param {string} type Desired output fileformat
   * @param {object} size The image size, as { width, height }
   */
  create(type, size) {
    
    let image = [];
    type ? type : 'png'; // if type is defined, use it, otherwise fallback to png

    if (!size) size = this.totalPixels;
    else size = (size.width * size.height);
    
    const then = Date.now();
    for (var i = 0, len = size; i < len; i++) {
      image.push(this._randomRGB());
    }
    const now = ms((Date.now() - then));
    
    console.log("Total pixels: " + size);
    console.log(`Parsed together an image in: ${now}`);
    
    fs.writeFile(`${this.outputPath}\/${Date.now()}.${type}`, image, (err) => {
      if (err) throw err;
      console.log("The file was succesfully saved!");
    }); 

  }
}

module.exports = Pixelmaker;
