# grandom/pick

Versatile and great random data generator.


```ts

import grandom from 'grandom'

grandom.pick([1, 2, 3], { default: -1 })

grandom.pick.multiple([1, 2, 3], { count: 2, default: -1 })

const unique = grandom.pick.unique([1, 2, 3], { default: -1 })
const unique = grandom.pick.unique.multiple([1, 2, 3], { count: 2, default: -1 })
const unique = grandom.pick.multiple.unique([1, 2, 3], { count: 2, default: -1 })

```


## License

[MIT][url-license-doc] @ [Richard King](https://richrdkng.com)

<!--- References =============================================================================== -->

<!--- URLs -->
[url-license-doc]: https://github.com/grandom/grandom-js/blob/main/LICENSE
