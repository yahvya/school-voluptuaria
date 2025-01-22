import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class Config {
  static final _storage = FlutterSecureStorage();

  static Future<String> _getValue(String key, String defaultValue) async {
    return await _storage.read(key: key) ?? defaultValue;
  }

  static Future<String> get databaseType async => await _getValue('database_type', 'default_database_type');
  static Future<String> get databaseHost async => await _getValue('database_host', 'localhost');
  static Future<String> get databasePort async => await _getValue('database_port', '3306');
  static Future<String> get databaseUser async => await _getValue('database_user', 'root');
  static Future<String> get databasePassword async => await _getValue('database_password', '');
  static Future<String> get databaseName async => await _getValue('database_name', 'default_database_name');
  static Future<bool> get databaseEnableSync async => (await _getValue('database_enable_sync', 'false')).toLowerCase() == 'true';

  static Future<String> get apiPort async => await _getValue('api_port', '9045');
  static Future<String> get apiHost async => await _getValue('api_host', '127.0.0.1');
  static Future<String> get apiWebsiteLink async => await _getValue('api_website_link', 'http://127.0.0.1:9045');
  static Future<String> get apiProfilePicturesSubLink async => await _getValue('api_profile_pictures_sub_link', '/static/profile-pictures');
  static Future<String> get apiGoogleCallbackUrl async => await _getValue('api_google_callback_url', 'http://localhost:9045/user/registration/by-google/redirect');
  static Future<String> get apiGoogleAuthBaseUri async => await _getValue('api_google_auth_base_uri', 'https://accounts.google.com/o/oauth2/v2/auth');
  static Future<String> get apiGoogleClientId async => await _getValue('api_google_client_id', '');
  static Future<String> get apiGoogleClientSecret async => await _getValue('api_google_client_secret', '');
  static Future<String> get apiOpenWeatherMapKey async => await _getValue('api_openweathermap_key', '');
  static Future<String> get apiGoogleMapsPlaceApiKey async => await _getValue('api_google_maps_place_api_key', '');

  static Future<String> get langFilesDirectoryPath async => await _getValue('lang_files_directory_path', 'resources/lang');

  static Future<String> get securityVoluptuariaTokenHeaderKey async => await _getValue('security_voluptuaria_token_header_key', 'voluptuaria_token');
  static Future<String> get securityVoluptuariaTokenIvKey async => await _getValue('security_voluptuaria_token_iv_key', 'voluptuaria_token_iv');
  static Future<String> get securityVoluptuariaTokenClearValue async => await _getValue('security_voluptuaria_token_clear_value', 'clear value');
  static Future<String> get securityVoluptuariaTokenSecret async => await _getValue('security_voluptuaria_token_secret', 'temporary secret');
  static Future<String> get securityAuthenticationTokenHeaderKey async => await _getValue('security_authentication_token_header_key', 'authentication_token');
  static Future<String> get securityEncryptionSecret async => await _getValue('security_encryption_secret', 'encryption secret');
  static Future<String> get securityGoogleRegistrationEncryptionSecret async => await _getValue('security_google_registration_encryption_secret', 'encryption secret');

  static Future<String> get jwtSecret async => await _getValue('jwt_secret', 'app jwt secret');

  static Future<String> get loginExpiresTime async => await _getValue('login_expires_time', '30d');

  static Future<String> get mailerTransport async => await _getValue('mailer_transport', '');
  static Future<String> get mailerAppEmail async => await _getValue('mailer_app_email', 'voluptuaria.tourisma@gmail.com');
  static Future<String> get mailerAppName async => await _getValue('mailer_app_name', 'Voluptuaria');
  static Future<String> get mailerTemplates async => await _getValue('mailer_templates', 'resources/mails');

  static Future<String> get applicationName async => await _getValue('application_name', 'Voluptuaria');

  static Future<String> get storageUsersProfilePictures async => await _getValue('storage_users_profile_pictures', 'resources/static/profile-pictures');
}