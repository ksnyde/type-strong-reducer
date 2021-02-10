# Type Strong Reducer

How can we convert an array of typed objects into a dictionary which retains the strong type information?
## Test

From the terminal:

```sh
# install deps
yarn
# run tests
yarn test
```

Note that almost all the tests pass but to understand the typing issues that exist I have added `tsc --noEmit`
as part of the `test` command. This will highlight all the mismatches between the run-time and typed environments.

Maybe a more visual way of doing this is just to look at `Database-spec.ts` after running `yarn` to get the no-packages installed noise
out of the way.