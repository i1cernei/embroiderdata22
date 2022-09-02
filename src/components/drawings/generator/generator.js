/**
 *
 * The generator creates ornaments based on poll question sections. It is the main body of the
 * embroidery graphics generator and makes all low level interactions with receiving data as
 * well as exporting the file to a mailable format.
 *
 * It creates as many ornaments as there are sections in the questionnaire.
 *
 */

class OrnamentGenerator {
  constructor(sections) {
    this.sections = sections;
  }

  init() {
    console.log(sections);
  }
}

export { OrnamentGenerator }