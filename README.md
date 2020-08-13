# react-ngl

<!-- PROJECT SHIELDS -->

[![Jobs][jobs-badge]][jobs-url]
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <!-- <a href="https://github.com/gky360/react-ngl">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

  <h3 align="center">React NGL</h3>

  <p align="center">
    React wrapper for <a href="https://github.com/nglviewer/ngl">NGL</a>
    <br />
    <a href="https://github.com/gky360/react-ngl"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://gky360.github.io/react-ngl">View Demo</a>
    ·
    <a href="https://github.com/gky360/react-ngl/issues">Report Bug</a>
    ·
    <a href="https://github.com/gky360/react-ngl/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [react-ngl](#react-ngl)
  Table of Contents](#table-of-contents)
  - [About The Project](#about-the-project)
    - [Built With](#built-with)
      [ Getting Started](#getting-started)
      [Prerequisites](#prerequisites)
      [Installation](#installation)
      [Usage](#usage)
  - [Roadmap](#roadmap)
    [Contributing](#contributing)
    [License](#license)
    [Contact](#contact)
  - [Acknowledgements](#acknowledgements)

<!-- ABOUT THE PROJECT -->

## About The Project

[![React NGL Screen Shot][product-screenshot]](https://github.com/gky360/react-ngl)

`react-ngl` is a React wrapper for <a href="https://github.com/nglviewer/ngl">NGL</a>.

### Built With

- [ngl](https://github.com/nglviewer/ngl) >= v2.0.0-dev.37
- node >= 12.16.0
- react ^16.13.1

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm

```sh
npm install react-ngl
```

### Installation

1. Clone the repo

```sh
git clone https://github.com/gky360/react-ngl.git
```

2. Install NPM packages

```sh
npm install
```

<!-- USAGE EXAMPLES -->

## Usage

A minimal example of using `react-ngl` is as follows.

```tsx
import React from 'react';
import { Stage, Component } from 'react-ngl';

ReactDOM.render(
  <Stage width="600px" height="400px">
    <Component path="rcsb://4hhb" reprList={reprList} />
  </Stage>,
  document.getElementById('app')
);
```

_For more examples, please refer to the [Demo](https://gky360.github.io/react-ngl)_

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/gky360/react-ngl/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See [`LICENSE`][license-url] for more information.

<!-- CONTACT -->

## Contact

<!-- Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email -->

Project Link: [https://github.com/gky360/react-ngl](https://github.com/gky360/react-ngl)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [nglviewer/ngl](https://github.com/nglviewer/ngl)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[jobs-badge]: https://github.com/gky360/react-ngl/workflows/Jobs/badge.svg
[jobs-url]: https://github.com/gky360/react-ngl/actions
[contributors-shield]: https://img.shields.io/github/contributors/gky360/react-ngl.svg
[contributors-url]: https://github.com/gky360/react-ngl/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/gky360/react-ngl.svg
[forks-url]: https://github.com/gky360/react-ngl/network/members
[stars-shield]: https://img.shields.io/github/stars/gky360/react-ngl.svg
[stars-url]: https://github.com/gky360/react-ngl/stargazers
[issues-shield]: https://img.shields.io/github/issues/gky360/react-ngl.svg
[issues-url]: https://github.com/gky360/react-ngl/issues
[license-shield]: https://img.shields.io/github/license/gky360/react-ngl.svg
[license-url]: https://github.com/gky360/react-ngl/blob/master/LICENSE.txt
[product-screenshot]: images/screenshot.png
