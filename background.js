var debug_headers = "akamai-x-get-client-ip, akamai-x-cache-on, akamai-x-cache-remote-on, akamai-x-check-cacheable, akamai-x-get-cache-key, akamai-x-get-extracted-values, akamai-x-get-nonces, akamai-x-get-ssl-client-session-id, akamai-x-get-true-cache-key, akamai-x-serial-no, akamai-x-feo-trace, akamai-x-get-request-id"
var akamai_header = { "name":"Pragma", "value":debug_headers}

chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    console.log("Akamai headers added to: " + details.url);
    var pragma_exists = false
    for (var i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name === 'Pragma') {
        details.requestHeaders[i].value = details.requestHeaders[i].value.concat(", ",debug_headers)
        pragma_exists = true
        break;
      }
    }
    if(!pragma_exists) {
      details.requestHeaders.push(akamai_header)
    }
    return {requestHeaders: details.requestHeaders};
  },
  {urls: ["<all_urls>"]},
  ["blocking", "requestHeaders"]);
