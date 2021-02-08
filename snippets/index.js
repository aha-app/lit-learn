// Browsers are really good at turning text into HTML
document.body.innerHTML = "<div></div>"

// render()

render = (content, target) => {
  target.innerHTML = content
}

content = "<h1>Timeless way of building</h1>"
render(content, document.body)

// Tagged template literals

tag = (strings, ...values) => {
  console.log(strings, values);
}


// Step 1. A `Template` is created, with markers for where expressions will fill in the values
//   https://github.com/Polymer/lit-html/blob/a8c66cd1f48817e028f6ab4d155c1ba3bd76ffea/src/lib/template.ts#L49
// Step 2. A `TemplateResult` is produced - an html template element, with markers in it for dynamic expressions
//    -> debugger in render, .getHTML() and getTemplateElement()
// Step 3. When render() is called for the first time, this is the only time all the nonchanging parts result in browser work
// Step 4. When render() is called next, the only necessary updates are expressions applied directly to their places in the dom
//    https://github.com/Polymer/lit-html/blob/a8c66cd1f48817e028f6ab4d155c1ba3bd76ffea/src/lib/template-instance.ts#L39
//    -> demonstrate w/ Attribute Committer
// 
