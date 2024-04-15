
import { jwtDecode } from "jwt-decode";


export const jwtDecodeUtil = (
	token: string | CookieValueTypes
  ): IDecodeTokensPayload | null => {
	try {
	  const decoded = jwtDecode(`${token}`) as IDecodeTokensPayload;
	  return decoded;
	} catch {
	  return null;
	}
  };