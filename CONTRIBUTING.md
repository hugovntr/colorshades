# Contributing to [ColorShades](https://colorshad.es)

Before contributing to the project, make sure to fully read the following guide. If some points feel unclear, feel free to ask in the [GitHub Discussion](https://github.com/hugovntr/colorshades/discussions).

## Development

ColorShades uses [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/). The [website/documentation](https://colorshad.es) is located in the `/packages/documentation` directory, and the library in the `/packages/library` folder.

### Before you start

ColorShades is built with Typescript, if for some reason you decide in your contribution to modify, remove or add types. Make sure to clearly explain in the pull request message why you did it and how it is going to be beneficial for the library or the website.

### Working locally

1. Fork this repository to our own GitHub acocunt
2. Create a new branch for the feature/fix that you want to implement:
    ```bash
    git checkout -b FEATURE_NAME
    ```
3. If you have not already done so, install yarn
    ```bash
    npm install -g yarn
    ```
4. Install all the dependencies from the workspaces root
    ```bash
    yarn
    ```
5. Run the local project
    1. If you are working on the website/documentation
        ```bash
        yarn workspaces documentation dev
        ```
    2. Working on the library
        ```bash
        yarn workspaces library dev
        ```

_You may run both of the above commands in seperate terminal windows to see the changes from the library reflect onto the website/documentation_

### Library

If you would like to export the types for the library, you can so with the following command:

```bash
yarn workspaces library types
```

If you made changes to the default boundaries and would like to regenerate them, you can do so with the following command:

```bash
yarn workspaces library boundaries
```

## Testing

ColorShades does not include tests, _yet_. It's definitely one of the top priority on the list of next features.
In the meantime, if you want to implement testing in the library, make sure to first open a [discussion](https://github.com/hugovntr/colorshades/discussions) se we can define together the best testing strategy for the library.
