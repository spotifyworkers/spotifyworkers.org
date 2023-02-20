const sass = require("sass")

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("main.js")
  eleventyConfig.addPassthroughCopy("images/*.jpg")
  eleventyConfig.addPassthroughCopy("images/*.png")
  eleventyConfig.addPassthroughCopy("images/*.webp")
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