import {environment} from "../../environments/environment.development";

export class UrlConstant {
  static LOGIN_URL = environment.backendDomain+"/spotify-ms/api/v1/auth/login";
  static TOP_ARTIST_URL = environment.backendDomain+"/spotify-ms/api/v1/fetch/top-artist";
  static GET_ARTIST_URL = environment.backendDomain+"/spotify-ms/api/v1/fetch/artist?artistId=";
  static QUE_URL = environment.backendDomain+"/chat/api/v1/que?artistId=";
  static GET_USER_PROFILE_URL = environment.backendDomain+"/spotify-ms/api/v1/fetch/user-profile"
  static SEND_MESSAGE_URL = environment.backendDomain+"/chat/api/v1/publish";
  static WEB_SOCKET_URL = environment.backendDomain+"/ws";
}
