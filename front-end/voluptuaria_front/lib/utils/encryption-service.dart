import 'dart:convert';
import 'dart:typed_data';
import 'package:encrypt/encrypt.dart' as encryptService;
import 'package:crypto/crypto.dart';
import 'dart:math';

class EncryptionService {
  Future<Map<String, String>> encrypt({
    required String toEncrypt,
    required String secretKey,
  }) async {
    final iv = _generateRandomBytes(16);
    final key = await _deriveKey(secretKey, 'salt');
    final encrypter = encryptService.Encrypter(
      encryptService.AES(encryptService.Key(key), mode: encryptService.AESMode.ctr),
    );
    final encrypted = encrypter.encrypt(toEncrypt, iv: encryptService.IV(iv));

    return {
      'encryptionResult': encrypted.base64,
      'iv': base64Encode(iv),
    };
  }

  Future<String?> decrypt({
    required String toDecrypt,
    required String secretKey,
    required String iv,
  }) async {
    try {
      final baseIv = base64Decode(iv);
      final key = await _deriveKey(secretKey, 'salt');
      final encrypter = encryptService.Encrypter(
        encryptService.AES(encryptService.Key(key), mode: encryptService.AESMode.ctr),
      );
      final decrypted = encrypter.decrypt(
        encryptService.Encrypted.fromBase64(toDecrypt),
        iv: encryptService.IV(baseIv),
      );

      return decrypted;
    } catch (_) {
      return null;
    }
  }

  Future<Uint8List> _deriveKey(String password, String salt) async {
    final key = pbkdf2(
      utf8.encode(password) as Uint8List,
      utf8.encode(salt) as Uint8List,
      10000,
      32,
    );
    return key;
  }

  Uint8List _generateRandomBytes(int length) {
    final random = Random.secure();
    return Uint8List.fromList(
      List<int>.generate(length, (_) => random.nextInt(256)),
    );
  }

  Uint8List pbkdf2(Uint8List password, Uint8List salt, int iterations, int length) {
    final hmac = Hmac(sha256, password);
    var result = Uint8List(length);
    var block = Uint8List.fromList([...salt, 1]);
    var intermediate = hmac.convert(block).bytes;

    for (var i = 1; i < iterations; i++) {
      intermediate = hmac.convert(intermediate).bytes;
    }

    result.setRange(0, intermediate.length, intermediate);
    return result;
  }
}