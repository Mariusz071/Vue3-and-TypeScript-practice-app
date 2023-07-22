# opply-task

## What I would do further?

- add unit tests
- refactor suppliers and quotes store in a way that those could be built by a common
  constructor, as just item type is different there, rest is handled in the same way
- improve UI feedback of who's currently logged in - as now looking at the API docs
  I can't see any other way of retrieving user ID than creating one unfortunately.
  User id is needed to get data from `/api/v1/users/{id}/` endpoint.
- install only `lodash.camelcase` and `lodash.mapkeys` instead of entire lodash lib -
  this was my initial approach but Netlify had some issues with those installed this was so changed to
  entire lodash installation

Netlify deploy can be found [here](https://64bc1810aae2e70008353391--dazzling-dolphin-fb72e5.netlify.app/).
