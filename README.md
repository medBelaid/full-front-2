### `Doc`

- I used the functional components instead of React Classes in order to work with Hooks.

`App.tsx`

- In App.tsx i defined two states 'userName' and 'tempUserName' by useState Hook.
- The first one will be sent to the custom Hook 'useGithubUser' in each form submission.
- The second one will be used to take the entered value of input. It will updated for each change in input value. And like that we avoid the call of the API in each change of the input value.
- handleChange to update tempUserName state.
- handleSubmit to submit userName state in useGithubUser Hook.

`useGithubUser.tsx`

- useGithubUser contain a useEffect Hook which contains userName as dependency.
- useGithubUser manage the user infos and return the final state contain user, error and loading attributes.
- In useEffect we call the github API to get github user by userName. This call is encapsulated in a try catch
- getUserRepos function has as param input named Repo_url what will be used to fetch the API and return all the user Repos.
