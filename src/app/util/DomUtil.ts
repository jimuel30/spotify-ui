export class DomUtil {
  static getChatBoxHeight(): number | undefined {
    const artistBannerElement = document.querySelector('.artist-banner') as HTMLElement;
    const textBoxElement = document.querySelector('.text-box') as HTMLElement;


    // Check if artistBannerElement exists
    if (artistBannerElement && textBoxElement) {
      const artistBannerBottom = artistBannerElement.offsetHeight;
      const textBoxTop  = textBoxElement.offsetTop;

      console.log("ARTIST TOP: ", artistBannerBottom);
      console.log("TextBox: ", textBoxTop);
      console.log(textBoxTop - artistBannerBottom)
      return textBoxTop - artistBannerBottom;

      // const calculatedHeight = artistBannerTop + artistBannerElement.offsetHeight;
      //
      // // Subtract calculatedHeight from the window's inner height (screen height)
      // return window.innerHeight - calculatedHeight - (window.innerHeight * 0.12 );
    }

    // Return undefined if the element doesn't exist
    return undefined;
  }

}
