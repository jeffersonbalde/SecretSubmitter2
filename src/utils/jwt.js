export function base64urlEncode(str) {
    return btoa(str).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  }
  
  export function base64urlDecode(str) {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) {
      str += '=';
    }
    return atob(str);
  }
  
  export function encodeJWT(payload) {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };
    const base64Header = base64urlEncode(JSON.stringify(header));
    const base64Payload = base64urlEncode(JSON.stringify(payload));
    const signature = 'key'; // Since there's no backend
    return `${base64Header}.${base64Payload}.${signature}`;
  }
  
  export function decodeJWT(token) {
    try {
      const [header, payload, signature] = token.split('.');
      const decodedPayload = JSON.parse(base64urlDecode(payload));
      return decodedPayload;
    } catch (e) {
      return null;
    }
  }  