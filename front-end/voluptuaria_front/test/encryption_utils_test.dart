import 'package:flutter_test/flutter_test.dart';
import 'package:voluptuaria_front/utils/encryption_utils.dart';

void main() {
  final encryptionUtil = EncryptionUtil();

  group('EncryptionService Tests', () {
    test('should encrypt and decrypt correctly', () async {
      final testData = [
        {'toEncrypt': 'to encrypt 1', 'secretKey': 'secret 1'},
        {'toEncrypt': 'to encrypt 2', 'secretKey': 'secret 2'},
      ];

      for (var data in testData) {
        final encrypted = await encryptionUtil.encrypt(
          toEncrypt: data['toEncrypt']!,
          secretKey: data['secretKey']!,
        );
        
        final decrypted = await encryptionUtil.decrypt(
          toDecrypt: encrypted['encryptionResult']!,
          secretKey: data['secretKey']!,
          iv: encrypted['iv']!,
        );

        expect(decrypted, data['toEncrypt']);
      }
    });
  });
}