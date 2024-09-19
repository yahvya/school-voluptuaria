## items Type

`object` ([Details](user-properties-travel-routes-items.md))

# items Properties

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                            |
| :------------------------ | :------- | :------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| [name](#name)             | `string` | Required | cannot be null | [User Mongodb schema](user-properties-travel-routes-items-properties-name.md "undefined#/properties/travel-routes/items/properties/name")             |
| [start-date](#start-date) | `string` | Required | cannot be null | [User Mongodb schema](user-properties-travel-routes-items-properties-start-date.md "undefined#/properties/travel-routes/items/properties/start-date") |
| [end-date](#end-date)     | `string` | Required | cannot be null | [User Mongodb schema](user-properties-travel-routes-items-properties-end-date.md "undefined#/properties/travel-routes/items/properties/end-date")     |
| [budget](#budget)         | `number` | Required | cannot be null | [User Mongodb schema](user-properties-travel-routes-items-properties-budget.md "undefined#/properties/travel-routes/items/properties/budget")         |
| [proposals](#proposals)   | `array`  | Required | cannot be null | [User Mongodb schema](user-properties-travel-routes-items-properties-proposals.md "undefined#/properties/travel-routes/items/properties/proposals")   |

## name

given name to the route

`name`

* is required

* Type: `string`

* cannot be null

* defined in: [User Mongodb schema](user-properties-travel-routes-items-properties-name.md "undefined#/properties/travel-routes/items/properties/name")

### name Type

`string`

### name Constraints

**maximum length**: the maximum number of characters for this string is: `20`

**minimum length**: the minimum number of characters for this string is: `2`

## start-date



`start-date`

* is required

* Type: `string`

* cannot be null

* defined in: [User Mongodb schema](user-properties-travel-routes-items-properties-start-date.md "undefined#/properties/travel-routes/items/properties/start-date")

### start-date Type

`string`

### start-date Constraints

**date**: the string must be a date string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")

### start-date Examples

```json
"1980-12-03"
```

## end-date



`end-date`

* is required

* Type: `string`

* cannot be null

* defined in: [User Mongodb schema](user-properties-travel-routes-items-properties-end-date.md "undefined#/properties/travel-routes/items/properties/end-date")

### end-date Type

`string`

### end-date Constraints

**date**: the string must be a date string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")

### end-date Examples

```json
"1980-12-03"
```

## budget



`budget`

* is required

* Type: `number`

* cannot be null

* defined in: [User Mongodb schema](user-properties-travel-routes-items-properties-budget.md "undefined#/properties/travel-routes/items/properties/budget")

### budget Type

`number`

## proposals



`proposals`

* is required

* Type: `object[]` ([Details](user-properties-travel-routes-items-properties-proposals-items.md))

* cannot be null

* defined in: [User Mongodb schema](user-properties-travel-routes-items-properties-proposals.md "undefined#/properties/travel-routes/items/properties/proposals")

### proposals Type

`object[]` ([Details](user-properties-travel-routes-items-properties-proposals-items.md))
