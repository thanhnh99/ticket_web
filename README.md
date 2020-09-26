# TRIPI.VN New base source ReactJS - Rule & Coding conventions (ReactJS)

## - Project Structure - Cấu trúc Project

- Cấu trúc tổng quan 1 Project

![enter image description here](https://www.upsieutoc.com/images/2020/05/11/Screen-Shot-2020-05-11-at-17.26.30.png)

- Thư mục **config**: Chứa các config mặc định dùng chung trong project như API Url, Routers, config theme...
  ![enter image description here](https://www.upsieutoc.com/images/2020/05/11/Screen-Shot-2020-05-11-at-17.29.13.png)
- Thư mục **layout**: Chứa các page, component khung giao diện tổng quát cho project như Sidebar, Header, Conent, Footer, DefaultLayout, AuthenticationLayout, DashboardLayout...
  ![enter image description here](https://www.upsieutoc.com/images/2020/05/11/Screen-Shot-2020-05-11-at-17.32.36.png)
- Thư mục **modules**: Là thư mục tương tác chính trong dự án. Nơi chứa các modules mà dự án cần như authentication, userInfo, common,...
  ![enter image description here](https://www.upsieutoc.com/images/2020/05/11/Screen-Shot-2020-05-11-at-17.43.36.png)

  > Trong 1 module con thì gồm các thư mục **_common, components, pages, redux_**
  > Thư mục **_common_** module là nơi chứa các component được sử dụng chung, dùng lại nhiều lần.

- Thư mục **redux**: Đây là thư mục chứa cấu hình redux store tổng của dự án. Tất cả các reducer trong từng module nhỏ cần phải được khai báo tại đây.
  ![enter image description here](https://www.upsieutoc.com/images/2020/05/11/Screen-Shot-2020-05-11-at-17.33.41.png)
- Thư mục scss, svg: Nơi chứa các file css, svg của dự án.

## Library - Các thư viện sử dụng thiết yếu

- [ ] react-dates
- [ ] react-intl
- [ ] react-loadable
- [ ] redux
- [ ] react-redux
- [ ] redux-thunk
- [ ] redux-persist
- [ ] styled-components
- [ ] Formik + yup

## Rules & conventions

- [ ] ESLints _(AirBnb Config)_
- [ ] prettier

## Extensions for VSCode

[Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer)

[Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)

[ES7 React/Redux/GraphQL/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

[GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

[Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

[Typescript React code snippets](https://marketplace.visualstudio.com/items?itemName=infeng.vscode-react-typescript)

## Start project

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.
