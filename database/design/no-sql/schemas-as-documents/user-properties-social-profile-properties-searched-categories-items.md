## items Type

`object` ([Details](user-properties-social-profile-properties-searched-categories-items.md))

# items Properties

| Property                              | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                        |
| :------------------------------------ | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [category-name](#category-name)       | `string` | Required | cannot be null | [User Mongodb schema](user-properties-social-profile-properties-searched-categories-items-properties-category-name.md "undefined#/properties/social-profile/properties/searched-categories/items/properties/category-name")       |
| [count-of-search](#count-of-search)   | `number` | Required | cannot be null | [User Mongodb schema](user-properties-social-profile-properties-searched-categories-items-properties-count-of-search.md "undefined#/properties/social-profile/properties/searched-categories/items/properties/count-of-search")   |
| [last-search-date](#last-search-date) | `string` | Optional | cannot be null | [User Mongodb schema](user-properties-social-profile-properties-searched-categories-items-properties-last-search-date.md "undefined#/properties/social-profile/properties/searched-categories/items/properties/last-search-date") |

## category-name



`category-name`

* is required

* Type: `string`

* cannot be null

* defined in: [User Mongodb schema](user-properties-social-profile-properties-searched-categories-items-properties-category-name.md "undefined#/properties/social-profile/properties/searched-categories/items/properties/category-name")

### category-name Type

`string`

## count-of-search



`count-of-search`

* is required

* Type: `number`

* cannot be null

* defined in: [User Mongodb schema](user-properties-social-profile-properties-searched-categories-items-properties-count-of-search.md "undefined#/properties/social-profile/properties/searched-categories/items/properties/count-of-search")

### count-of-search Type

`number`

### count-of-search Constraints

**minimum**: the value of this number must greater than or equal to: `0`

## last-search-date



`last-search-date`

* is optional

* Type: `string`

* cannot be null

* defined in: [User Mongodb schema](user-properties-social-profile-properties-searched-categories-items-properties-last-search-date.md "undefined#/properties/social-profile/properties/searched-categories/items/properties/last-search-date")

### last-search-date Type

`string`

### last-search-date Constraints

**date**: the string must be a date string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")

### last-search-date Examples

```json
"2000-08-18"
```
