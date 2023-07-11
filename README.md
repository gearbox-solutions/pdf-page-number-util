# PDF page number utility

This utility adds page numbers to a PDF file.

## Install

This project uses [pnpm](https://pnpm.io/installation) as a package manager.
To install the dependencies, run:

```
pnpm install
```

## Typescript

This project uses [Typescript](https://www.typescriptlang.org/) as a language. Typescript must be transpiled with tsc
before it can be run. Install typescript and run `tsc` to transpile the typescript to javascript. This is automatically
done by the `test` and `compile` scripts. Your IDE may also have some auto-transpile functionality for when you're editing
the code. Javascript is transpiled to the `dist` directory.

## Compile

This project uses [pkg](https://github.com/vercel/pkg) to compile the script into a binary.
To compile the script, run:

```
pnpm run compile
```

This will compile binaries for MacOS x64, MacOS ARM, and Windows x64 to the `dist/bin` directory.

## Usage
The script takes in below parameters in order to embed page numbers directly onto a PDF and return the resulting PDF.


#### Required Parameters
`--src`: Path to the PDF that will be paginated

`--out`: Path to where the script will save the output PDF

#### Optional Parameters
`--color`: Color of the page numbers. Defaults to black. Accepts any hex value in the format `#rrggbb`.

`--size`: Size of the page numbers. Defaults to 8. Accepts any integer.

`--bottom`: Distance from the bottom of the page to the bottom of the page number. Defaults to 30. Accepts any integer.

`--right`: Distance from the right of the page to the right of the page number. Defaults to 50. Accepts any integer.

### Examples
#### Script example:

```
pnpm run test -- --src=samples/source.pdf --out=samples/output.pdf
```

#### Compiled executable CLI example:

```
./dist/bin/pdf-number-pages-macos-arm64 --src=samples/sample-source.pdf --out=samples/out-bin-arm.pdf
```

Compiled CLI executable with options:
```
./dist/bin/pdf-number-pages-macos-arm64 --src=samples/sample-source.pdf --out=samples/output.pdf --bottom=200 --right=200 --color=#ff0000 --size=24
```
