## items Type

`object` ([Details](user-properties-visited-places-items.md))

# items Properties

| Property                            | Type     | Required | Nullable       | Defined by                                                                                                                                                        |
| :---------------------------------- | :------- | :------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [place-access-id](#place-access-id) | `string` | Required | cannot be null | [User Mongodb schema](user-properties-visited-places-items-properties-place-access-id.md "undefined#/properties/visited-places/items/properties/place-access-id") |
| [visited-at](#visited-at)           | `string` | Required | cannot be null | [User Mongodb schema](user-properties-visited-places-items-properties-visited-at.md "undefined#/properties/visited-places/items/properties/visited-at")           |

## place-access-id



`place-access-id`

* is required

* Type: `string`

* cannot be null

* defined in: [User Mongodb schema](user-properties-visited-places-items-properties-place-access-id.md "undefined#/properties/visited-places/items/properties/place-access-id")

### place-access-id Type

`string`

### place-access-id Constraints

**UUID**: the string must be a UUID, according to [RFC 4122](https://tools.ietf.org/html/rfc4122 "check the specification")

## visited-at



`visited-at`

* is required

* Type: `string`

* cannot be null

* defined in: [User Mongodb schema](user-properties-visited-places-items-properties-visited-at.md "undefined#/properties/visited-places/items/properties/visited-at")

### visited-at Type

`string`

### visited-at Constraints

**date**: the string must be a date string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")

### visited-at Examples

```json
"1980-12-03"
```
