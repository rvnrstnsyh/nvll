---
title: Server-side GitHub Flavored Markdown
published_at: 2025-02-15T00:00:00.000Z
author: rvnrstnsyh
contact: mailto:re@nvll.me
snippet: This 'Hello World!' post from cupoftea is a test post designed to showcase various Markdown elements in action.
  It serves as a detailed demonstration to evaluate how effectively and to what extent Deno's server-side GitHub
  Flavored Markdown rendering can process Markdown.
---

This 'Hello World!' post from cupoftea is a test post designed to showcase various Markdown elements in action.
It serves as a detailed demonstration to evaluate how effectively and to what extent
[Deno's server-side GitHub Flavored Markdown rendering](https://github.com/denoland/deno-gfm) can process Markdown.

---

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

## Paragraph

Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo voluptas voluptates eveniet, porro magnam dolorum eos facilis.
Quod blanditiis, error saepe vel ratione perferendis, vero velit, tempore labore impedit facere. Tempora dolores odit odio
aliquam suscipit doloribus repellendus nisi minus cum modi mollitia, incidunt, quidem dicta velit quia soluta aut!

**Bold text**, _italic text_, and `inline code`.  
This is a standard paragraph with a line break.  
A new paragraph can be created by adding an empty line.

## Text Formatting

- _Italic_ or _Italic_
- **Bold** or **Bold**
- **_Bold Italic_** or **_Bold Italic_**
- ~~Strikethrough~~
- <u>Underlined text</u> (HTML tag used)
- ==Highlighted text== (requires plugin support)

## Blockquote

> This is a blockquote example.  
> It can span multiple lines.

### Nested Blockquote

> Outer quote
>
> > Inner quote

## Lists

### Unordered List

- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2
- Item 3

### Ordered List

1. First item
2. Second item
   1. Subitem 2.1
   2. Subitem 2.2
3. Third item

## Checklist (Task List)

- [x] Task 1 (completed)
- [ ] Task 2 (not completed)
- [ ] Task 3 (not completed)

## Links

[Example link](https://example.com)  
Reference link: [Example Reference][1]

[1]: https://example.com

## Images

![Placeholder Image](/png/mastodon-logo.png)
![Placeholder Image](/png/matrix-logo.png)

## Tables

| Header 1    | Header 2    | Header 3    |
| ----------- | ----------- | ----------- |
| Row 1 Col 1 | Row 1 Col 2 | Row 1 Col 3 |
| Row 2 Col 1 | Row 2 Col 2 | Row 2 Col 3 |

## Code

### Inline Code

Use backticks for inline code: `console.log("Hello, world!");`

### Code Block

```js
console.log("Hello, world!");
```

### Code Block with Syntax Highlighting

```python
def hello():
    print("Hello, world!")
```

### Fenced Code Block with No Language

```
This is a generic code block.
```

## Horizontal Line

---

## Footnotes

This is an example sentence with a footnote.[^1]

[^1]: This is the footnote content.

## Emojis

:cloud: :rocket: :coffee:

## HTML in Markdown

This is a <mark>highlighted</mark> text using HTML.

## Definition List

Term 1
: Definition 1

Term 2
: Definition 2

## Escape Characters

Use `\*` to escape special characters like `*`, `#`, and `_`.

## Subscripts and Superscripts

H~2~O (subscript) and 10^2^ (superscript)

## Math Expressions ([KaTeX](https://katex.org/docs/supported.html))

### Inline Math

$E = mc^2$ and $y = x^2$

### Block Math

$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$

###### OR

```math
\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)
```

## Markdown Extensions (GFM)

~~Deleted text~~

```diff
- This is a removed line
+ This is an added line
```
