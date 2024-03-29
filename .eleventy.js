const sass = require("sass")

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("main.js")
  eleventyConfig.addPassthroughCopy("*.ico")
  eleventyConfig.addPassthroughCopy("*.jpg")
  eleventyConfig.addPassthroughCopy("*.png")
  eleventyConfig.addPassthroughCopy("*.txt")
  eleventyConfig.addPassthroughCopy("*.webp")
  eleventyConfig.addPassthroughCopy("*.webmanifest")
  eleventyConfig.addPassthroughCopy("CNAME")

  eleventyConfig.addTemplateFormats("scss")
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    compile: async function(inputContent) {
      let result = sass.compileString(inputContent)
      return async (data) => {
        return result.css
      }
    }
  })

  eleventyConfig.addFilter(
    "limit",
    function (arr, from, to) {
      return arr.slice(from, to);
    }
  )
}