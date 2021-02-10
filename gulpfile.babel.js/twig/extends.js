
export default function (Twig) {
  const extendsTags = [
    {
      // unique name for tag type
      type: 'autoescape',
      // regex match for tag (autoescape white-space anything)
      regex: /^autoescape\s+(.+)$/,
      // this is a standalone tag and doesn't require a following tag
      next: ['endautoescape'],
      open: true,

      // Runs when the template is rendered
      parse: function (token, context, chain) {
        // parse the tokens into a value with the render context
        var output = Twig.parse.apply(this, [token.output, context])

        return {
          chain: false,
          output: output
        }
      }
    },
    {
      type: 'endautoescape',
      regex: /^endautoescape$/,
      next: [ ],
      open: false
    },
    {
      // unique name for tag type
      type: 'load',
      // regex match for tag (load white-space anything)
      regex: /^load\s+(.+)$/,
      // this is a standalone tag and doesn't require a following tag
      next: [ ],
      open: true,

      // runs on matched tokens when the template is loaded. (once per template)
      compile: function (token) {
        var expression = token.match[1]

        // Compile the expression. (turns the string into tokens)
        token.stack = Twig.expression.compile.apply(this, [{
          type: Twig.expression.type.expression,
          value: expression
        }]).stack

        delete token.match
        return token
      },

      // Runs when the template is rendered
      parse: function (token, context, chain) {
        var output = ''

        return {
          chain: false,
          output: output
        }
      }
    },
    {
      // unique name for tag type
      type: 'static',
      // regex match for tag (load white-space anything)
      regex: /^static\s+(.+)$/,
      // this is a standalone tag and doesn't require a following tag
      next: [ ],
      open: true,

      // runs on matched tokens when the template is loaded. (once per template)
      compile: function (token) {
        var expression = token.match[1]

        // Compile the expression. (turns the string into tokens)
        token.stack = Twig.expression.compile.apply(this, [{
          type: Twig.expression.type.expression,
          value: expression
        }]).stack

        delete token.match
        return token
      },

      // Runs when the template is rendered
      parse: function (token, context, chain) {
        var output = context.static + token.stack[0].value

        return {
          chain: false,
          output: output
        }
      }
    },
    {
      // unique name for tag type
      type: 'url',
      // regex match for tag (load white-space anything)
      regex: /^url\s+(.+)$/,
      // this is a standalone tag and doesn't require a following tag
      next: [ ],
      open: true,

      // Runs when the template is rendered
      parse: function (token, context, chain) {
        var output = ''

        return {
          chain: false,
          output: output
        }
      }
    },
    {
      // unique name for tag type
      type: 'csrf_token',
      // regex match for tag (csrf_token white-space anything)
      regex: /^csrf_token$/,
      // this is a standalone tag and doesn't require a following tag
      next: [ ],
      open: true,

      // Runs when the template is rendered
      parse: function (token, context, chain) {
        var output = ''

        return {
          chain: false,
          output: output
        }
      }
    }
  ]

  extendsTags.forEach(item => {
    Twig.exports.extendTag(item)
  })
}
