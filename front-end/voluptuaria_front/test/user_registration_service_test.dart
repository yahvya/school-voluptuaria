import 'package:flutter_test/flutter_test.dart';
import 'package:voluptuaria_front/services/user_registration_service.dart';

void main() {
  group('UserRegistrationService Tests', () {
    late UserRegistrationService userRegistrationService;
    const baseUrl = 'http://192.168.211.252:9045';
    const encryptionSecret = 'test_secret';

    setUp(() {
      userRegistrationService = UserRegistrationService(
        baseUrl: baseUrl,
        encryptionSecret: encryptionSecret,
      );
    });

    test('should register user successfully', () async {

      userRegistrationService = UserRegistrationService(
        baseUrl: baseUrl,
        encryptionSecret: encryptionSecret,
      );

      final result = await userRegistrationService.classicallyRegisterUser(
        lang: 'french',
        email: 'ntsn444@gmail.com',
        password: 'Password1234@',
        name: 'Test',
        firstname: 'User',
        token: 'test_token',
        tokenIv: 'test_token_iv',
      );

      expect(result['success'], true);
    });
  });
} 