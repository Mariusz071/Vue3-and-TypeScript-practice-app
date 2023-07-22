# opply-task

## What I would do further?

- add unit tests
- refactor suppliers and quotes store in a way that those could be built by a common
  constructor, as just item type is different there, rest is handled in the same way
- improve UI feedback of who's currently logged in - as now looking at the API docs
  I can't see any other way of retrieving user ID than creating one unfortunately.
  User id is needed to get data from `/api/v1/users/{id}/` endpoint.
