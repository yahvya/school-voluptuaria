## items Type

`object` ([Details](place-properties-comments-items.md))

# items Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                        |
| :-------------------- | :------- | :------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [user-id](#user-id)   | `string` | Required | cannot be null | [Application registered places Mongodb schema](place-properties-comments-items-properties-user-id.md "undefined#/properties/comments/items/properties/user-id")   |
| [comment](#comment)   | `string` | Required | cannot be null | [Application registered places Mongodb schema](place-properties-comments-items-properties-comment.md "undefined#/properties/comments/items/properties/comment")   |
| [rating](#rating)     | `number` | Required | cannot be null | [Application registered places Mongodb schema](place-properties-comments-items-properties-rating.md "undefined#/properties/comments/items/properties/rating")     |
| [wrote-at](#wrote-at) | `string` | Optional | cannot be null | [Application registered places Mongodb schema](place-properties-comments-items-properties-wrote-at.md "undefined#/properties/comments/items/properties/wrote-at") |

## user-id

user unique identifier

`user-id`

* is required

* Type: `string`

* cannot be null

* defined in: [Application registered places Mongodb schema](place-properties-comments-items-properties-user-id.md "undefined#/properties/comments/items/properties/user-id")

### user-id Type

`string`

### user-id Constraints

**UUID**: the string must be a UUID, according to [RFC 4122](https://tools.ietf.org/html/rfc4122 "check the specification")

## comment



`comment`

* is required

* Type: `string`

* cannot be null

* defined in: [Application registered places Mongodb schema](place-properties-comments-items-properties-comment.md "undefined#/properties/comments/items/properties/comment")

### comment Type

`string`

### comment Constraints

**maximum length**: the maximum number of characters for this string is: `300`

**minimum length**: the minimum number of characters for this string is: `4`

## rating



> Count of rating stars

`rating`

* is required

* Type: `number`

* cannot be null

* defined in: [Application registered places Mongodb schema](place-properties-comments-items-properties-rating.md "undefined#/properties/comments/items/properties/rating")

### rating Type

`number`

### rating Constraints

**maximum**: the value of this number must smaller than or equal to: `5`

**minimum**: the value of this number must greater than or equal to: `1`

## wrote-at



`wrote-at`

* is optional

* Type: `string`

* cannot be null

* defined in: [Application registered places Mongodb schema](place-properties-comments-items-properties-wrote-at.md "undefined#/properties/comments/items/properties/wrote-at")

### wrote-at Type

`string`

### wrote-at Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")

### wrote-at Examples

```json
"1980-12-03 10:10:20"
```
