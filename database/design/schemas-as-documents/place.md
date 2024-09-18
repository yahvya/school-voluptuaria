## Application registered places Mongodb schema Type

`object` ([Application registered places Mongodb schema](place.md))

# Application registered places Mongodb schema Properties

| Property                            | Type     | Required | Nullable       | Defined by                                                                                                                  |
| :---------------------------------- | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| [access-id](#access-id)             | `string` | Required | cannot be null | [Application registered places Mongodb schema](place-properties-access-id.md "undefined#/properties/access-id")             |
| [location-getter](#location-getter) | `object` | Required | cannot be null | [Application registered places Mongodb schema](place-properties-location-getter.md "undefined#/properties/location-getter") |
| [comments](#comments)               | `array`  | Required | cannot be null | [Application registered places Mongodb schema](place-properties-comments.md "undefined#/properties/comments")               |

## access-id

user unique identifier

`access-id`

* is required

* Type: `string`

* cannot be null

* defined in: [Application registered places Mongodb schema](place-properties-access-id.md "undefined#/properties/access-id")

### access-id Type

`string`

### access-id Constraints

**UUID**: the string must be a UUID, according to [RFC 4122](https://tools.ietf.org/html/rfc4122 "check the specification")

## location-getter



> Way to access the place datas

`location-getter`

* is required

* Type: `object` ([Details](place-properties-location-getter.md))

* cannot be null

* defined in: [Application registered places Mongodb schema](place-properties-location-getter.md "undefined#/properties/location-getter")

### location-getter Type

`object` ([Details](place-properties-location-getter.md))

## comments



`comments`

* is required

* Type: `object[]` ([Details](place-properties-comments-items.md))

* cannot be null

* defined in: [Application registered places Mongodb schema](place-properties-comments.md "undefined#/properties/comments")

### comments Type

`object[]` ([Details](place-properties-comments-items.md))
