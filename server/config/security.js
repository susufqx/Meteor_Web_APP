export default function (BrowserPolicy) {
  BrowserPolicy.content.allowOriginForAll("*.rsc.cdn77.org");
  BrowserPolicy.content.allowOriginForAll("*.facebook.net");
  BrowserPolicy.content.allowOriginForAll("*.facebook.com");
  BrowserPolicy.content.allowOriginForAll("*.googleapis.com");
  BrowserPolicy.content.allowOriginForAll("res.cloudinary.com");
  BrowserPolicy.content.allowOriginForAll("*.gstatic.com");
  BrowserPolicy.content.allowOriginForAll("*.crisp.im");
  BrowserPolicy.content.allowOriginForAll("*.youtube.com");
  BrowserPolicy.content.allowOriginForAll("*.googleusercontent.com");
  BrowserPolicy.content.allowOriginForAll("*.fbcdn.net");
  BrowserPolicy.content.allowOriginForAll("steamcdn-a.akamaihd.net");
  BrowserPolicy.content.allowOriginForAll("*.steamstatic.com");
  BrowserPolicy.content.allowFontDataUrl();
}
