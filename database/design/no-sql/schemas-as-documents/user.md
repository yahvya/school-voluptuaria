## User Mongodb schema Type

`object` ([User Mongodb schema](user.md))

# User Mongodb schema Properties

| Property                                                    | Type     | Required | Nullable       | Defined by                                                                                                                |
| :---------------------------------------------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------ |
| [id](#id)                                                   | `string` | Required | cannot be null | [User Mongodb schema](user-properties-id.md "undefined#/properties/id")                                                   |
| [email](#email)                                             | `string` | Required | cannot be null | [User Mongodb schema](user-properties-email.md "undefined#/properties/email")                                             |
| [password](#password)                                       | `string` | Required | cannot be null | [User Mongodb schema](user-properties-password.md "undefined#/properties/password")                                       |
| [name](#name)                                               | `string` | Required | cannot be null | [User Mongodb schema](user-properties-name.md "undefined#/properties/name")                                               |
| [firstname](#firstname)                                     | `string` | Required | cannot be null | [User Mongodb schema](user-properties-firstname.md "undefined#/properties/firstname")                                     |
| [birthdate](#birthdate)                                     | `string` | Optional | can be null    | [User Mongodb schema](user-properties-birthdate.md "undefined#/properties/birthdate")                                     |
| [phonenumber](#phonenumber)                                 | `string` | Optional | can be null    | [User Mongodb schema](user-properties-phonenumber.md "undefined#/properties/phonenumber")                                 |
| [profile-picture-access-link](#profile-picture-access-link) | `string` | Optional | can be null    | [User Mongodb schema](user-properties-profile-picture-access-link.md "undefined#/properties/profile-picture-access-link") |
| [account-creation-date](#account-creation-date)             | `string` | Required | cannot be null | [User Mongodb schema](user-properties-account-creation-date.md "undefined#/properties/account-creation-date")             |
| [gender](#gender)                                           | `number` | Required | cannot be null | [User Mongodb schema](user-properties-gender.md "undefined#/properties/gender")                                           |
| [social-profile](#social-profile)                           | `object` | Required | cannot be null | [User Mongodb schema](user-properties-social-profile.md "undefined#/properties/social-profile")                           |
| [visited-places](#visited-places)                           | `array`  | Required | cannot be null | [User Mongodb schema](user-properties-visited-places.md "undefined#/properties/visited-places")                           |
| [places-wish-list](#places-wish-list)                       | `array`  | Required | cannot be null | [User Mongodb schema](user-properties-places-wish-list.md "undefined#/properties/places-wish-list")                       |
| [travel-routes](#travel-routes)                             | `array`  | Required | cannot be null | [User Mongodb schema](user-properties-travel-routes.md "undefined#/properties/travel-routes")                             |

## id

user unique identifier

`id`

* is required

* Type: `string`

* cannot be null

* defined in: [User Mongodb schema](user-properties-id.md "undefined#/properties/id")

### id Type

`string`

### id Constraints

**UUID**: the string must be a UUID, according to [RFC 4122](https://tools.ietf.org/html/rfc4122 "check the specification")

## email

user existing email

`email`

* is required

* Type: `string`

* cannot be null

* defined in: [User Mongodb schema](user-properties-email.md "undefined#/properties/email")

### email Type

`string`

### email Constraints

**email**: the string must be an email address, according to [RFC 5322, section 3.4.1](https://tools.ietf.org/html/rfc5322 "check the specification")

## password

user hashed password

`password`

* is required

* Type: `string`

* cannot be null

* defined in: [User Mongodb schema](user-properties-password.md "undefined#/properties/password")

### password Type

`string`

## name

user family name

`name`

* is required

* Type: `string`

* cannot be null

* defined in: [User Mongodb schema](user-properties-name.md "undefined#/properties/name")

### name Type

`string`

### name Constraints

**maximum length**: the maximum number of characters for this string is: `25`

**minimum length**: the minimum number of characters for this string is: `2`

### name Examples

```json
"svel"
```

```json
"yahaya"
```

## firstname

user firstname

`firstname`

* is required

* Type: `string`

* cannot be null

* defined in: [User Mongodb schema](user-properties-firstname.md "undefined#/properties/firstname")

### firstname Type

`string`

### firstname Constraints

**maximum length**: the maximum number of characters for this string is: `25`

**minimum length**: the minimum number of characters for this string is: `2`

### firstname Examples

```json
"svel"
```

```json
"yahaya"
```

## birthdate



`birthdate`

* is optional

* Type: `string`

* can be null

* defined in: [User Mongodb schema](user-properties-birthdate.md "undefined#/properties/birthdate")

### birthdate Type

`string`

### birthdate Constraints

**date**: the string must be a date string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")

### birthdate Examples

```json
"1980-12-03"
```

## phonenumber



`phonenumber`

* is optional

* Type: `string`

* can be null

* defined in: [User Mongodb schema](user-properties-phonenumber.md "undefined#/properties/phonenumber")

### phonenumber Type

`string`

### phonenumber Constraints

**unknown format**: the value of this string must follow the format: `phonenumber`

### phonenumber Examples

```json
"+3307689024"
```

## profile-picture-access-link



`profile-picture-access-link`

* is optional

* Type: `string`

* can be null

* defined in: [User Mongodb schema](user-properties-profile-picture-access-link.md "undefined#/properties/profile-picture-access-link")

### profile-picture-access-link Type

`string`

### profile-picture-access-link Examples

```json
"/profiles/user-profile.jpg"
```

## account-creation-date



`account-creation-date`

* is required

* Type: `string`

* cannot be null

* defined in: [User Mongodb schema](user-properties-account-creation-date.md "undefined#/properties/account-creation-date")

### account-creation-date Type

`string`

### account-creation-date Constraints

**date**: the string must be a date string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")

### account-creation-date Examples

```json
"1980-12-03"
```

## gender



> Enumeration as int

`gender`

* is required

* Type: `number`

* cannot be null

* defined in: [User Mongodb schema](user-properties-gender.md "undefined#/properties/gender")

### gender Type

`number`

## social-profile



`social-profile`

* is required

* Type: `object` ([Details](user-properties-social-profile.md))

* cannot be null

* defined in: [User Mongodb schema](user-properties-social-profile.md "undefined#/properties/social-profile")

### social-profile Type

`object` ([Details](user-properties-social-profile.md))

## visited-places



`visited-places`

* is required

* Type: `object[]` ([Details](user-properties-visited-places-items.md))

* cannot be null

* defined in: [User Mongodb schema](user-properties-visited-places.md "undefined#/properties/visited-places")

### visited-places Type

`object[]` ([Details](user-properties-visited-places-items.md))

## places-wish-list



> user wanted places to visit

`places-wish-list`

* is required

* Type: `object[]` ([Details](user-properties-places-wish-list-items.md))

* cannot be null

* defined in: [User Mongodb schema](user-properties-places-wish-list.md "undefined#/properties/places-wish-list")

### places-wish-list Type

`object[]` ([Details](user-properties-places-wish-list-items.md))

## travel-routes



`travel-routes`

* is required

* Type: `object[]` ([Details](user-properties-travel-routes-items.md))

* cannot be null

* defined in: [User Mongodb schema](user-properties-travel-routes.md "undefined#/properties/travel-routes")

### travel-routes Type

`object[]` ([Details](user-properties-travel-routes-items.md))
