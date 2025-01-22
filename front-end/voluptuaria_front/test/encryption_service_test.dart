import 'package:flutter_test/flutter_test.dart';
import 'package:voluptuaria_front/utils/encryption-service.dart';

void main() {
  final encryptionService = EncryptionService();

  group('EncryptionService Tests', () {
    test('should encrypt and decrypt correctly', () async {
      final testData = [
        {'toEncrypt': 'to encrypt 1', 'secretKey': 'secret 1'},
        {'toEncrypt': 'to encrypt 2', 'secretKey': 'secret 2'},
      ];

      for (var data in testData) {
        final encrypted = await encryptionService.encrypt(
          toEncrypt: data['toEncrypt']!,
          secretKey: data['secretKey']!,
        );
        print("data: ${data}");
        print("encrypted: ${encrypted}");
        
        final decrypted = await encryptionService.decrypt(
          toDecrypt: encrypted['encryptionResult']!,
          secretKey: data['secretKey']!,
          iv: encrypted['iv']!,
        );
        print("decrypted: ${decrypted}");

        expect(decrypted, data['toEncrypt']);
      }
    });
  });
}